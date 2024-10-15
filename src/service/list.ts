import { api } from "./api";

export async function list() {
  const response = await api.get("/contacts/");

  return response.data;
}
