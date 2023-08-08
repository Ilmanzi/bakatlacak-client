import instance from "../lib/axios.jsx";

export async function updateStatus({id, status, user_id}) {
  try {
    const response = await instance({
      method: "PUT",
      url: `/job_application/${id}?status=${status}`,
      data: {
        user_id
      }
    })

    // const response = await instance.put(
    //   `/job_application/${id}?status=${status}`
    // );
    // const data = response.data;
  } catch (err) {
    console.log(err);
  }
}
