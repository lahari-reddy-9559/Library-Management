import React, { useState, useEffect } from 'react';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 1. Track search input state
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', author: '', isbn: '', totalCopies: '' });
    
    const BACKEND_URL = 'https://library-api.vercel.app'; 
    
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/books`); 
            const data = await response.json();
            setBooks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const startEdit = (book) => {
        setEditingId(book._id);
        setEditForm({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            totalCopies: book.totalCopies
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const saveUpdate = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            const data = await response.json();

            if (response.ok) {
                alert('Book updated successfully!');
                setEditingId(null); 
                fetchBooks(); 
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const deleteBook = async (id) => {
        if (!window.confirm("Are you sure you want to remove this book?")) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/books/${id}`, {
                method: 'DELETE'
            });
            
            const data = await response.json(); 

            if (response.ok) {
                alert('Book removed!');
                setBooks(books.filter(book => book._id !== id)); 
            } else {
                alert(`Failed to delete: ${data.message || data.error}`);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            alert(`Network Error: ${error.message}`);
        }
    };
    const filteredBooks = books.filter(book => {
        const search = searchTerm.toLowerCase();
        return (
            (book.title?.toLowerCase().includes(search)) ||
            (book.author?.toLowerCase().includes(search)) ||
            (book.isbn?.toLowerCase().includes(search))
        );
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Library Books Inventory Management</h2>
            
            {/* SEARCH INPUT BAR */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="😊 Search by title, author, or ISBN..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div className="card p-3 shadow-sm">
    <div style={{ maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
        
        <table className="table table-hover align-middle mb-0">
            {/* Opaque Sticky Header Row */}
            <thead className="table-dark sticky-top">
                <tr>
                    <th style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>Title</th>
                    <th style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>Author</th>
                    <th style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>ISBN</th>
                    <th style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>Total Stock</th>
                    <th style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>Available</th>
                    <th className="text-center" style={{ backgroundColor: '#212529', position: 'sticky', top: 0, zIndex: 10 }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredBooks.map((book) => (
                    <tr key={book._id}>
                        {editingId === book._id ? (
                            <>
                                <td><input type="text" className="form-control form-control-sm" name="title" value={editForm.title} onChange={handleEditChange} /></td>
                                <td><input type="text" className="form-control form-control-sm" name="author" value={editForm.author} onChange={handleEditChange} /></td>
                                <td><input type="text" className="form-control form-control-sm" name="isbn" value={editForm.isbn} onChange={handleEditChange} /></td>
                                <td><input type="number" className="form-control form-control-sm" name="totalCopies" value={editForm.totalCopies} onChange={handleEditChange} /></td>
                                <td className="text-muted">{book.availableCopies} (Auto)</td>
                                <td className="text-center">
                                    <button className="btn btn-success btn-sm me-2" onClick={() => saveUpdate(book._id)}>Save</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td><strong>{book.title}</strong></td>
                                <td>{book.author}</td>
                                <td><code>{book.isbn}</code></td>
                                <td>{book.totalCopies}</td>
                                <td>
                                    <span className={`badge ${book.availableCopies > 0 ? 'bg-success' : 'bg-danger'}`}>
                                        {book.availableCopies} left
                                    </span>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(book)}>Update</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book._id)}>Remove</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div> 
    {filteredBooks.length === 0 && (
        <p className="text-center text-muted mt-3">No matching books found in inventory.</p>
    )}
</div>
        </div>
    );
}