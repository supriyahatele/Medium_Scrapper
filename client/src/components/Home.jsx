import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Spinner, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

import { ArticleList } from './ArticleList';
import { SearchForm } from './SearchForm';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8080/api/v1/articles');
        console.log("articles", response.data);
        setArticles(response.data);
      } catch (error) {
        setError('Something went wrong while fetching the articles');
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const handleSearch = async (topic) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/scrape', { topic });
      console.log("scrap", response.data);
      setArticles(response.data.articles);
    } catch (error) {
      setError('Failed to fetch articles');
    }
    setLoading(false);
  };

  return (
    <Box p={5}>
      <Heading mb={6}>Medium Article Scraper</Heading>
      <SearchForm onSearch={handleSearch} />
      {loading && (
        <VStack spacing={4}>
          <Spinner />
          <Text>Please wait for a moment</Text>
        </VStack>
      )}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
        </Alert>
      )}
      <ArticleList articles={articles} />
    </Box>
  );
};

export  {Home};
