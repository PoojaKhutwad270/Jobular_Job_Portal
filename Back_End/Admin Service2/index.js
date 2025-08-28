import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; // 



 
const app = express();

app.use(cors());

app.listen(9000, () => {
  console.log("server is listening at 9000");
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "p08_jobportaldb"
}).promise(); // 

const queries = {
  totalUsers: "SELECT COUNT(*) AS total FROM user",
  jobSeekers: "SELECT COUNT(*) AS total FROM user WHERE rid=2",
  recruiters: "SELECT COUNT(*) AS total FROM user WHERE rid=3",
  jobs: "SELECT COUNT(*) AS total FROM job_requirement",
  activeJobs: "SELECT COUNT(*) AS total FROM job_requirement WHERE deadline >= CURDATE()",
  requestsNum: "SELECT COUNT(*) AS total FROM company WHERE status = 0",
  reportsNum: "SELECT COUNT(*) AS total FROM complaint WHERE status = 0",
  requests: "select * from company c left join user u ON c.uid = u.uid where c.status =0",
  reports: "select * from complaint c join company cp on cp.cid =c.cid join user u on c.uid= u.uid where c.status =0 and cp.status=1",
  allusers: "select * from user u join city c on u.cityid=c.cityid join role r on u.rid=r.rid",
  roles: 'SELECT rname,rid FROM role',
  allJobs: "SELECT * FROM job_requirement j JOIN company c ON j.cid = c.cid  ",
approve: "update company set status = 1 where cid=?" ,
  reject:"update company set status = -1 where cid=?" ,
    allrequests: "select * from company c left join user u ON c.uid = u.uid",
allreports : "select * from complaint c join company cp on c.cid=cp.cid left join user u ON c.uid = u.uid",
   totalreport:"SELECT COUNT(*) AS total FROM complaint WHERE cid = ? ",
  allReports : "SELECT cp.*, c.cname, u.uname FROM complaint cp JOIN company c ON cp.cid = c.cid JOIN user u ON cp.uid = u.uid"
     
    
}
//dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const result = {};

    const [totalUsersResult] = await con.query(queries.totalUsers);
    result.totalUsers = totalUsersResult[0].total;

    const [jobSeekersResult] = await con.query(queries.jobSeekers);
    result.jobSeekers = jobSeekersResult[0].total;

    const [recruitersResult] = await con.query(queries.recruiters);
    result.recruiters = recruitersResult[0].total;

    const [jobsResult] = await con.query(queries.jobs);
    result.jobs = jobsResult[0].total;

    const [activeJobsResult] = await con.query(queries.activeJobs);
    result.activeJobs = activeJobsResult[0].total;

    const [requestsNumResult] = await con.query(queries.requestsNum);
    result.requestsNum = requestsNumResult[0].total;

    const [reportsNumResult] = await con.query(queries.reportsNum);
    result.reportsNum = reportsNumResult[0].total;

    const [requestsResult] = await con.query(queries.requests);
    result.requests = requestsResult;

      const [reportsResult] = await con.query(queries.reports);
      result.reports = reportsResult;

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching dashboard data");
  }
});

//allusers
app.get("/admin/allusers", async (req,res) => {
  try { 
    const result = [];
    const [allusersResult] = await con.query(queries.allusers);
    result[0] = allusersResult;
     const [rows] = await con.query(queries.roles);
     
 result[1] = rows;
res.json(result);
  }
  catch (err) {
    res.status(500).send("Error fectching users");

  }
})

//alljobs
app.get("/admin/alljobs", async (req, res) => {
  try {
    const [allJobsResult] = await con.query(queries.allJobs);
    res.json(allJobsResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching jobs");
  }
});

app.patch("/approve/:cid", async (req, res) => {
  
  try {
    const { cid }  = req.params
    console.log(cid);
    const [approve] = await con.query(queries.approve,[cid]);
    
  res.status(200).send(`Company ${cid} approved successfully`);
  }catch (err) {
    res.status(500).send('Error approving company');
  }
 
});


app.patch("/reject/:cid", async (req, res) => {
  
  try {
    const { cid }  = req.params
    console.log(cid);
    const [rejectResult] = await con.query(queries.reject,[cid]);
    
  res.status(200).send(`Company ${cid} rejected `);
  }catch (err) {
    res.status(500).send('Error rejecting company');
  }
 
});
  
app.get("/admin/allrequests", async (req, res) => {
      
    try {
        const [allRequestsResult] = await con.query(queries.allrequests);
        res.json(allRequestsResult);
     
    }
    catch (err) {
        res.status(500).send('Error showing requests');
    }
  })
 

//   app.get("/ totalreport/:cid", async (req, res) => {
      
//       try {
//           const { cid } = req.params;
//         const [ totalreportResult] = await con.query(queries. totalreport,[cid]);
//         res.json( totalreportResult);
     
    
//   }catch (err) {
//     res.status(500).send('Error fetching total reports');
//   }
//   })


  

app.get("/totalreport/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const totalreport = "SELECT COUNT(*) AS total FROM complaint WHERE cid = ?";
    const [rows] = await con.query(totalreport, [cid]);
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error("Error fetching total complaints:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -------------------
// Block/Suspend a company
// -------------------
app.patch("/block/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const query = "UPDATE company SET status = -2 WHERE cid = ?";
    const [result] = await con.query(query, [cid]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company suspended successfully" });
  } catch (err) {
    console.error("Error suspending company:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/admin/allreports", async (req, res) => {
  try {
   
   const [allReportsResult] = await con.query(queries.allReports);
        res.json(allReportsResult);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Database error" });
  }
});