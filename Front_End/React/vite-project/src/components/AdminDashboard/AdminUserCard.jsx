
import React from 'react';
import linkedindp1 from '../../assets/linkedindp1.png';
import Navbar from '../Navbar';

const AdminUserCard = ({
  name,
  email,
  role,
  skills = [],
  location,
  
 
}) => {
  return (
    <>
     
    <div className="mx-5 card p-3 mb-2 mt-2 shadow-sm border rounded-3">
      <div className="d-flex align-items-center gap-3">
        <img
          src={linkedindp1}
          alt="User"
          height="50"
          width="50"
          className="rounded-circle border"
          style={{ objectFit: 'cover' }}
        />

        <div className="flex-grow-1 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100">
          <div className="mb-2 mb-md-0">
            <h6 className="mb-1 fw-bold">{name}</h6>
            <div className="small text-muted">{email}</div>
          </div>

          <div className="d-none d-md-flex flex-wrap gap-3">
            <div><strong>Role:</strong> <span className="text-muted">{role}</span></div>
            <div><strong>Location:</strong> <span className="text-muted">{location}</span></div>
            
           
          </div>

          <div className="d-none d-md-block">
            {skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="badge bg-light text-dark border me-1">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
 </> );
};

export default AdminUserCard;
