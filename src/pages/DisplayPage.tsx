import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

const DisplayPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/articles', { params: { page, limit } });
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setArticles(data);
      setTotalPages(Math.ceil(response.data.total / limit));
      setTotalArticles(response.data.total);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
      setTotalPages(1);
      setTotalArticles(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>News Articles</Typography>
      <Typography variant="body2">{totalArticles} articles found</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {articles.length > 0 ? (
            <List>
              {articles.map(article => (
                <ListItem key={article.id} component={Link} to={`/create-update/${article.id}`} style={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText
                    primary={article.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">SAIGON TIMES YESTERDAY</Typography>
                        <br />
                        <Typography component="span" variant="body2">{article.summary}</Typography>
                        <br />
                        <Typography component="span" variant="body2">{`Published on: ${article.date} by ${article.publisher}`}</Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No articles found.</Typography>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  margin: '0 5px',
                  backgroundColor: page === index + 1 ? '#007bff' : '#fff',
                  color: page === index + 1 ? '#fff' : '#000',
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button component={Link} to="/create-update" variant="contained" color="primary">Create/Update Article</Button>
        </>
      )}
    </Container>
  );
};

export default DisplayPage;
