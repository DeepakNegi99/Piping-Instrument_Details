import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:7071'
});

export interface CreateRequestPayload {
  serialNumber: string;
  facility: string;
  site: string;
  description: string;
}

export const fetchRequests = async () => {
  const res = await api.get('/api/requests');
  return res.data as any[];
};

export const createRequest = async (payload: CreateRequestPayload) => {
  const res = await api.post('/api/requests', payload);
  return res.data;
};
