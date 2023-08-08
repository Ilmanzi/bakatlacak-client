/* eslint-disable no-unused-vars */
import instance from "../lib/axios.jsx";

export async function jobListing(filterOptions = null) {
  try {
    const response = await instance.get("/job_listing", {
      params: filterOptions,
    });
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function jobListingById(id) {
  try {
    const response = await instance({
      method: "GET",
      url: `/job_listing/${id}`
    })

    const data = response.data

    return data
  } catch (err) {
    console.log(err)
    
  }
}
