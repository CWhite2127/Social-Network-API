const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
    let mail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return mail.test(email);
};


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
            validate: [validateEmail, `Please provide a valid email address`],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, `Please provide a valid email address`]

        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts" }],
        friends: [this],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)


userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model("user", userSchema);

module.exports = User;