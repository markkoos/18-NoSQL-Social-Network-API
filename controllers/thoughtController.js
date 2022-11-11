const { User, Thought } = require(`../models`);

module.exports = {
    // gets all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // gets a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select(`-__v`)
            .then((thought) => 
                !thought
                    ? res.status(400).json({ message: `No thought with that id`})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText } },
            { runValidators: true, new: true},
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({message: `No thought with that ID`})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `No thought with that id!`})
                    : res.json({message: `Thought has been deleted!`})
            )
    },
    // post a reaction to a thought
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: { reactions: req.body } },
            {runValidators: true, new: true,},
            )
                .then((reaction) => 
                    !reaction
                        ? res.status(404).json({ message: `No thought found with that id!`})
                        : res.json(reaction)
                )
                .catch((err) => res.status(500).json(err))
    },
    // delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: { reactionId: req.params.reactionId}} },
            {runValidators: true, new: true,},
        )
            .then((reaction) => 
                !reaction
                    ? res.status(404).json({ message: `No user found with that id` })
                    : res.json({message: `delete was successful`})
            )
    }
}