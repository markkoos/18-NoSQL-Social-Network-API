const { Schema, model } = require(`mongoose`);
const reactionSchema = require(`./Reaction`);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => { return date.toISOString().split(`T`)[0]; }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSONL: {
            getters: true,
        },
    },
);

// virtual for the amount of reactions a thought has
thoughtSchema.virtual(`reactionCount`, function () {
    return this.reactions.length;
})

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;