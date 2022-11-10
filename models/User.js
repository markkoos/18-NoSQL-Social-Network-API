const { Schema, model } = require(`mongoose`);


// Schema to create User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      thoughts: [{ type: Schema.Types.ObjectId, ref: `Thought`, },],
      friends: [{ type: Schema.Types.ObjectId, ref: `User`, }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual for the the amount of friends that a user has
userSchema.virtual(`friendCount`).get(function () {
    return this.friends.length;
})

// initialize the User model
const User = model(`user`, userSchema);

module.exports = User;