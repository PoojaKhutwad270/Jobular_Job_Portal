import { Link } from 'react-router-dom';
//import { useSelector } from 'react-redux';

const PostJob = () => {
  //  const loggedInUser = useSelector((store) => store.loggedInUser);

    return (
        <div>
            {/* Welcome Card */}
            <div className="container mt-4">
                <div className="card shadow-lg p-3 rounded-4 border-0">
                    <h2 className="text-primary mb-3 text-base">Post Job </h2>
                    <p className="fs-5 text-muted" style={{ lineHeight: '1.8' }}>
                        <p className="text-xxs text-gray-600 mt-2">
                            Use this form to post a new job opening. Provide clear details about the role, required skills, and any relevant perks to attract the right candidates.
                        </p>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostJob;