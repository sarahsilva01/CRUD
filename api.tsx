import axios from 'axios';
const api = axios.create({
 baseURL: 'http://localhost:3001'
});
export const getlivros = () => api.get('/livros');
export const getlivroById = (id: string) => api.get(`/livros/${id}`);
export const createlivro = (livro: any) => api.post('/livros', livro);
export const updatelivro = (id: string, livro: any) => api.put(`/livros/${id}`, livro);
export const deletelivro = (id: string) => api.delete(`/livros/${id}`);