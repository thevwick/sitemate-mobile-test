import { Article } from "@/hooks/use-fetch-news";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NewsCard from "./news-card";

type NewsListProps = {
  articles: Article[];
};

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <View style={styles.newsContainer}>
      <FlatList
        data={articles}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <NewsCard article={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    padding: 20,
  },
});

export default NewsList;
