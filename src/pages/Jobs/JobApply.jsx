import { useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useDropzone } from "react-dropzone";
import fetchJobApply from "../../fetching/jobApply";
import Swal from "sweetalert2";

export default function JobApply() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState(null); // Initialize to null
  const navigate = useNavigate()

  const checkToken = localStorage.getItem("token")
  if (!checkToken) {
    navigate(`/login`)
  }

  const handleFileChange = (acceptedFiles) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      setResumeFile(acceptedFiles[0]);
    } else {
      setError("Please select a valid resume file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError("Please select a resume file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await fetchJobApply(id, resumeFile);
      setIsLoading(false);
      setSuccess(true);
      Swal.fire({
        icon: "success",
        title: "Application submitted successfully!",
        timer: 3000,
        timerProgressBar: false,
        onClose: () => {
          setSuccess(false);
        },
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Submission failed!",
        text: error.message,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf,.doc,.docx",
    onDrop: handleFileChange,
  });



  return (
    <div className="bg-mint flex py-40 px-40 justify-center bg-gradient-to-r from-navy to-teal">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold mb-4">Apply for Job</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4">
            Application submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div {...getRootProps()} className="mb-4 border-2 border-dashed p-4">
            <input {...getInputProps()} />
            <p>Drop your resume file here, or click to select a file.</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
