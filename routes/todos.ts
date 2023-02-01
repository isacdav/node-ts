import { Router } from 'express';

import { Todo } from '../models/todo';

const router = Router();

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
  return res.status(200).json(todos);
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTd: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTd);
  return res.status(200).json({ success: true });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as Todo;
  const todoIdx = todos.findIndex(item => item.id === params.todoId);
  if (todoIdx >= 0) {
    todos[todoIdx] = { id: todos[todoIdx].id, text: body.text };
    return res.status(200).json({ success: true });
  }
  res.status(400).json({ message: 'Could not find id' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter(item => item.id !== params.todoId);

  return res.status(200).json({ success: true });
});

export default router;
