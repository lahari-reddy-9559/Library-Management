import React from 'react';

export default function Card1({ name, des, id1, available, total }) {
  const isAvailable = available > 0;

  return (
    <div className='row border border-light shadow-sm m-2 p-3 bg-white rounded align-items-center'>
      {/* Left Column: Visual Book Spine Decorator */}
      <div className='col-md-3 text-center mb-3 mb-md-0'>
        <div 
          className={`d-flex align-items-center justify-content-center rounded ${isAvailable ? 'bg-primary-subtle' : 'bg-danger-subtle'}`}
          style={{ width: '60px', height: '80px', margin: '0 auto', borderLeft: '5px solid #0d6efd' }}
        >
          <span className="fw-bold small text-muted text-center">BOOK</span>
        </div>
      </div>
      
      {/* Right Column: Dynamic Book Data */}
      <div className='col-md-9'>
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="text-dark mb-1 fw-bold">{name}</h5>
          {/* Real-time Status Badge */}
          <span className={`badge ${isAvailable ? 'bg-success' : 'bg-danger'}`}>
            {isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <p className="text-secondary small mb-1">By: <strong>{des}</strong></p>
        <p className="text-muted small mb-2">ISBN: <code>{id1}</code></p>
        
        {/* Real-time Availability Counter Status */}
        <p className="small mb-3">
          Status: <span className="fw-bold">{available}</span> copies available out of {total} total.
        </p>
        
        {/* Action Button */}
        <button 
          id={`${id1}`} 
          className={`btn btn-sm w-50 ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Issue Book' : 'Unavailable'}
        </button>
      </div>      
    </div>
  );
}