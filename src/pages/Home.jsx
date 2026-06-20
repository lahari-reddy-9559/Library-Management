import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import guru from '/src/images/courses/guru.png'
export default function Home() {
    const [stats, setStats] = useState({
        totalBooks: 0,
        availableBooks: 0,
        issuedBooks: 0,
        pendingBooks: 0
    });
    const BACKEND_URL = 'http://localhost:5000'; 

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const booksResponse = await fetch(`${BACKEND_URL}/api/books`);
                const booksData = await booksResponse.json();
                const issuesResponse = await fetch(`${BACKEND_URL}/api/books/issues`);
                const issuesData = await issuesResponse.json();

                if (Array.isArray(booksData) && Array.isArray(issuesData)) {
                    const total = booksData.reduce((acc, curr) => acc + (curr.totalCopies || 0), 0);
                    const available = booksData.reduce((acc, curr) => acc + (curr.availableCopies || 0), 0);
                    const issued = issuesData.length;
                    const pending = issuesData.filter(issue => {
                        const diffTime = Math.abs(new Date() - new Date(issue.issueDate));
                        const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                        return daysElapsed > 15;
                    }).length;

                    setStats({
                        totalBooks: total,
                        availableBooks: available,
                        issuedBooks: issued,
                        pendingBooks: pending
                    });
                }
            } catch (error) {
                console.error("Error aggregating dashboard library stats:", error);
            }
        };

        fetchLibraryData();
    }, []);

    return (
        <div className="container ">
            <div className="row  p-4 align-items-center">
                <div className="col-md-5">
                    <h1 className="text-primary fw-bold display-5">
                        Shaping Minds, Managing Knowledge
                    </h1>
                    <p className="lead text-muted">
                        Welcome to Bright Future Academy Library System. Track real-time inventory, 
                        monitor book distributions, manage student checkouts, and view pending alerts effortlessly.
                    </p>
                    <div className="row g-2 mt-3">
                        <div className="col-auto">
                          <Link to="/dashboard/list" > <button className="text-white bg-primary border-primary rounded-3 p-2 px-3 shadow-sm">
                                View Book List &gt;
                            </button></Link> 
                        </div>
                        <div className="col-auto">
                           <Link to='/dashboard/issue'><button className="text-primary bg-white border-primary rounded-3 p-2 px-3 shadow-sm">
                                Issue Log History
                            </button></Link> 
                        </div>
                    </div>
                </div>
                {/* Fixed invalid flex bootstrap classes and altered source mockup path structure */}
                <div className="col-md-7 text-end">
                    <img src={guru} className="rounded-3 img-fluid shadow-sm w-75 ms-auto" alt="Library Workspace" />
                </div>
            </div>
            <div className='row  mt-5 g-4'>
                <div className='col-md-3'>
                    <div className='card bg-primary text-white shadow-sm h-100 border-0'>
                        <div className='card-body text-center py-4'>
                            <h2 className="display-4 fw-bold">{stats.totalBooks}</h2>
                            <h5 className="card-title mt-2">Total Books</h5>
                            <p className="card-text small text-white-50">Total registered copies in inventory</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card bg-success text-white shadow-sm h-100 border-0'>
                        <div className='card-body text-center py-4'>
                            <h2 className="display-4 fw-bold">{stats.availableBooks}</h2>
                            <h5 className="card-title mt-2">Books Available</h5>
                            <p className="card-text small text-white-50">Copies physically on shelves right now</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card bg-warning text-dark shadow-sm h-100 border-0'>
                        <div className='card-body text-center py-4'>
                            <h2 className="display-4 fw-bold">{stats.issuedBooks}</h2>
                            <h5 className="card-title mt-2 fw-bold">Issued Books</h5>
                            <p className="card-text small text-black-50">Books checked out by student base</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card bg-danger text-white shadow-sm h-100 border-0'>
                        <div className='card-body text-center py-4'>
                            <h2 className="display-4 fw-bold">{stats.pendingBooks}</h2>
                            <h5 className="card-title mt-2">Overdue Pendings</h5>
                            <p className="card-text small text-white-50">Books out for over 15 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}