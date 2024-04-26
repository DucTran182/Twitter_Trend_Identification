import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import TwitterAPI from 'react-native-twitter';

const categories = [
  { id: 1, name: 'Entertainment', keywords: ['movie', 'music', 'celebrity'] },
  { id: 2, name: 'Fashion', keywords: ['fashion', 'style', 'clothing'] },
  { id: 3, name: 'Sports', keywords: ['sports', 'football', 'basketball'] },
  { id: 4, name: 'Politics', keywords: ['politics', 'election', 'government'] },
  // Add more categories as needed
];

export default function App() {
  const [trends, setTrends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    // Fetch trends from Twitter API
    // Code for fetching trends goes here...
  };

  const fetchTweetsForTrend = async (trend) => {
    const client = new TwitterAPI({
      apiKey: 'Gg9C2bJFnadzkUTF86eaAVc7z',
      apiSecret: 'tjaTv30vGFKlxWsZI8860OHgWhSJN76qDnf4Jm8M3wxYwl95sp',
      accessToken: '1499652975115083779-MW9picm7VbUOM6OoBlE5TGoJYWY9Sw',
      accessTokenSecret: 'ukA9hUOtMEzbirT6y1LU3tedF6EuRGwSBKACLmSxwwqIt',
    });

    const response = await client.get('search/tweets', {
      q: trend.name,
      count: 10, // Limiting to 10 tweets for demonstration
    });

    if (response.ok) {
      setTweets(response.json.statuses);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setTweets([]); // Clear previously fetched tweets when a new category is selected
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Current Trends and Hashtags</Text>
      <ScrollView horizontal contentContainerStyle={styles.categories}>
        {categories.map((category) => (
          <Button
            key={category.id}
            title={category.name}
            onPress={() => handleCategorySelect(category)}
          />
        ))}
      </ScrollView>
      <View style={styles.trends}>
        {selectedCategory &&
          trends
            .filter((trend) =>
              selectedCategory.keywords.some((keyword) =>
                trend.name.toLowerCase().includes(keyword.toLowerCase())
              )
            )
            .map((trend, index) => (
              <Button
                key={index}
                title={trend.name}
                onPress={() => fetchTweetsForTrend(trend)}
              />
            ))}
      </View>
      <ScrollView style={styles.tweets}>
        {tweets.map((tweet) => (
          <View key={tweet.id}>
            <Text>{tweet.text}</Text>
            <Text>{tweet.user.screen_name}</Text>
            <Text>{tweet.created_at}</Text>
            <Text>---</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trends: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tweets: {
    flex: 1,
    width: '100%',
  },
});
