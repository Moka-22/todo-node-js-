const Todo = require("../models/Todo");
const mongoose = require("mongoose");

const getTodods = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid todo id" });
        }
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid todo id" });
        }

        const updates = {}

        if (title !== undefined) updates.title = typeof title === 'string' ? title.trim() : title;
        if (completed !== undefined) updates.completed = completed === true;

        const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;

        if (!title || typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ error: "Title is required and must be a non-empty string" });
        }

        const todo = new Todo({
            title: title.trim(),
            completed: completed === true,
        })

        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid todo id" });
        }
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(204).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getTodods,
    getTodoById,    
    updateTodo,
    createTodo,
    deleteTodo
}