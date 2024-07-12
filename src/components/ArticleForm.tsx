import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

interface ArticleFormProps {
    articleId?: number;
    onSubmit: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ articleId, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [date, setDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (articleId) {
            fetchArticleDetails(articleId);
        }
    }, [articleId]);

    const fetchArticleDetails = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/articles/${id}`);
            const { title, summary, date, publisher } = response.data;
            setTitle(title);
            setSummary(summary);
            setDate(date);
            setPublisher(publisher);
        } catch (error) {
            setError('Error fetching article details');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !summary || !date || !publisher) {
            setError('All fields are required');
            return;
        }

        const article = { title, summary, date, publisher };

        try {
            if (articleId) {
                await axios.put(`http://localhost:3000/articles/${articleId}`, article);
            } else {
                await axios.post('http://localhost:3000/articles', article);
            }
            resetForm();
            onSubmit();
        } catch (error) {
            setError('Error submitting article');
        }
    };

    const resetForm = () => {
        setTitle('');
        setSummary('');
        setDate('');
        setPublisher('');
        setError('');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{articleId ? 'Update' : 'Create'} Article</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Article Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                />
                <TextField
                    label="Article Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Publisher of Article"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">
                    {articleId ? 'Update' : 'Create'} Article
                </Button>
            </form>
        </Container>
    );
};

export default ArticleForm;
