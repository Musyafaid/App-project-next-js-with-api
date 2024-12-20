'use server';

import { cookies } from 'next/headers';

export async function logout(): Promise<void> {
  const cookieStore = cookies();

  cookieStore.delete('access_token');
  console.log(cookieStore.getAll());


}
