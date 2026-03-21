import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

/**
 * Submit a GitHub repo for AI review.
 * @param {string} githubUrl
 * @param {"standard"|"recruiter"} mode
 */
export async function submitReview(githubUrl, mode) {
  const { data } = await api.post("/review", {
    github_url: githubUrl,
    mode,
  });
  return data;
}
