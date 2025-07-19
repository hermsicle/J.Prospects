import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const authToken = async () => {
  const session: any = await fetchAuthSession({ forceRefresh: true });

  // console.log('id token', session.tokens.idToken.toString());

  return session.tokens.idToken;
};

export const fetchCompanies = async () => {
  const idToken = await authToken();

  const response = await axios.get(`${API_BASE_URL}/companies`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

//! Companies API
export const createCompany = async (data: any) => {
  const idToken = await authToken();

  const response = await axios.post(`${API_BASE_URL}/companies`, data, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const updateCompany = async (payload: any) => {
  const idToken = await authToken();

  const { id, data } = payload;

  const response = await axios.put(`${API_BASE_URL}/companies/${id}`, data, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const deleteCompany = async (id: string) => {
  const idToken = await authToken();

  const response = await axios.delete(`${API_BASE_URL}/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const fetchCompanyKpis = async (companyId: string) => {
  const idToken = await authToken();

  const response = await axios.get(
    `${API_BASE_URL}/companies/${companyId}/kpis`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

//! Prospects API
export const listCompanyProspects = async (companyId: string) => {
  const idToken = await authToken();

  const response = await axios.get(
    `${API_BASE_URL}/companies/${companyId}/prospects`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const createProspect = async (payload: any) => {
  const idToken = await authToken();
  const { id, data } = payload;

  const response = await axios.post(
    `${API_BASE_URL}/companies/${id}/prospects`,
    data,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const updateProspect = async (payload: any) => {
  const idToken = await authToken();
  const { companyId, prospectId, data } = payload;

  const response = await axios.put(
    `${API_BASE_URL}/companies/${companyId}/prospects/${prospectId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const deleteProspect = async (payload: any) => {
  const idToken = await authToken();
  const { companyId, prospectId } = payload;

  const response = await axios.delete(
    `${API_BASE_URL}/companies/${companyId}/prospects/${prospectId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
