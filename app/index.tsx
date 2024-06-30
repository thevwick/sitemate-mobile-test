import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import useFetchNews from "@/hooks/use-fetch-news";
import SearchBar from "./components/search-bar";
import NewsList from "./components/news-list";

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { loading, articles } = useFetchNews(searchQuery);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query);
      setSearchHistory((prevHistory) => [...new Set([query, ...prevHistory])]);
    }
  };

  const handleHistoryItemClick = (item: string) => {
    setQuery(item);
    setSearchQuery(item);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.header} category="h1">
        News
      </Text>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        searchHistory={searchHistory}
        handleHistoryItemClick={handleHistoryItemClick}
      />
      <Layout style={styles.layout}>
        {loading ? <Spinner size="giant" /> : <NewsList articles={articles} />}
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
});

export default HomeScreen;
