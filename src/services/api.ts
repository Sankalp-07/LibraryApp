import axios from 'axios';
import { API_URL } from '../constants/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers if provided
const authHeader = (token?: string) =>
  token ? { headers: { Authorization: `Bearer ${token}` } } : {};

export const signup = (data: any) =>
  api.post('/auth/signup', data).then(res => res.data);

export const login = (data: any) =>
  api.post('/auth/login', data).then(res => res.data);

export const getProfile = (token: string) =>
  api.get('/auth/me', authHeader(token)).then(res => res.data);

export const updateProfile = (token: string, data: any) =>
  api.put('/auth/me', data, authHeader(token)).then(res => res.data);

export const getLibraries = () =>
  api.get('/libraries').then(res => res.data);

export const getSeats = (libraryId: string, token: string) =>
  api.get(`/seats/${libraryId}`, authHeader(token)).then(res => res.data);

export const bookSeats = (token: string, data: any) =>
  api.post('/bookings', data, authHeader(token)).then(res => res.data);

export const getMyBookings = (token: string) =>
  api.get('/bookings/me', authHeader(token)).then(res => res.data);

export const updateBooking = (token: string, bookingId: string, data: any) =>
  api.put(`/bookings/${bookingId}`, data, authHeader(token)).then(res => res.data);

export const cancelBooking = (token: string, bookingId: string) =>
  api.delete(`/bookings/${bookingId}`, authHeader(token)).then(res => res.data); 