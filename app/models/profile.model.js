const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-type-url');

const ProfileSchema = new Schema (
  {
    user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User cannot be empty."]
	},
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
    aboutme: {
      type:String,
    },
    phone: {
      type:String,
    },
    email: {
      type:String,
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
      type:mongoose.SchemaTypes.Url
  },
  linkedIn: {
      type:mongoose.SchemaTypes.Url
  },
  github: {
      type:mongoose.SchemaTypes.Url
  },
},
  {collection: 'profile'}
);

module.exports = mongoose.model('Profile', ProfileSchema )
