import { useEffect, useState } from "react";
import ApplyCard from "../../../components/ApplyCard";
import { fetchAllApplied } from "../../../fetching/allAppliedJob";
import { useNavigate } from "react-router-dom";

export default function AllAppliedJob() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const handleClickDetail = (id) => {
    navigate(`/applied-job/${id}`);
  };

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetchAllApplied();
        setApplications(response);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <div className="bg-mint pb-36 pt-5">
      <h1 className="text-4xl text-center font-semibold text-black py-4">
        Your Job posts.
      </h1>
      <div className="mx-auto grid grid-cols-3 gap-7 py-10 px-32">
        {applications?.map((application) => (
          <button
            onClick={() => handleClickDetail(application.id)}
            type="button"
            key={application.id}
          >
            <ApplyCard applications={application} />
          </button>
        ))}
      </div>
    </div>
    
  );
}
