import { PopulationData, Prefecture } from "@/types/home";

// APIにfetchをwarpする
export async function fetchPrefecture(): Promise<{ prefectures: Prefecture[] }> {
  const res = await fetch("/api/prefectures");
  if (!res.ok) {
    throw new Error("Failed to fetch prefectures data");
  }
  return await res.json();
}

export async function fetchPopulation(prefCode: number, prefName: string): Promise<{ populationData: PopulationData }> {
  const queryParams = new URLSearchParams({ prefCode: String(prefCode), prefName });

  const response = await fetch(`api/population?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch population: ${response.statusText}`);
  }

  return await response.json();
}
