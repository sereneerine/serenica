import axios from "axios";

export const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetcher(path: string) {
  const url = path.startsWith("/") ? `${apiBase}${path}` : path;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
}
