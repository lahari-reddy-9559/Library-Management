const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const bcrypt =require("bcryptjs");
require("dotenv").config();
const jwt=require('jsonwebtoken');
const User=require('./models/User');
const Book = require('./models/Book');
const Issue = require('./models/Issue');
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Cloud Connected successfully")
}).catch((e)=>{
    console.log("MongoDB connection failed ",e);
});
app.get("/",(req,res)=>{
    res.send("Backend Server Running");
});
app.post("/api/register",async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        const existingUser = await User.findOne({email:email});
        if (existingUser){
            return res.status(400).json({
                message:"Email already exist",
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message:"successfully created user",
        });
    }catch(error){
        return res.status(500).json({
            message:"Registration failed",
            error:error,
        });
    }
});
app.post('/api/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const uniqueUser = await User.findOne({ email: email });
        if (!uniqueUser) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, uniqueUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }
        const token=jwt.sign(
        {id:uniqueUser._id,
          email:uniqueUser.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1h',
        }
    );
    res.status(200).json({
        token:token,
        user:{
        id:uniqueUser._id,
        fullName:uniqueUser.fullName,
        email:uniqueUser.email,
        }
    });}catch(error){
        res.status(500).json({
            message:'sever error',
            error:error.message,
        })
    }
});
app.delete('/api/books/return/:issueId', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        if (!issue) return res.status(404).json({ message: 'Issue record not found' });
        await Book.findByIdAndUpdate(issue.bookId, { $inc: { availableCopies: 1 } });
        await Issue.findByIdAndDelete(req.params.issueId);

        res.status(200).json({ message: 'Book returned successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.put('/api/books/renew/:issueId', async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.issueId,
            { issueDate: new Date() },
            { new: true }
        );
        
        if (!updatedIssue) return res.status(404).json({ message: 'Issue record not found' });
        
        res.status(200).json({ message: 'Book registration renewed successfully!', updatedIssue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, isbn, totalCopies } = req.body;
        const copiesToAdd = parseInt(totalCopies, 10);
        if (isNaN(copiesToAdd) || copiesToAdd <= 0) {
            return res.status(400).json({ message: "Total copies must be a valid number greater than 0" });
        }
        let book = await Book.findOne({ isbn });
        if (book) {
            book.totalCopies += copiesToAdd;
            book.availableCopies += copiesToAdd;
            await book.save();
            return res.status(200).json({ message: 'Book stock updated successfully', book });
        }
        book = new Book({
            title,
            author,
            isbn,
            totalCopies: copiesToAdd,
            availableCopies: copiesToAdd
        });

        await book.save();
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete('/api/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found in database" });
        }
        res.status(200).json({ message: "Book successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/books/issue', async (req, res) => {
  try {
    const { bookId, studentName, studentId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Sorry, no copies of this book are currently available.' });
    }
    const issue = new Issue({ bookId, studentName, studentId });
    await issue.save();
    book.availableCopies -= 1;
    await book.save();

    res.status(200).json({ message: 'Book issued successfully!', issue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/books', async (req, res) => {
    try {
        const allBooks = await Book.find({});
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, isbn, totalCopies } = req.body;
    const copies = parseInt(totalCopies, 10);
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const issuedCopies = book.totalCopies - book.availableCopies;
    if (copies < issuedCopies) {
      return res.status(400).json({ 
        message: `Cannot lower total copies to ${copies}. ${issuedCopies} copies are currently issued to students.` 
      });
    }
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.totalCopies = copies;
    book.availableCopies = copies - issuedCopies;
    await book.save();
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/books/issues', async (req, res) => {
    try {
        const activeIssues = await Issue.find({}).populate('bookId', 'title');
        res.status(200).json(activeIssues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});
