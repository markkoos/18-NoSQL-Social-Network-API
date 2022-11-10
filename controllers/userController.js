const { User, Thoughts } = require(`../models`);
const { ObjectId } = require(`mongoose`);

// aggregate function to get the number of users
const userCount = async () => {
    User.aggregate()
        .count(`userCount`)
        .then((numberOfUsers) => numberOfUsers);
}

module.exports = {
    // gets all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await userCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select(`-__v`)
            .then(async (user) => 
                !user
                    ? res.status(400).json({ message: `Can't find user with this ID`})   
                    : res.json({user}), 
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // post new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addtoSet: { username: req.body } },
            { runValidators: true, new: true},
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `Can't find user with that ID`})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // remove user by id
    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.pararms.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `Can't find user with that ID` })
                    : res.json({ message: `User successfully deleted!`})
            )
            .catch((err) => res.status(500).json(err));
    },
    // add new friend to users's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addtoSet: { friends: req.body } },
            { runValidators: true, new: true },
        )
            .then((user) => {
                !user 
                    ? res
                        .status(404)
                        .json({ message: `No user found with that id` })
                    : res.json(user)
            })
            .catch((err) => res.status(500).json(err))
    },
    // delete friend from friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { _id: req.params.friendId} } },
            { runValidators: true, new: true },
        )
            .then((user) => 
                !user 
                    ? res
                        .status(404)
                        .json({ message: `No user found with that id` })
                    : res.json({message: `delete was successful`})
            )
            .catch((err) => res.status(500).json(err))
    }
}
