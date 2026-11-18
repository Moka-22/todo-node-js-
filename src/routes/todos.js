const express = require("express");
const router = express.Router();

const {
    getTodods,
    getTodoById,
    updateTodo,
    createTodo, 
    deleteTodo
} = require("../controllers/todo.Controller");

// GET all todos
router.get("/todos", getTodods);

// get todo by id
router.get("/todos/:id", getTodoById);

// update todo by id
router.put("/todos/:id", updateTodo);

// add new todo
router.post("/todos", createTodo);

// delete todo by id
router.delete("/todos/:id", deleteTodo);


module.exports = router;
