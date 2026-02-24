const Todo = require('../models/todoSchema');

//Get all todos
// controllers/todoController.js
exports.getTodos = async (req, res) => {
    try {
        // SYNC: Use req.user._id to ensure you match the raw MongoDB identifier 
        // seen in your VS Code terminal logs.
        const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: 1 });

        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Post a new todo
exports.createTodo = async (req, res) => {
    try {
        const newTodo = await Todo.create({
            text: req.body.text,
            userId: req.user.id
        });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Patch-Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate({
            _id: req.params.id,
            userId: req.user.id
        }, {
            text: req.body.text,
            completed: req.body.completed
        },
            { new: true }
        );
        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deleted) {
            return res.status(404).json({ message: "Todo not found or Not yours" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}