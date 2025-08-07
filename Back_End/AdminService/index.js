import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; // ✅ import



 
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
}).promise(); // ✅ make it promise-based

const queries = {
  totalUsers: "SELECT COUNT(*) AS total FROM user",
  jobSeekers: "SELECT COUNT(*) AS total FROM user WHERE rid=2",
  recruiters: "SELECT COUNT(*) AS total FROM user WHERE rid=3",
  jobs: "SELECT COUNT(*) AS total FROM job_requirement",
  activeJobs: "SELECT COUNT(*) AS total FROM job_requirement WHERE deadline >= CURDATE()",
  requestsNum: "SELECT COUNT(*) AS total FROM company WHERE status = 0",
  reportsNum: "SELECT COUNT(*) AS total FROM complaint WHERE status = 0",
  requests: "select * from company c left join user u ON c.uid = u.uid ",
  //reports: "select c.uid, u.uname, c.date, c.status, c.description from complaint c join company cp on cp.cid =c.cid where status =0 "
  allusers: "select * from user u join city c on u.cityid=c.cityid join role r on u.rid=r.rid",
  roles: 'SELECT rname FROM role',
  allJobs: "SELECT * FROM job_requirement j JOIN company c ON j.cid = c.cid  ",
  approve:"update company set status = true where cid=?"       
 
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

    //   const [reportsResult] = await con.query(queries.reports);
    //  result.reports = reportsResult;

      
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
    const [allJobs] = await con.query(queries.allJobs);
    res.json(allJobs);
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
  
  
 

