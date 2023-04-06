const { Schema, model, Types } = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date), 
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            virtual: true,
        },
        id: false,
    }
)

thoughtsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thoughts = model("thought", thoughtsSchema);

model.exports = Thoughts;