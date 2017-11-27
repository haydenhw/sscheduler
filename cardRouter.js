const express = require('express');
const bodyParser = require('body-parser');
const { TestData } = require('./models');
const cardRouter = express.Router();

cardRouter.use(bodyParser.urlencoded({
  extended: true
}));
cardRouter.use(bodyParser.json());

cardRouter.get('/', (req, res) => {
  console.log('get request')
  // res.send({cardRouter: 'success'});
  TestData
    .find()
    .exec()
    .then(data => res.json(data))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

cardRouter.get('/:projectId', (req, res) => {
  console.log('get project by id')
  TestData
    .findById(req.params.projectId)
    .exec()
    .then(project => res.json(project))
    .catch(err => {
        console.error(err);
        res.status(404).json({message: 'Project Not Found'});
      });
});

cardRouter.post('/', (req, res) => {
  console.log('posting')
  console.log(req.body)
  TestData
    .create({
      testData: req.body.testData
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

cardRouter.put('/:listId', (req, res) => {
  console.log(req.body)
  const toUpdate = {
    cards: req.body.cards,
  }
  console.log(req.params.listId)
  console.log(toUpdate)
  TestData
    .findByIdAndUpdate(req.params.listId, {$set: toUpdate})
    .exec()
    .then(project => res.status(204).end())
    .catch(err =>
      res.status(500).json({message: 'Internal server error'})
    );
});

cardRouter.delete('/:projectId', (req, res) => {
  testData
    .findByIdAndRemove(req.params.projectId)
    .exec()
    .then(project => res.status(204).json(project))
    .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = cardRouter;