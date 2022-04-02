const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
      },
      thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
      friends: {
      // reference self 'User'
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

// create the Pizza model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// export the User model
module.exports = User;