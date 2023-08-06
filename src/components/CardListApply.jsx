import { updateStatus } from "../fetching/updateStatus";
import { fetchAppliedById } from "../fetching/appliedJobById";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FaFileLines } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function CardListApply({jobDetail, fetchData}) {

    const [status, setStatus] = useState(jobDetail.status);
    const { id } = useParams();
    

    const handleSubmit = async () => {
        try {
          await updateStatus(id, status);
    
          const updatedData = await fetchAppliedById(id);
          Swal.fire({
            icon: "success",
            title: "Status Updated!",
            timer: 1500,
            timerProgressBar: false,
            showConfirmButton: false,
          });
          console.log("Status updated successfully!");
          fetchData()
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
              <span className="text-black text-sm">Gender: {jobDetail?.User?.gender}</span> <br></br>
              <span className="text-black text-sm">Email: {jobDetail?.User?.email}</span> <br></br>
              <hr className="mt-1"></hr>
              <span className=" text-black text-sm">Status: {jobDetail?.status}</span>
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