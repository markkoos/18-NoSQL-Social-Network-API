const connection = require(`../config/connection`);
const { User, Thought } = require(`../models`);
const { usernames, emails, thoughtTexts } = require(`./data`)

connection.on(`error`, (err) => err);

connection.once(`open`, async () => {
    console.log(`connected`);

    // drop exisiting users
    await User.deleteMany({});

    // drop existing thoughts
    await Thought.deleteMany({});

    // empty array for usernames and thoughts
    const users = [];
    const thoughtsArray = [];

    // for loop for every user/thought to be pushed
    for (let i = 0; i < 6; i++) {
        const username = usernames[i];
        const email = emails[i];
        const thoughts = thoughtTexts[i];

        users.push({
            username,
            email,
            thoughts,
        });

        thoughtsArray.push({
            thoughts,
            username,
        });
    };

    // add data to the collection
    await User.collection.insertMany(users);

    // add thoughts to the collection
    await Thought.collection.insertMany(thoughtsArray);

    // log out the seed data to see what should appear in the db
    console.table(users);
    console.table(thoughtsArray);
    console.info(`Seeding complete`);
    process.exit(0);
});


