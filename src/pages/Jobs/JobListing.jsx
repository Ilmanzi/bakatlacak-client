/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { jobListing } from "../../fetching/job_listing";
import { findTypes } from "../../fetching/type";
import { findSkills } from "../../fetching/skills";
import { getAllCompanyProfile } from "../../fetching/companyprofile";
import { useStore } from "../../modules/store";
import JobCard from "../../components/JobCard";
import { MultiSelect } from "react-multi-select-component"; // multiple select
import Select from "react-select"; // single select
import { Box, Spinner } from "@chakra-ui/react";
import Loading from "../../components/Loading";

let locations = [];
let typeOptions = [];
let companyOptions = [];

function JobListing() {
  const setJobList = useStore((state) => state.setJobList);
  const jobList = useStore((state) => state.jobList);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState("");
  const [skills, setSkills] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [q, setQ] = useState("");

  const [filterTypes, setFilterTypes] = useState([]);
  const [filterSalary, setFilterSalary] = useState(0);

  const [skillOptions, setSkillOptions] = useState([]);

  const [filterSkill, setFilterSkill] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterCompany, setFilterCompany] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jobListing({ limit: 12 });
        const dataTypes = await findTypes();
        const dataSkills = await findSkills();
        const dataCompany = await getAllCompanyProfile();
        setJobList(data);
        setIsLoading(false);
        setTypes(dataTypes);
        setSkills(dataSkills);
        setCompanies(dataCompany);

        typeOptions = dataTypes.map((t) => {
          return {
            value: t.id,
            label: t.title,
          };
        });

        companyOptions = dataCompany.map((company) => {
          return {
            value: company.id,
            label: company.name,
          };
        });

        const dataSkillOptions = dataSkills.map((s, index) => {
          return {
            value: s.id,
            label: `${s.name} ${s.level}`,
          };
        });

        locations = data.job_listing?.map((el) => el.location);
        locations = [...new Set(locations)];
        locations = locations.map((el) => {
          return {
            value: el,
            label: el,
          };
        });

        setSkillOptions(dataSkillOptions);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobList:", error);
        setIsLoading(false);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  const refetchData = async (params) => {
    try {
      params.limit = 12;
      const data = await jobListing(params);
      setJobList(data);
    } catch (err) {
      console.error("Error fetching jobList:", err);
    }
  };

  const handleSearch = async () => {
    let params = {};

    if (q) params.q = q;
    refetchData(params);
  };

  const handleSearchFilter = async () => {
    let params = {};
    if (filterTypes.length !== 0) {
      params.type_ids = filterTypes.map((el) => el.value);
    }

    if (filterSalary !== 0) {
      params.salary_start = filterSalary * 1000000;
    }

    if (filterSkill.length !== 0) {
      params.skill_ids = filterSkill.map((el) => el.value);
    }

    if (filterLocations.length !== 0) {
      params.locations = filterLocations.map((el) => el.value);
    }

    if (filterCompany || filterCompany.length !== 0) {
      params.company_id = filterCompany.value;
    }

    setQ("");
    refetchData(params);
  };

  const resetFilter = async () => {
    setFilterTypes([]);
    setFilterSalary(0);
    setFilterSkill([]);
    setFilterLocations([]);
    setFilterCompany("");
    setQ("");
    refetchData({});
  };

  const handleChangePage = async (el) => {
    let params = {
      page: +el,
    };
    setPage(+el);
    refetchData(params);
  };

  if (isLoading) {
    return <Loading />;
  }

  const InitPagination = () => {
    const pageNumbers = [];
    for (let i = 0; i < jobList.totalPages; i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div className="container flex justify-center mx-auto">
        <ul className="flex">
          {pageNumbers.map((el, idx) => {
            return (
              <li key={idx}>
                {page === +el ? (
                  <button
                    onClick={(e) => handleChangePage(el)}
                    className="h-10 px-5 text-white bg-black border border-r-0 border-gray-600 rounded-tl-full rounded-bl-full "
                  >
                    {el}
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleChangePage(el)}
                    className="h-10 px-5 text-black bg-white border border-r-0 border-gray-600 rounded-tl-full rounded-bl-full "
                  >
                    {el}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-mint pb-20">
      {/* Header */}
      <h1 className="text-4xl text-center font-semibold text-black mb-4">
        Jobs
      </h1>
      <div className="flex justify-center shadow-sm py-1">
        <div className="mt-4 mb-5">
          {/* Search */}
          <input
            className="w-96 rounded-xl border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.35rem] text-base font-normal leading-[1.6] text-black outline-none focus:z-[3] focus:border-teal focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(100,204,197)] focus:outline-none"
            type="text"
            name="q"
            placeholder="Find..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            onClick={handleSearch}
            type="button"
            className="bg-black text-white rounded-xl px-4 py-2 ml-2"
          >
            Search
          </button>
          <button
            className="bg-black text-white rounded-xl px-4 py-2 ml-2"
            onClick={toggleFilter}
            type="button"
          >
            Filter
          </button>
        </div>
      </div>
      {/* Header End */}

      {/* Filterisation */}
      {isFilterVisible && (
        <div className="flex flex-wrap px-2 py-4 gap-x-2 gap-y-1 justify-center shadow-md rounded-lg">
          {/* Companies */}
          <div className="flex flex-col w-full md:w-40 mr-5">
            <h2 className="text-xs text-left text-black">Companies</h2>
            <Select
              options={companyOptions}
              value={filterCompany}
              onChange={setFilterCompany}
              isClearable
              className="w-full text-xs"
              placeholder="Select..."
            />
          </div>

          {/* Types */}
          <div className="flex flex-col w-full md:w-40 mr-3">
            <h2 className="text-xs text-left text-black">Types</h2>
            <MultiSelect
              aria-labelledBy="Types"
              className="w-full text-xs py-0"
              options={typeOptions}
              value={filterTypes}
              onChange={setFilterTypes}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col w-full md:w-40 mr-5">
            <h2 className="text-xs text-left text-black">Skills</h2>
            <MultiSelect
              className="w-full text-xs py-0"
              options={skillOptions}
              value={filterSkill}
              onChange={setFilterSkill}
              labelledBy="Select..."
            />
          </div>

          {/* Locations */}
          <div className="flex flex-col w-full md:w-40 mr-5">
            <h3 className="text-xs text-left text-black">Locations</h3>
            <MultiSelect
              className="w-full text-xs py-0"
              options={locations}
              value={filterLocations}
              onChange={setFilterLocations}
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col w-full md:w-40">
            <h2 className="text-xs text-black text-left">
              Salary (In Million Rp)
            </h2>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full">
                <input
                  value={filterSalary}
                  onChange={(e) => setFilterSalary(+e.target.value)}
                  type="range"
                  className="w-full mt-6 text-sm accent-navy"
                  min="2"
                  max="12"
                  step="2"
                />
              </div>
              <ul className="flex justify-between w-full px-[10px]">
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">2</span>
                </li>
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">4</span>
                </li>
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">6</span>
                </li>
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">8</span>
                </li>
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">10</span>
                </li>
                <li className="flex justify-center relative">
                  <span className="absolute text-black text-xxs">12</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center ml-3">
            <button
              className="bg-white text-black font-semibold py-1 px-4 text-xs hover:bg-black hover:text-white border border-black hover:border-transparent rounded-xl mx-auto"
              onClick={handleSearchFilter}
              type="button"
            >
              Apply
            </button>

            <button
              className="bg-white text-black font-semibold py-1 px-4 text-xs hover:bg-black hover:text-white border border-black hover:border-transparent rounded-xl ml-2"
              onClick={resetFilter}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="mx-[2px] grid grid-cols-4 gap-2 py-10 place-items-end px-20">
        {jobList.job_listing.map((job) => (
          <JobCard key={job.id} job={job} className="job-card" />
        ))}
      </div>

      <InitPagination />
    </div>
  );
}

export default JobListing;
