const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one Thoughts by id
  getThoughtsById({ params }, res) {
      Thought.findOne({ _id: params.id })
      .then(dbThoughtsData => {
          if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thoughts found with this id!' });
          return;
          }
          res.json(dbThoughtsData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

  // add Thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    // add reaction to thought
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reaction: body } },
        { new: true }
      )
        .then(dbThoughtsData => {
          if (!dbThoughtsData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },
  
      // remove reaction
      removeReaction({ params }, res) {
          Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reaction: { reactionId: params.reactionId } } },
          { new: true }
          )
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.json(err));
      },

      // update Thought by id
      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No Thought with this id!' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;