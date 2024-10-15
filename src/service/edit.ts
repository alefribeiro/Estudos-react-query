import { api } from "./api";

export async function edit(data: any) {
  const response = api.put(`/contacts`, data);

  return response;
}
