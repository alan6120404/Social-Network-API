const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent reaction _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const ThoughtSchema = new Schema(
    {
          // set custom id to avoid confusion with parent user _id
      thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
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
      reaction: [reactionSchema],
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