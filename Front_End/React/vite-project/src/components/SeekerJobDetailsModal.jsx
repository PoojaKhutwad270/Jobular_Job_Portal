import React from 'react';

const SeekerJobDetailsModal = ({ job, onClose, onApply }) => {
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <div className="d-flex align-items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Logo"
                width="50"
                height="50"
                className="me-3"
              />
              <div>
                <h4 className="modal-title fw-bold text-primary mb-0">{job.companyName}</h4>
                <small className="text-muted">{job.companyEmail}</small>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <h5 className="fw-bold text-dark mb-3">
              Role: <span className="text-success">{job.jobTitle}</span>
            </h5>
            <p><strong>Location:</strong> {job.companyCity}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>HR Email:</strong> {job.hrEmail}</p>
            <p><strong>HR Mobile:</strong> {job.hrMobile}</p>

            <hr />
            <div>
              <strong>Required Skills:</strong>
              {job.skills?.length > 0 ? (
                <ul className="mt-2">
                  {job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No skills listed</p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={() => onApply(job.jobId)}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerJobDetailsModal;
