import { useEffect, useState } from "react";
import { fetchAllJob } from "../../fetching/jobApplyById";
import ApplyCardUser from "../../components/ApplyCardUser";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  console.log(applications);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetchAllJob();
        setApplications(response);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <div className="bg-mint pb-36 pt-5">
      <h1 className="text-4xl text-center font-semibold text-black pt-5">
        Your Applications
      </h1>
      <div className="mx-[2px] grid grid-cols-3 gap-7 py-10 px-28">
        {applications.map((application) => (
          <ApplyCardUser key={application.id} applications={application} />
        ))}
      </div>
    </div>
  );
}
