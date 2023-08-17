/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobDetail } from "../../fetching/jobDetail";
import { useStore } from "../../modules/store";
import Loading from "../../components/Loading"
import convertToRupiah from "../../lib/converty";

export default function JobDetail() {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobDetail(id);
        setJobDetail(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  if (loading) {
    <Loading />
    return 
  }

  const handleApplyClick = () => {
    if (["recruiter"].includes(user.role)) {
      navigate(`/applied-job/${jobDetail.id}`);
    } else {
      navigate(`/job-apply/${jobDetail.id}`);
    }

  };

  const handleCompanyDetail = () => {
    navigate(`/companydetail/${jobDetail.company_id}`);
  };

  return (
    <div className="flex justify-center py-4 px-10 bg-mint">
      <div className="min-w-[1000px]">
        <div>
          {/* Header */}
          <div className="mt-[40px]">
            <h2 className="font-normal">{jobDetail.CompanyProfile?.name}</h2>

            <h1 className="text-6xl font-semibold">{jobDetail.title}</h1>
            {/* Header End */}
          </div>

          {/* Apply */}
          
          <button
            onClick={() => handleApplyClick()}
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-[20px]"
          >
          {["recruiter"].includes(user.role) ? "Applications" : "Apply"}
          </button>
          {/* Apply End */}

          {/* Job Information Card */}
          <div className="mt-[20px] p-3 border-black border-2 rounded-md">
            <div>
              {/* Type */}
              <div className="grid grid-cols-3 gap-4 py-6 rounded-xl shadow-md">
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-bold">Type</h3>
                  <div>
                    {jobDetail.Types &&
                      jobDetail.Types.map((type) => (
                        <div key={type.id}>
                          <p>{type.title}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Location */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-md font-bold">Location</h3>
                    <p>{jobDetail.location}</p>
                  </div>

                  {/* Salary */}

                  <div className="flex flex-col items-center">
                    <h3 className="text-md font-bold">Salary</h3>
                    <p>
                      {convertToRupiah(Number(jobDetail.salary_start))} - {convertToRupiah(Number(jobDetail.salary_end))}
                    </p>
                  </div>
              </div>

             {/* Location */}
              <div>
              <h2 className="mt-10 font-semibold">
                About
              </h2>
              <h3 className="bg-black bg-opacity-20 rounded-md p-4 border-black border-opacity-80">
                {jobDetail.description}
              </h3>
              </div>
              {/* Description End */} 

              {/* Requirement Card */}
              <h2 className="mb-0 mt-10 font-semibold">Job Requirements</h2>
              <div className=" p-0 shadow-md rounded-xl">
                <div className="grid grid-cols-4 gap-4 mb-0">
                  {jobDetail.Skills &&
                    jobDetail.Skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="min-w-[120px] mb-3 p-3 rounded-md"
                      >
                        <div className="flex flex-col items-center">
                          <h3 className="text-md font-bold">{skill.name}</h3>
                          <div>
                            <p>{skill.level}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Requirement Card End */}

              {/* About Company */}
              <h2 className="mt-10 font-semibold">
                About {jobDetail.CompanyProfile?.name}
              </h2>
              <h3 className="bg-black bg-opacity-20 rounded-md p-4 border-black border-opacity-80">
                {jobDetail.CompanyProfile?.description}
              </h3>
              <button
                onClick={handleCompanyDetail}
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-[30px] mb-[10px]"
              >
                Company Detail
              </button>
              {/* About Company End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
