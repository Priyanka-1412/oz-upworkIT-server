const mongoose = require('mongoose');
//const textSearch = require('mongoose-text-search');
const { Schema } = mongoose;

const ProjectSchema = new Schema (
  {
    user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User cannot be empty."]
	},
    name: {
      type:String,
      required: [true, "Project Name cannot be empty."]
    },
    description: {
      type:String,
      required: [true, "Description required"]
    },
    skills: [
      {
        type:String,
        required: [true, "Description required"]
      }
    ],
    paymentType: {
      type:String
    },
    phone: {
      type:String,
    },
    email: {
      type:String,
    },
    estimatedBudget: {
      type: Number,
      required: [true, "Please provide Estimated Budget."]
    },
    datePosted: { type:Date, default: Date.now }
  },
  { collection: 'project' }
);

//ProjectSchema.plugin(textSearch);

ProjectSchema.index({name: 'text', description: 'text', skills: 'text'});

module.exports = mongoose.model('Project', ProjectSchema);
