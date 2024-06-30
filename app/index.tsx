import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import useFetchNews from "@/hooks/use-fetch-news";

import NewsCard from "./components/news-card";

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const { loading, articles } = useFetchNews(searchQuery);

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.header} category="h1">
        News
      </Text>
      <View style={styles.searchContainer}>
        <Input
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for news..."
        />
        <Button style={styles.searchButton} onPress={handleSearch}>
          Search
        </Button>
      </View>
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
  searchContainer: {
    flexDirection: "row",
    padding: 25,
    paddingBottom: 0,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
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
