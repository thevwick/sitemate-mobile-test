import { useEffect, useState } from "react";

import { fetchNews } from "@/api/news-api";

export type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const useFetchNews = (query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const fetchedArticles = await fetchNews(query);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching data:", JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [query]);

  return { loading, articles };
};

export default useFetchNews;
