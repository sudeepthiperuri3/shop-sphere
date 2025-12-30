import axios from 'axios';
import type { Product, Review } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/category/${category}`);
  return response.data;
};

// Mock reviews data since FakeStoreAPI doesn't have reviews
export const fetchProductReviews = async (productId: number): Promise<Review[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockReviews: Review[] = [
    {
      id: 1,
      productId,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Exactly what I was looking for. The quality exceeded my expectations.',
      date: '2024-12-15',
    },
    {
      id: 2,
      productId,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Great value for money. Shipping was fast and the product matches the description.',
      date: '2024-12-10',
    },
    {
      id: 3,
      productId,
      user: 'Mike R.',
      rating: 5,
      comment: 'Love it! Would definitely recommend to friends and family.',
      date: '2024-12-05',
    },
    {
      id: 4,
      productId,
      user: 'Emily K.',
      rating: 3,
      comment: 'Good product overall, but took longer to arrive than expected.',
      date: '2024-11-28',
    },
    {
      id: 5,
      productId,
      user: 'David L.',
      rating: 4,
      comment: 'Solid quality and good customer service. Will buy again.',
      date: '2024-11-20',
    },
  ];

  return mockReviews;
};

export default api;
