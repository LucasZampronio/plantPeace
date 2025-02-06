// plantsApi.ts
import { apiFetch, FetchOptions } from "./api";

export interface Plant {
  id?: number;
  name: string;
  price: string;
  discountPercentage?: string;
  highlightItem?: boolean;
  createdAt?: string;
}

// criando uma planta
export async function createPlant(plantData: Plant, token: string): Promise<Plant> {
  const options: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plantData),
  };

  return await apiFetch<Plant>("/plants", options);
}

// buscando uma planta
export async function getPlants(): Promise<Plant[]> {
  return await apiFetch<Plant[]>("/plants");
}

// atualizando uma planta
export async function updatePlant(
  id: number | string,
  updatedData: Partial<Plant>,
  token: string
): Promise<Plant> {
  const options: FetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  };

  return await apiFetch<Plant>(`/plants/${id}`, options);
}

// excluindo uma planta
export async function deletePlant(id: number | string, token: string): Promise<void> {
  const options: FetchOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await apiFetch<void>(`/plants/${id}`, options);
}
