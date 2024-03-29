import { http } from "../../../services/httpServices";

export const getFeedbackList = async (page) =>
  await http.get(
    `/inventory/feedback?page=${page - 1}&pagination=true&pageSize=14`
  );

export const getSingleFeedback = async (id) => 
await http.get(`/inventory/feedback/${id}`)


export const updateSingleFeedback = async (data) =>
  await http.put(
    `/inventory/feedback/${data.feedbackId}`,
    data
  );