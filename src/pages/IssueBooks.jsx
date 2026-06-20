import React, { useState, useEffect } from 'react';

export default function IssueBooks() {
    const [books, setBooks] = useState([]);
    const [issues, setIssues] = useState([]);
    const [formData, setFormData] = useState({ bookId: '', studentName: '', studentId: '' });
    
    const BACKEND_URL = 'http://localhost:5000'; 

    useEffect(() => {
        fetchBooks();
        fetchIssues();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/books`);
            const data = await res.json();
            setBooks(Array.isArray(data) ? data : []);
        } catch (err) { console.error("Error fetching books:", err); }
    };

    const fetchIssues = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/books/issues`); 
            const data = await res.json();
            setIssues(Array.isArray(data) ? data : []);
        } catch (err) { console.error("Error fetching issues:", err); }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BACKEND_URL}/api/books/issue`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                alert('Book issued successfully!');
                setFormData({ bookId: '', studentName: '', studentId: '' });
                fetchIssues(); 
                fetchBooks();  
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) { console.error(err); }
    };

    // NEW: HANDLER TO RETURN/GIVE BACK A BOOK
    const handleReturn = async (issueId) => {
        if (!window.confirm("Are you sure this book has been returned?")) return;
        try {
            const res = await fetch(`${BACKEND_URL}/api/books/return/${issueId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                alert('Book marked as returned!');
                fetchIssues(); // Refresh logs
                fetchBooks();  // Refresh stock numbers
            } else {
                const data = await res.json();
                alert(`Error: ${data.message}`);
            }
        } catch (err) { console.error(err); }
    };
    const handleRenew = async (issueId) => {
        if (!window.confirm("Renew this book for another 15 days?")) return;
        try {
            const res = await fetch(`${BACKEND_URL}/api/books/renew/${issueId}`, {
                method: 'PUT'
            });
            if (res.ok) {
                alert('Book timeline renewed successfully!');
                fetchIssues(); // Reset list alerts
            } else {
                const data = await res.json();
                alert(`Error: ${data.message}`);
            }
        } catch (err) { console.error(err); }
    };

    const getDaysElapsed = (issueDate) => {
        const diffTime = Math.abs(new Date() - new Date(issueDate));
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };
    
    const overdueIssues = issues.filter(issue => getDaysElapsed(issue.issueDate) > 15);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Library Book Issuing Dashboard</h2>
            {overdueIssues.length > 0 && (
                <div className="alert alert-danger bg-danger text-white shadow-sm p-3 mb-4 rounded">
                    <h4 className="alert-heading fw-bold">ATTENTION: Overdue Books Detected!</h4>
                    <p>The following students have held books for more than 15 days:</p>
                    <hr className="border-white" />
                    <ul className="mb-0">
                        {overdueIssues.map(issue => (
                            <li key={issue._id} className="mb-1">
                                <strong>{issue.studentName}</strong> (ID: {issue.studentId}) holds 
                                <strong> "{issue.bookId?.title || 'Unknown Book'}"</strong> — 
                                <span className="fw-bold text-warning"> {getDaysElapsed(issue.issueDate)} days ago</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card p-3 shadow-sm">
                        <h4 className="card-title text-primary mb-3">Issue a New Book</h4>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="bookId">Select Book</label>
                            <select id="bookId" className="form-select mb-3" value={formData.bookId} onChange={handleChange} required>
                                <option value="">-- Choose a book --</option>
                                {books.map(book => (
                                    <option key={book._id} value={book._id} disabled={book.availableCopies <= 0}>
                                        {book.title} ({book.availableCopies} available)
                                    </option>
                                ))}
                            </select>

                            <label className="form-label" htmlFor="studentName">Student Name</label>
                            <input type="text" id="studentName" className="form-control mb-3" placeholder="Enter full name" value={formData.studentName} onChange={handleChange} required />

                            <label className="form-label" htmlFor="studentId">Student ID</label>
                            <input type="text" id="studentId" className="form-control mb-3" placeholder="e.g. STU123" value={formData.studentId} onChange={handleChange} required />

                            <button type="submit" className="btn btn-primary w-100 py-2">Confirm Issue</button>
                        </form>
                    </div>
                </div>

                {/* 3. ACTIVE ISSUE LOG LIST */}
                <div className="col-md-8">
                    <div className="card p-3 shadow-sm table-responsive">
                        <h4 className="card-title text-secondary mb-3">All Issued Records</h4>
                        <table className="table table-hover align-middle">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Book Title</th>
                                    <th>Student Name</th>
                                    <th>Student ID</th>
                                    <th>Issued On</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => {
                                    const days = getDaysElapsed(issue.issueDate);
                                    return (
                                        <tr key={issue._id} className={days > 15 ? "table-danger-subtle" : ""}>
                                            <td><strong>{issue.bookId?.title || 'Deleted Book'}</strong></td>
                                            <td>{issue.studentName}</td>
                                            <td><code>{issue.studentId}</code></td>
                                            <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                                            <td>
                                                {days > 15 ? (
                                                    <span className="badge bg-danger">Overdue ({days} days)</span>
                                                ) : (
                                                    <span className="badge bg-info text-dark">{days} days out</span>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-warning btn-sm me-1" 
                                                    onClick={() => handleRenew(issue._id)}
                                                >
                                                    Renew
                                                </button>
                                                <button 
                                                    className="btn btn-success btn-sm" 
                                                    onClick={() => handleReturn(issue._id)}
                                                >
                                                    Given Back
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {issues.length === 0 && <p className="text-center text-muted">No books are currently issued.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}