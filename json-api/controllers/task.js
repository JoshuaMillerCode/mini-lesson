const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//CRUD

// Read GET
router.get('/', (req, res) => {
  Task.find({}, (err, foundTasks) => {
    if (!err) {
      res.status(200).json(foundTasks);
    } else {
      res.status(400).send(err);
    }
  });
});

router.get('/table', (req, res) => {
  Task.find({}, (err, foundTasks) => {
    if (!err) {
      const formattedData = foundTasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status]
          ? [...acc[task.status], task]
          : [task];
        return acc;
      }, {});
      res.status(200).json(formattedData);
    } else {
      res.status(400).send(err);
    }
  });
});

router.post('/', (req, res) => {
  const { body } = req;

  Task.create(body, (err, createdTask) => {
    if (!err) {
      res.status(200).json({ message: 'All Good!', createdTask: createdTask });
    } else {
      res.status(400).send(err);
    }
  });
});

// Update
router.put('/:id', (req, res) => {
  const { body } = req;
  Task.findByIdAndUpdate(
    req.params.id,
    body,
    { new: true },
    (err, updatedTask) => {
      if (!err) {
        res.status(200).json(updatedTask);
      } else {
        res.status(400).send(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      res.status(200).send({ message: 'Deleted that task yessirr' });
    } else {
      res.status(400).send(err);
    }
  });
});

// Show
router.get('/:id', (req, res) => {
  Task.findById(req.params.id, (err, foundTask) => {
    if (!err) {
      res.status(200).json(foundTask);
    } else {
      res.status(400).send(err);
    }
  });
});

module.exports = router;
