const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null }
});

module.exports = mongoose.model('Issue', issueSchema);