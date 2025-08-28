import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminJobCard from "./AdminJobCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";

const AdminAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:9000/admin/alljobs")
      .then(res => {
        setJobs(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
     <AdminNavbar/>
      <div className="container">
        <h3 className="mt-3 text-center">All Jobs</h3>
        <div className="row justify-content-center">
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
                jobs.map((job) => (
                
          
              <Link  to={`/RecruiterDashboard/JobDetail/${job.req_id}`} > {console.log(job.req_id)} <AdminJobCard
         
                title={job.job_title}
                company={job.cname}
                location={job.location}
              
                postedOn={job.experience}
                deadline={job.deadline}
              /></Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAllJobs;
