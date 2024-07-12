import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

interface Article {
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

const CreateUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>({ title: '', summary: '', date: '', publisher: '' });
  const [errors, setErrors] = useState<Article>({ title: '', summary: '', date: '', publisher: '' });

  useEffect(() => {
    if (id) {
      fetchArticleDetails(id);
    }
  }, [id]);

  const fetchArticleDetails = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article details', error);
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = { title: '', summary: '', date: '', publisher: '' };

    if (!article.title) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!article.summary) {
      newErrors.summary = 'Summary is required';
      valid = false;
    }
    if (!article.date) {
      newErrors.date = 'Date is required';
      valid = false;
    }
    if (!article.publisher) {
      newErrors.publisher = 'Publisher is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      if (id) {
        await axios.put(`http://localhost:3000/articles/${id}`, article);
      } else {
        await axios.post('http://localhost:3000/articles', article);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting article', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{id ? 'Update Article' : 'Create Article'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Article Title"
          name="title"
          value={article.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Article Summary"
          name="summary"
          value={article.summary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          error={!!errors.summary}
          helperText={errors.summary}
        />
        <TextField
          label="Article Date"
          name="date"
          type="date"
          value={article.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.date}
          helperText={errors.date}
        />
        <TextField
          label="Publisher Of Article"
          name="publisher"
          value={article.publisher}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.publisher}
          helperText={errors.publisher}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update' : 'Create'} Article
        </Button>
      </form>
    </Container>
  );
};

export default CreateUpdatePage;
