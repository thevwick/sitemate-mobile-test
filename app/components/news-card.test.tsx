import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Article } from "@/hooks/use-fetch-news";
import { Linking } from "react-native";
import NewsCard from "./news-card";

jest.mock("expo-linking", () => ({
  openURL: jest.fn(),
}));

const article: Article = {
  source: { id: null, name: "Test Source" },
  author: "Test Author",
  title: "Test Title",
  description: "Test Description",
  url: "https://test-news.com",
  urlToImage: "https://test-news.com/image.jpg",
  publishedAt: "2021-01-01T00:00:00Z",
  content: "Test Content",
};

describe("NewsCard", () => {
  it("renders the article correctly", () => {
    const { getByText, getByTestId } = render(<NewsCard article={article} />);

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();
    const image = getByTestId("article-image");
    expect(image.props.source).toEqual({ uri: article.urlToImage });
  });

  it("opens the article URL when the 'Read More' button is pressed", () => {
    const { getByText } = render(<NewsCard article={article} />);

    const readMoreButton = getByText("Read More");
    fireEvent.press(readMoreButton);

    expect(Linking.openURL).toHaveBeenCalledWith(article.url);
  });
});
