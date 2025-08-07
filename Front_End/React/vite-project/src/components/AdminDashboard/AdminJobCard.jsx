import React from 'react';
import companylogo from '../../assets/companylogo.png'; 

const AdminJobCard = ({ title, company, location, postedOn, deadline }) => {
  return (
    <div className="mx-5 card p-3 mb-2 mt-2 shadow-sm border rounded-3">
      <div className="d-flex align-items-center gap-3">
        <img
                  src={companylogo} 
                  
          alt="Job"
          height="50"
          width="50"
          className="rounded-circle border"
          style={{ objectFit: 'cover' }}
        />

        <div className="flex-grow-1 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100">
          <div className="mb-2 mb-md-0">
            <h6 className="mb-1 fw-bold">{title}</h6>
            <div className="small text-muted">{company}</div>
          </div>

          <div className="d-none d-md-flex flex-wrap gap-3">
           
            <div><strong>Location:</strong> <span className="text-muted">{location}</span></div>
          </div>

          <div className="d-none d-md-block">
            <div className="small"><strong>Posted:</strong> {new Date(postedOn).toLocaleDateString()}</div>
            <div className="small"><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCard;
