'use server';

import { cookies } from 'next/headers';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  
  

  const data: LoginResponse = await response.json();

  const cookieStore = cookies();
  cookieStore.set({
    name: 'access_token',
    value: data.access_token,
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 10
  });

  // console.log(data);

  const coo = cookieStore.get('access_token');
  console.log('Cookie:', JSON.stringify(coo));
  

  return data;
}


