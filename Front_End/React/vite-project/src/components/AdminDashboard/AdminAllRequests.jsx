import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import RequestCard from './AdminRequestCard';
import AdminNavbar from './AdminNavbar';

const AdminAllRequests = () => {
  const [loadData, setLoadData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Numeric status filter

  useEffect(() => {
    axios.get("http://localhost:9000/admin/allrequests")
      .then((res) => { 
        setLoadData(res.data);
      })
      .catch((error) => { console.error(error); });
  }, []);

  // Filter based on numeric status
  const filteredData = selectedStatus !== null
    ? loadData.filter(item => item.status === selectedStatus)
    : loadData;

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-end">
          <div className="dropdown m-2">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Filter
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setSelectedStatus(null)}
                >
                  All Status
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setSelectedStatus(1)}  // Approved
                >
                  Approved
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setSelectedStatus(0)}  // Pending
                >
                  Pending
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setSelectedStatus(-1)} // Rejected
                >
                  Rejected
                </a>
              </li>
            </ul>
          </div>
        </div>

        <h3>All Requests</h3>
        {filteredData.map((data) => (
          <RequestCard
            key={data.cid}
            popup={popup}
            setPopup={setPopup}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            data={data}
          />
        ))}
      </div>
    </>
  );
};

export default AdminAllRequests;


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import RequestCard from './AdminRequestCard';
// import AdminNavbar from './AdminNavbar';

// const AdminAllRequests = () => {

//     const [loadData, setLoadData] = useState([]);
//     const [popup, setPopup] = useState(false);
//     const [selectedCompany, setSelectedCompany] = useState([]);

//  useEffect(() => {
//         axios.get("http://localhost:9000/admin/allrequests").then((res) => { setLoadData(res.data) }).catch((error) => { console.error(error); })
// },[])
//     console.log(loadData);
//     return (
//         <><AdminNavbar />
//         <div className='container'>
            
//             <h3 >All Requests</h3>

//                 {loadData.map((data) => (
//                     <RequestCard  popup={popup} setPopup={setPopup} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} data={data} />
//             ))
//             }
    
   
//   </div></>)
// }

// export default AdminAllRequests