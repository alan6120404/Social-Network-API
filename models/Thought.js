const { Schema, model } = require('mongoose');

const ThoughSchema = new Schema(
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
      },
      id: false
    }
  );

// create the Thought model using the ThoughtSchema
const Though = model('Thought', ThoughtSchema);

// get total count of reaction on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

// export the Thought model
module.exports = Thought;