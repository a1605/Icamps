import { http } from "../../../services/httpServices";

export const getFaqList = async (page, filterData, col, order) => {
  let url = `/faq?page=${page - 1}&pagination=true&pageSize=15`;

  return await http.get(
    url,

    {
      headers: {
        order: order,
        col: col,
      },
    },
    {
      ...filterData,
    }
  );
};

export const createSingleFaq = async (data) => await http.post(`/faq`, data);

export const updateSingleFaq = async (data) =>
  await http.put(`/faq/${data.id}`, data);

export const deleteFaq = async (id) => await http.delete(`/faq/${id}`);

export const getSingleFaq = async (id) => await http.get(`/faq/${id}`);
