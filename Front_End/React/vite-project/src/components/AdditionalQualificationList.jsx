// AdditionalQualificationsList.jsx
import React from "react";

const AdditionalQualificationsList = ({ qualifications }) => {
  if (!qualifications || qualifications.length === 0) {
    return <p>No additional qualifications added yet.</p>;
  }

  return (
    <ul className="list-group">
      {qualifications.map((qual) => (
        <li key={qual.qid} className="list-group-item">
          <h5>{qual.qname}</h5>
          <p>
            <strong>University:</strong> {qual.university}<br />
            <strong>Specialization:</strong> {qual.specialization || "N/A"}<br />
            <strong>Marks:</strong> {qual.marks}<br />
            <strong>Grade:</strong> {qual.grade || "N/A"}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default AdditionalQualificationsList;
