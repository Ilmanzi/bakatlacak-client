import { updateStatus } from "../fetching/updateStatus";
import { fetchAppliedById } from "../fetching/appliedJobById";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaFileLines } from "react-icons/fa6";

export default function CardListApply({jobDetail}) {

    const [status, setStatus] = useState(jobDetail.status);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await updateStatus(id, status);
    
          const updatedData = await fetchAppliedById(id);
          setJobDetail(updatedData);
          setSuccess(true);
          Swal.fire({
            icon: "success",
            title: "Status Updated!",
            timer: 3000,
            timerProgressBar: false,
            onClose: () => {
              setSuccess(false);
            },
          });
          console.log("Status updated successfully!");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };

    return(
        <div className="w-full h-full justify-items-start shadow-xl hover:drop-shadow-2xl rounded-xl">
        <div className="w-full h-full group bg-white p-4 rounded-xl job-card justify-items-start items-start">
          <div className="flex">
            <div className="grow pt-2">
              <div className="flex gap-2 text-[20px] font-semibold">
                <h1>{jobDetail?.User?.first_name}</h1>
                <h1>{jobDetail?.User?.last_name}</h1>
              </div>
              <span className="text-xs text-black">Gender: {jobDetail?.User?.gender}</span> <br></br>
              <span className="text-xs text-black">Email: {jobDetail?.User?.email}</span>
            </div>
            <div className="flex-none">
              <a href={jobDetail?.resume}>
                <IconButton
                  boxSize={"12"}
                  fontSize={30}
                  icon={<FaFileLines />}
                ></IconButton>
              </a>
            </div>
          </div>
          <div className="flex">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="grow pl-2 mt-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500 mr-4"
            >
              <option>
                {jobDetail.status}
              </option>
              <option value="onreview">onreview</option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-black hover:bg-blue-700 text-white font-bold px-2 mr-1 mt-1 rounded-xl flex-none"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
}