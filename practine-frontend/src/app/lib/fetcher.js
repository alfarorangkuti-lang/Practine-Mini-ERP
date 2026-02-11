'use server'

import axiosClient from "./axios";

export const fetcher = async (url) =>
  await axiosClient.get(url).then((res) => res.data);
