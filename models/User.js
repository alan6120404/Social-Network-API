const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


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
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false
    }
  );

// create the user model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends on retrieval
/*UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });*/

// export the User model
module.exports = User;