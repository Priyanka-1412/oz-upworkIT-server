const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema (
  {
    imageUrl: {
      type:String
    },
    name: {
      type:String,
      required: [true, "Name cannot be empty."]
    },
    title: {
      type:String,
      required: [true, "Please enter title."]
    },
    skills: [
      {
        type:String,
        required: [true, "Project Name cannot be empty."]
      },
    ],
    suburb: {
      type:String
    },
    postcode: {
      type:Number
    },
    country: {
      type:String
    },
    resume: {
      type:String
  },
    portfolio: {
      type:String
  },
  linkedIn: {
      type:String
  }
},
  {collection: 'profile'}
);

module.exports = mongoose.model('Profile', ProfileSchema )
