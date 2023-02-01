import { Router } from 'express';

import { Todo } from '../models/todo';

const router = Router();

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
  return res.status(200).json(todos);
});

router.post('/todo', (req, res, next) => {
  const newTd: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTd);
  return res.status(200).json({ success: true });
});

router.put('/todo/:todoId', (req, res, next) => {
  const tId = req.params.todoId;
  const todoIdx = todos.findIndex(item => item.id === tId);
  if (todoIdx >= 0) {
    todos[todoIdx] = { id: todos[todoIdx].id, text: req.body.text };
    return res.status(200).json({ success: true });
  }
  res.status(400).json({ message: 'Could not find id' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  todos = todos.filter(item => item.id !== req.params.todoId);

  return res.status(200).json({ success: true });
});

export default router;
