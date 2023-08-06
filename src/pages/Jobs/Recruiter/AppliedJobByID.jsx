import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAppliedById } from "../../../fetching/appliedJobById";
import { useNavigate } from "react-router-dom"
import Loading from "../../../components/Loading";
import convertToRupiah from "../../../lib/converty";
import Swal from "sweetalert2";
import CardListApply from "../../../components/CardListApply";

export default function AppliedJobByID() {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    const data = await fetchAppliedById(id);
    setJobDetail(data);
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const handleCompanyDetail = () => {
    navigate(`/companydetail/${id}`)
  }

  return (
    <div className="flex justify-center pb-60 bg-mint">
      <div className="min-w-[70%]">
        <div>
          <div className="justify-between">
            {/* Header */}
            <div className="mt-[40px] ">
              <h2 className="font-normal">
                {jobDetail[0]?.JobListing?.CompanyProfile?.name}
              </h2>

              <h1 className="text-6xl font-semibold">
                {jobDetail[0]?.JobListing?.title}

              </h1>
            </div>

            {/* user Side */}
            <h1 className="mt-5 text-xl pl-1 pb-2">Applicants</h1>
            <div className="grid grid-cols-4 gap-2">
              {jobDetail.map((jobDetail, index) => {
                return <CardListApply jobDetail={jobDetail} key={index} fetchData={fetchData} />
              })}
            </div>
            {/* Header End */}
          </div>

          {/* Job Information Card */}
          <div className="mt-[20px] p-3 border-black border-2 rounded-md">
            <div className="grid grid-cols-3 gap-4">
              {/* Type */}
              <div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-bold">Type</h3>
                  <div>
                    {jobDetail[0]?.JobListing?.Types &&
                      jobDetail[0]?.JobListing?.Types.map((type) => (
                        <div key={type.id}>
                          <p>{type.title}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-bold">Location</h3>
                  <p>{jobDetail[0]?.JobListing?.location}</p>
                </div>
              </div>

              {/* Salary */}
              <div>
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-bold">Salary</h3>
                  <p>
                    {convertToRupiah(Number(jobDetail[0]?.JobListing?.salary_start))} -{" "}
                    {convertToRupiah(Number(jobDetail[0]?.JobListing?.salary_end))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Job Information Card End */}

          {/* Description */}
          <h2 className="mt-10 mb-0 font-semibold">Job Description</h2>
          <div className="bg-black bg-opacity-20 rounded-md p-4 border-black border-opacity-80">
            <p>{jobDetail[0]?.JobListing?.description}</p>
          </div>
          {/* Description End */}

          {/* Requirement Card */}
          <h2 className="mb-0 mt-10 font-semibold">Job Requirements</h2>
          <div className=" p-3 border-black border-2 rounded-md">
            <div className="grid grid-cols-4 gap-4">
              {jobDetail[0]?.JobListing?.Skills &&
                jobDetail[0]?.JobListing?.Skills.map((skill) => (
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
          <h2 className="mt-10 mb-0 font-semibold">
            About {jobDetail[0]?.JobListing?.CompanyProfile?.name}
          </h2>
          <h3 className="bg-black bg-opacity-20 rounded-md p-4 border-black border-opacity-80">
            {jobDetail[0]?.JobListing?.CompanyProfile?.description}
          </h3>
          <button
            onClick={handleCompanyDetail}
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-[20px]"
          >
            Company Detail
          </button>
          {/* About Company End */}
        </div>
        {/* <h1 className="flex font-bold text-black text-[20px] mt-8">
                Applicants
        </h1> */}
        {/* <div className="mt-[10px] mr-[10px]"> */}
        {/* user Side */}
        {/* <div className="flex gap-2 mt-5 text-[20px] font-regular">
                <h1>{jobDetail[0]?.User?.first_name}</h1>
                <h1>{jobDetail[0]?.User?.last_name}</h1>
              </div>
              <a href={jobDetail[0]?.resume}>
                <IconButton
                  boxSize={20}
                  fontSize={30}
                  icon={<FaFileLines />}
                ></IconButton>
              </a>
              <div className="mt-5">{jobDetail[0]?.resume}</div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500 mr-4"
              >
                <option value="" disabled defaultValue>
                  Choose your role
                </option>
                <option value="onreview">onreview</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
              </select>

              <button
                onClick={handleSubmit}
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-[20px]"
              >
                Confirm
              </button>
            </div> */}
      </div>
    </div>
  );
}
