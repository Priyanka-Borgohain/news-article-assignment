import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Article {
    id: number;
    title: string;
    summary: string;
    date: string;
    publisher: string;
}

const DisplayPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/articles');
            const data = Array.isArray(response.data) ? response.data : [];
            setArticles(data);
        } catch (error) {
            setError('Error fetching articles');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>News Articles</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <List>
                {articles.map(article => (
                    <ListItem key={article.id}>
                        <ListItemText
                            primary={article.title}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2">{article.summary}</Typography>
                                    <br />
                                    <Typography component="span" variant="body2">{`Published on: ${article.date} by ${article.publisher}`}</Typography>
                                </>
                            }
                        />
                        <Button component={Link} to={`/create-update/${article.id}`} variant="contained" color="primary">Edit</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default DisplayPage;
