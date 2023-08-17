import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobListing } from "../fetching/job_listing";
import JobCard from "../components/JobCard";
import TypeAnimate from "../components/TypeAnimation";

export default function Home() {
  const [jobCard, setJobCard] = useState([]);
  const handleDetail = (id) => {
    navigate(`/job/${id}`);
  };

  const navigate = useNavigate();

  function handleButton(path) {
    navigate(path);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jobListing();
        setJobCard(data.job_listing.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {/* Heading */}
      <div className="flex background-home px-4 py-10 w-full h-80% shadow-md justify-center items-center flex-row"></div>
      <div className="flex items-center gap-x-16 min-[320px]:px-5 md:px-10 lg:px-40 min-[320px]:h-[400px] lg:h-[650px] landing-content">
        <div className="landing-content text-center mx-0">
          <h2 className="font-bold text-black min-[320px]:text-3xl md:text-5xl lg:text-7xl">
            Find your career path <br></br> <TypeAnimate fontSize={{ base: '24px', md: '40px', lg: '56px' }} />
          </h2>


          <p className="mt-4 font-regular text-black min-[320px]:text-xs md:text-sm lg:text-lg">
            Initiate your journey towards your dream job by uncovering your
            talents through BakatLacak. Exceptional companies, esteemed and
            well-established, actively seek your presence, offering an
            integrated platform for your success.
          </p>

          <button
            onClick={() => handleButton("/job")}
            className="mt-8 inline-block rounded bg-[#001C30] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Flow */}
      <div className="py-20 w-full flex flex-col justify-center items-center bg-mint">
        <h1 className="text-center min-[320px]:mx-10 font-bold min-[320px]:text-4xl text-black mb-[50px]">
          How exactly you apply for a job
        </h1>
        <div className="flex gap-10 flex-col lg:flex-row">
          <div className="flex flex-col p-5 justify-center items-center job-card rounded-md border border-[#176B87]  shadow-md hover:border-[#001C30] hover:ring-1 hover:ring-blue-200 focus:outline-none focus:ring hover:shadow-[#001c3094] bg-white ">
            <svg
              className="h-[100px] w-[100px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="resume"
            >
              <path d="M4.5 32h23a.5.5 0 0 0 .5-.5v-27a.5.5 0 0 0-.5-.5H21v-.5a.5.5 0 0 0-.5-.5H18c0-1.103-.897-2-2-2s-2 .897-2 2h-2.5a.5.5 0 0 0-.5.5V4H4.5a.5.5 0 0 0-.5.5v27a.5.5 0 0 0 .5.5zM14.592 4a.501.501 0 0 0 .471-.667A1.004 1.004 0 0 1 15 3c0-.551.449-1 1-1s1 .449 1 1c0 .104-.021.213-.063.333a.501.501 0 0 0 .471.667H20v2h-8V4h2.592zM5 5h6v1.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V5h6v26H5V5z"></path>
              <path d="M25.5 6h-3a.5.5 0 0 0 0 1H25v22H7V7h2.5a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5v-23a.5.5 0 0 0-.5-.5z"></path>
              <path d="m9.544 10.153.286 1.046c.011.042.048.066.069.102v.555c0 .586.245 1.115.636 1.495v.519l-1.392.522a1.779 1.779 0 0 0-1.148 1.658v1.45a.5.5 0 0 0 1 0v-1.45c0-.319.201-.609.5-.721l.534-.2a2.71 2.71 0 0 0 1.959.858c.752 0 1.452-.325 1.962-.863l.545.204c.299.112.5.402.5.721v1.45a.5.5 0 0 0 1 0v-1.45c0-.733-.461-1.4-1.148-1.658l-1.407-.528v-.513c.39-.379.634-.908.634-1.494v-.52a.508.508 0 0 0 .068-.164l.297-1.379c.062-.336-.013-.676-.21-.956s-.491-.465-.829-.521l-1.81-.302a1.249 1.249 0 0 0-1.394.843 1.13 1.13 0 0 0-.652 1.296zm3.53 1.703c0 .397-.224.73-.543.92-.058.034-.114.07-.176.093a1.113 1.113 0 0 1-.272.055 1.058 1.058 0 0 1-.195 0 1.088 1.088 0 0 1-.27-.055c-.061-.022-.117-.058-.174-.092a1.073 1.073 0 0 1-.545-.921v-.289h2.175v.289zm-1.955 2.864.092-.035a.5.5 0 0 0 .324-.468v-.323l.01.001c.143.031.29.049.442.049h.001l.014-.001c.147-.001.29-.018.429-.048l.01-.001v.324c0 .219.142.399.338.467l.002.001.083.031a1.867 1.867 0 0 1-1.745.003zm-.579-4.905a.115.115 0 0 1 .094-.045c.276 0 .5-.244.5-.52 0-.102.056-.164.089-.192a.243.243 0 0 1 .205-.057l1.81.302c.096.016.15.076.174.11a.26.26 0 0 1 .048.186l-.209.968h-2.556l-.179-.651a.116.116 0 0 1 .024-.101zM17.5 12h6a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5zm.5-2h5v1h-5v-1zm6 9.5a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-2zM23 21H9v-1h14v1zm.5-8h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm-6 1h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zm3 9h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm-11.65.149a.503.503 0 0 0-.7 0A.473.473 0 0 0 8 23.5c0 .069.01.13.04.189.02.061.06.12.11.16.04.05.1.09.16.11.06.031.12.041.19.041s.13-.01.19-.04a.372.372 0 0 0 .16-.11c.05-.04.09-.1.11-.16.03-.06.04-.121.04-.19 0-.13-.05-.26-.15-.351zM20.5 25h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm-11.65.149a.503.503 0 0 0-.7 0A.473.473 0 0 0 8 25.5c0 .14.05.26.15.35.09.1.22.15.35.15.07 0 .13-.01.19-.04a.372.372 0 0 0 .16-.11c.05-.04.09-.1.11-.16.03-.06.04-.121.04-.19 0-.13-.05-.26-.15-.351zM20.5 27h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm3-4h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-15.19.04c-.06.02-.12.06-.16.109-.1.091-.15.221-.15.351s.05.26.15.35c.09.1.22.15.35.15.13 0 .26-.05.35-.15.1-.09.15-.22.15-.35s-.05-.26-.15-.351a.479.479 0 0 0-.54-.109zM17.5 16h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1zm0 2h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1z"></path>
            </svg>
            <h2 className="font-bold py-2 text-2xl ">1. Drop Your CV</h2>
          </div>

          <div className="flex flex-col p-5 justify-center items-center rounded-md job-card border border-[#176B87]  shadow-md hover:border-[#001C30] hover:ring-1 hover:ring-blue-200 focus:outline-none focus:ring hover:shadow-[#001c3094] bg-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-[100px] w-[100px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h2 className="font-bold py-2 text-2xl ">
              2. Wait for response
            </h2>
          </div>

          <div className="flex flex-col p-5 justify-center items-center rounded-md job-card border border-[#176B87]  shadow-md hover:border-[#001C30] hover:ring-1 hover:ring-blue-200 focus:outline-none focus:ring hover:shadow-[#001c3094] bg-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-[100px] w-[100px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>

            <h2 className="font-bold py-2 text-2xl ">3. Get Accepted</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <button

            onClick={() => handleButton("/job")}
            className="mt-20 uppercase rounded-full bg-black px-8 py-4 text-xl text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring focus:ring-yellow-400"
          >
            find your next job
          </button>
        </div>

      </div>
      {/* Flow End */}

      {/* Job Overview */}
      <h1 className="bg-mint flex justify-center text-3xl font-bold min-[320px]:text-4xl text-black pt-10 ">
        Available Jobs
      </h1>
      <div className="bg-gradient-to-b from-mint to-black pb-20 pt-10">
        <div className="mx-[2px] grid min-[320px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-10 place-items-end min-[320px]:px-5 md:px-15 lg:px-20">
          {jobCard.map((job, index) => (
            <JobCard key={index} job={job} className="job-card" />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleButton("/job")}
            className="uppercase rounded-full bg-white px-8 py-4 text-xl text-black transition hover:bg-black hover:text-white"
          >
            more jobs
          </button>
        </div>
      </div>
    </section>
  );
}
