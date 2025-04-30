import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const createTempEmail = () => API.post("temp-emails/");
export const markMessageAsRead = (messageId) =>
  API.post(`temp-emails/${messageId}/mark_read/`);
export const fetchMessages = (emailId) =>
  API.get(`temp-emails/${emailId}/messages/`);
