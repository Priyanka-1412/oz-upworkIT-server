const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema (
  {
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
    estimatedBudget: {
      type: Number,
      required: [true, "Please provide Estimated Budget."]
    },
    datePosted: { type:Date, default: Date.now }
  },
  { collection: 'project' }
);

module.exports = mongoose.model('Project', ProjectSchema);
