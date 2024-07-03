const { Todo } = require('../models');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const [updated] = await Todo.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTodo = await Todo.findByPk(req.params.id);
      res.status(200).json(updatedTodo);
    } else {
      res.status(400).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
