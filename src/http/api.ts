import { API_ENDPOINTS, BASE_URL } from "../config/constants";

export const getBreedList = async () => {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.breeds}/list/all`);
  return await res.json();
};

export const getDogsImages = async (breed: string, subBreed?: string) => {
  let requestURL = "";
  if (subBreed.length) {
    requestURL = `${BASE_URL}${API_ENDPOINTS.breed}/${breed}/${subBreed}/images`;
  } else {
    requestURL = `${BASE_URL}${API_ENDPOINTS.breed}/${breed}/images`;
  }

  const res = await fetch(requestURL);
  return await res.json();
};
