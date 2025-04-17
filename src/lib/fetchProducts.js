import axios from 'axios';

export const fetchProducts = async (query) => {
  const params = new URLSearchParams(query).toString();
  const res = await axios.get(`http://localhost:3001/allProducts?${params}`);
  return res.data;
};