const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }
);

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true
      },
      toppings: [],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// get total count of reaction on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

// export the Thought model
module.exports = Thought;