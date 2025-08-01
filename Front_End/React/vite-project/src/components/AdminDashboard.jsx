import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      [Dashboard] | [Users] | [Jobs] | [Reports] |{" "}
      <Link to="/AdminProfile">[Profile]</Link> | [Logout]
      <br />
      <br />
      <br />
      {/*No of pending requests*/}
      {/*No of pending compliants*/}
      {/* no of users*/}
      {/* no of seekers*/}
      {/*no of recruiters*/}
      {/* Total Jobs Posted*/}
      {/* Active Jobs*/}
      {/*Total Reports/Flags*/}
      {/*Total recruitememt this month*/}
    </div>
  );
};

export default AdminDashboard;
