export const fetchImages = async (query, page, accessKey) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve data");
  }
  const data = await response.json();
  return data;
};
