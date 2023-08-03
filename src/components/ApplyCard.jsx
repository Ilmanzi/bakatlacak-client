/* eslint-disable react/prop-types */
import convertToRupiah from "../lib/converty";

export default function ApplyCard({ applications }) {

  const numberOfApplyers = applications?.JobApplications.length
  

    return (
      <div className="w-full h-full justify-items-start shadow-xl hover:shadow-xl rounded-xl">
        <div className="w-full h-full group bg-white p-4 job-card rounded-xl justify-items-start items-start">
          <div className="flex">
            <img
              className="aspect-[2/2] w-16 flex-none"
              src="https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/school/10284.png"
              alt="Company Logo"
            />
            <div className="grow pt-2">
              <h3 className="text-xl font-bold text-black">
                {applications.CompanyProfile?.name}
              </h3>
              <span className="text-xs text-black">{applications.location}</span>
            </div>
            <div className="flex-none w-16">
            </div>
          </div>
          <div className="pb-5 pt-4">
            <h3 className="text-2xl font-medium text-black">
              {applications.title}
            </h3>
            <div className="mt-2 text-sm text-black">
              {convertToRupiah(applications.salary_start)} - {convertToRupiah(applications.salary_end)}
            </div>
            <div className="mt-5">
              <p>Job Applicants: {numberOfApplyers} candidates</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  