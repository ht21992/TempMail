import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/", // Django backend
});

export const createTempEmail = () => API.post("temp-emails/");
export const fetchMessages = (emailId) =>
  API.get(`temp-emails/${emailId}/messages/`);
