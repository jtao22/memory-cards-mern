import axios from 'axios';

const URL = 'https://memory-cards-mern.herokuapp.com/posts';
export const fetchPosts = () => axios.get(URL);
export const createPost = (newPost) => axios.post(URL, newPost);
export const changePost = (id, updatedPost) => axios.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${URL}/${id}`);
export const likePost = (id) => axios.patch(`${URL}/${id}/likePost`);
