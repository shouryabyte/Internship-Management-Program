import api from './axios';

export const fetchInternships = async () => {
  const res = await api.get('/api/internships');
  return res.data;
};

export const createInternship = async (data: any) => {
  const res = await api.post('/api/internships', data);
  return res.data;
};
