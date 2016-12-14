import { Router } from 'express';
import { ObjectID } from 'mongodb';
import bodyParser from 'body-parser';

const api = new Router();

api.use(bodyParser.json());

// get all todos for a user
api.get('/:user', async (req, res, next) => {
  try {
    const db     = req.app.locals.db;
    const cursor = await db.collection(req.params.user).find();
    const todos  = await cursor.toArray();

    res.send(todos);
  }
  catch (err) {
    next(err);
  }
});

// add todo for a user
api.post('/:user', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    await db.collection(req.params.user).insertOne(req.body);

    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
});

// update todo text for a user
api.put('/:user/:id', async (req, res, next) => {
  try {
    const db     = req.app.locals.db;
    const result = await db.collection(req.params.user)
      .updateOne({_id: req.params.id}, {$set: {"text": req.body.text}});

    res.sendStatus(result.modifiedCount ? 200 : 404);
  }
  catch (err) {
    next(err);
  }
});

// update todo completion flag for a user
api.put('/:user/:id/toggle', async (req, res, next) => {
  try {
    const db   = req.app.locals.db;
    const todo = await db.collection(req.params.user).findOne({_id: req.params.id});

    if (todo) {
      const completed = !todo.completed;
      const result    = await db.collection(req.params.user)
        .updateOne({_id: req.params.id}, {$set: {"completed": completed}});
      if (result.modifiedCount) {
        return res.send({completed: completed});
      }
    }
    res.sendStatus(404);
  }
  catch (err) {
    next(err);
  }
});

// delete todo for a user
api.delete('/:user/:id', async (req, res, next) => {
  try {
    const db     = req.app.locals.db;
    const result = await db.collection(req.params.user).deleteOne({_id: req.params.id});

    res.sendStatus(result.deletedCount ? 200 : 404);
  }
  catch (err) {
    next(err);
  }
});

// delete completed todos for a user
api.delete('/:user', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    await db.collection(req.params.user).deleteMany({completed: true});

    res.sendStatus(200);
  }
  catch (err) {
    next(err);
  }
});

export default api;