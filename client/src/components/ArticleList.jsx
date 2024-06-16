import React from 'react';
import { Box, Heading, Link, Text, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

const ArticleList = ({ articles }) => {
  return (
    <Box>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <MotionBox
            key={index}
            mb={6}
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderRadius="md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Heading size="md" mb={2}>
              <Link href={article.link} isExternal>
                {article.title}
              </Link>
            </Heading>
            <Text>
              by {article.author} on{' '}
              {isValidDate(article.date) ? new Date(article.date).toLocaleDateString() : 'No date available'}
            </Text>
          </MotionBox>
        ))
      ) : (
        <Center>
          <Text>No data available</Text>
        </Center>
      )}
    </Box>
  );
};

export { ArticleList };
