import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000,
});

/** Get or create a persistent device ID stored in localStorage */
function getDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}

/**
 * Submit a GitHub repo for AI review.
 * @param {string} githubUrl
 * @param {"standard"|"recruiter"} mode
 */
export async function submitReview(githubUrl, mode) {
  try {
    const { data } = await api.post("/review", {
      github_url: githubUrl,
      mode,
      device_id: getDeviceId(),
    });
    return data;
  } catch (error) {
    throw {
      message:
        error?.response?.data?.detail ||
        "Failed to analyze repository. Please try again.",
      status: error?.response?.status,
    };
  }
}
