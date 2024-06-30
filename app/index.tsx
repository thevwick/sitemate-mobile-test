import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Card, Layout, Spinner, Text } from "@ui-kitten/components";

type Article = {
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

const allNewsUrl = `${process.env.EXPO_PUBLIC_NEWS_API_BASE_URL}/everything?q=australia&pageSize=1&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`;

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);

  // console.log(articles);
  console.log(articles.length);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(allNewsUrl);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching data:", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.center}>
      <Text category="h1">News</Text>
      {loading ? (
        <Spinner size="giant" />
      ) : (
        <View style={styles.cardContainer}>
          <Card>
            <Avatar
              // style={styles.avatar}
              shape="square"
              ImageComponent={() => (
                <Image
                  style={styles.image}
                  source={{ uri: articles[0]?.urlToImage }}
                />
              )}
            />
            <Text category="h6">{articles[0]?.title}</Text>
            <Text category="c2">{articles[0]?.description}</Text>
          </Card>
        </View>
      )}
      {}
    </Layout>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    margin: 20,
  },
  image: {
    width: 96,
    height: 96,
  },
});
