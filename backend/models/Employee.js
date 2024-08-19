const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
  },
  salary: {
    type: Number,
    required: [true, 'Please add a salary'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Employee', employeeSchema);