import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Layout, Spinner, Text } from "@ui-kitten/components";
import { Article } from "@/hooks/use-fetch-news";

import NewsCard from "./components/news-card";

const allNewsUrl = `${process.env.EXPO_PUBLIC_NEWS_API_BASE_URL}/everything?q=tech&pageSize=10&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`;

const HomeScreen: React.FC = () => {
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
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.header} category="h1">
        News
      </Text>
      <Layout style={styles.layout}>
        {loading ? (
          <Spinner size="giant" />
        ) : (
          <View style={styles.newsContainer}>
            <FlatList
              data={articles}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => <NewsCard article={item} />}
            />
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 5,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  newsContainer: {
    padding: 20,
  },
});

export default HomeScreen;
