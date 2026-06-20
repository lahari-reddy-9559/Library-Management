import React, { useState, useEffect } from 'react';
import Body from './Body.jsx';
export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = 'https://library-api.vercel.app';
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/books`);
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live catalog:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Catalog...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h2 className="text-center mb-4 text-primary fw-bold">Live Library Catalog</h2>
      {books.length === 0 ? (
        <p className="text-center text-muted">No books found in the library database.</p>
      ) : (
        <Body courses={books} /> 
      )}
    </div>
  );
}