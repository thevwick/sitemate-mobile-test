const allNewsUrl = `${process.env.EXPO_PUBLIC_NEWS_API_BASE_URL}/everything?q=tech&pageSize=10&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`;

export const fetchNews = async () => {
  try {
    const response = await fetch(allNewsUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching data:", JSON.stringify(error));
    throw error;
  }
};
