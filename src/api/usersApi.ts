// usersApi.ts
import { apiFetch, FetchOptions } from "./api";

export interface User {
  id?: number;
  username: string;
  email: string;
}

//criando um usuario
export async function createUser(userData: User, token: string): Promise<User> {
  const options: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  };

  return await apiFetch<User>("/users", options);
}

// buscando usuarios
export async function getUsers(): Promise<User[]> {
  return await apiFetch<User[]>("/users");
}

// atualizando um usuario
export async function updateUser(
  id: number | string,
  updatedData: Partial<User>,
  token: string
): Promise<User> {
  const options: FetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  };

  return await apiFetch<User>(`/users/${id}`, options);
}

//deletando um usuario
export async function deleteUser(id: number | string, token: string): Promise<void> {
  const options: FetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await apiFetch<void>(`/users/${id}`, options);
}
