import { api } from "./api";

export async function create(data: any) {
  const response = await api.post("/contacts/", data);

  return response;
}
