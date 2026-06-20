import { useState } from "react";
export default function Add(){
    const [details,setDetails]=useState({
        title:'',
        author:'',
        isbn:'',
        totalCopies:0,
        availableCopies:0,
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prev) => {
            const nextState = { ...prev, [id]: value };
            if (id === 'totalCopies') {
            nextState.availableCopies = value;
        }
            return nextState;
        });
    };
    const handleSubmit=async (e)=>{
        e.preventDefault(); 
        try {
            const response = await fetch('https://library-api.vercel.app/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Book added successfully!');
                setDetails({
                    title: '',
                    author: '',
                    isbn: '',
                    totalCopies: ''
                });
            } else {
                alert(`Error: ${data.message || 'Failed to add book'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Server error. Please try again later.');
        }
    }
    return(
        <div className="container">
            <h1 style={{textAlign:'center'}}>Add a new book to library</h1>
            <div className="card p-3 w-50">
            <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="title">Book Name</label>
            <input type='text' id='title' onChange={handleChange} value={details.title} className="form-control mb-2" placeholder="Enter the title of the book" required/>
            <label className="form-label" htmlFor="author">Author</label>
            <input type='text' onChange={handleChange} id='author' value={details.author} className="form-control mb-2" placeholder="Enter the author of the book" required/>
            <label className="form-label" htmlFor="isbn">ISBN number</label>
            <input type='text'  onChange={handleChange} id='isbn' className="form-control mb-2" placeholder="Enter the ISBN number of the book" required/>
            <label className="form-label" htmlFor="totalCopies">Total books</label>
            <input type='number' onChange={handleChange} id='totalCopies' className="form-control mb-2" placeholder="Enter the totalCopies of the book" required/>
            <button type='submit' className="btn btn-primary p-2 m-2 w-25">Add Book</button>
            </form>
            </div>
        </div>
    )
}