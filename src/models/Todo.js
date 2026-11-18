const monogoose = require("mongoose");

const todoSchema = new monogoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
// timestamps option automatically adds createdAt and updatedAt fields to the schema, which are updated whenever a document is created or modified.
{timestamps: true}
);


const Todo = monogoose.model("Todo", todoSchema);

module.exports = Todo;