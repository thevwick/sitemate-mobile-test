export const fetchNews = async (query: string) => {
  const allNewsUrl = `${
    process.env.EXPO_PUBLIC_NEWS_API_BASE_URL
  }/everything?q=${query.length ? query : "tech"}&pageSize=20&apiKey=${
    process.env.EXPO_PUBLIC_NEWS_API_KEY
  }`;

  try {
    const response = await fetch(allNewsUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching data:", JSON.stringify(error));
    throw error;
  }
};
