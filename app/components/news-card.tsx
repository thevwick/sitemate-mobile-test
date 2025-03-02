import React from "react";
import { StyleSheet, View, Image } from "react-native";
import * as Linking from "expo-linking";

import { Avatar, Card, Text, Button } from "@ui-kitten/components";
import { Article } from "@/hooks/use-fetch-news";

type NewsCardProps = {
  article: Article;
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const handlePress = () => {
    Linking.openURL(article.url);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Avatar
          shape="square"
          ImageComponent={() => (
            <Image
              testID="article-image"
              style={styles.image}
              source={{ uri: article.urlToImage }}
            />
          )}
        />
        <Text style={styles.title} category="h6">
          {article.title}
        </Text>
      </View>
      <Text style={styles.description} category="c2">
        {article.description}
      </Text>
      <Button style={styles.button} onPress={handlePress}>
        Read More
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginBottom: 10,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 10,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
  },
  description: {
    marginTop: 3,
  },
  button: {
    marginTop: 10,
  },
});

export default NewsCard;
