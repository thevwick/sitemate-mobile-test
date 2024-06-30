import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input, OverflowMenu, MenuItem } from "@ui-kitten/components";

type SearchBarProps = {
  query: string;
  searchHistory: string[];
  setQuery: (query: string) => void;
  handleSearch: () => void;
  handleHistoryItemClick: (item: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  handleSearch,
  searchHistory,
  handleHistoryItemClick,
}) => {
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);

  const onPressHistory = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuButton = () => (
    <Button size="small" style={styles.historyButton} onPress={onPressHistory}>
      History
    </Button>
  );

  return (
    <View style={styles.searchContainer}>
      {searchHistory.length > 0 && (
        <OverflowMenu
          anchor={renderMenuButton}
          visible={menuVisible}
          onBackdropPress={onPressHistory}
          style={styles.menu}
        >
          {searchHistory.map((item, index) => (
            <MenuItem
              key={index}
              title={item}
              onPress={() => {
                handleHistoryItemClick(item);
                setMenuVisible(false);
              }}
              style={styles.menuItem}
            />
          ))}
        </OverflowMenu>
      )}

      <Input
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for news..."
      />
      <Button size="small" style={styles.searchButton} onPress={handleSearch}>
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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
  historyButton: {
    marginRight: 10,
  },
  menu: {
    backgroundColor: "#f0f0f0",
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default SearchBar;
