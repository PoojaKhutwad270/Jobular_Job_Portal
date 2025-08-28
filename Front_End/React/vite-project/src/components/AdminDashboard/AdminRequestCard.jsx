
//import requestIcon from '../../assets/linkedindp1'; // replace with your request icon/logo

import AdminPopup from "./AdminPopup";

const RequestCard = ({ data, popup,selectedCompany,setSelectedCompany,setPopup }) => {
    
      
    return (
      

    <div className="mx-5 card p-3 mb-2 mt-2 shadow-sm border rounded-3">
      <div className="d-flex align-items-center gap-3">
        {/* <img
          src={requestIcon}
          alt="Request"
          height="50"
          width="50"
          className="rounded-circle border"
          style={{ objectFit: 'cover' }}
        /> */}

        <div className="flex-grow-1 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100">
          <div className="mb-2 mb-md-0">
            <h6 className="mb-1 fw-bold">{data.cname}</h6>
            <div className="small text-muted">{data.email}</div>
          </div>

          <div className="d-none d-md-flex flex-wrap gap-3">
            <div>
              <strong>Location:</strong> <span className="text-muted">{data.location}</span>
            </div>
          </div>

          <div className="d-none d-md-block text-end">
            <div className="small">
              <strong>Requested:</strong> {new Date(data.created_at).toLocaleDateString()}
            </div>
            <div className="small">
              <strong>Status:</strong> <span className={`badge bg-${
   data.status === 1 ? "success" : data.status === -1 ? "danger" : "warning"
}`}>
  {data.status === 1
    ? "Approved"
    : data.status === -1
    ? "Rejected"
    : "Pending"}
</span>
                           
                    {/* <span> */}
                        <button onClick={() => {
                               setSelectedCompany([data]);
                          setPopup(true);
                        }} className="btn btn-sm btn-outline-primary">View</button>
                      {/* </span> */}
                
             </div>
              </div>
            </div>
                {(popup) && (
             
                    <div>
                        <AdminPopup setPopup={setPopup} company={selectedCompany} />
              
                    </div>)}
          </div>
        </div>
      
  );
};

export default RequestCard;
