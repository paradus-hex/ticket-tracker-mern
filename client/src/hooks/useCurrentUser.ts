import { AuthenticationTokenKey } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function extractUserIdFromJwt(jwt: string | null): string | null {
  if (!jwt) return null;

  try {
    const [, payloadBase64Url] = jwt.split('.');
    const payloadBase64 = payloadBase64Url.replace('-', '+').replace('_', '/');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    return payload.user || null;
  } catch (error) {
    console.error('Error while decoding JWT:', error);
    return null;
  }
}


export default function useCurrentUser() {
  let token: string | null = null;
  let userId: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(AuthenticationTokenKey);
    userId = extractUserIdFromJwt(token);
  }

  const query = useQuery(
    ['getCurrentUser'],
    async () => {
      if (!userId) {
        throw new Error('User ID not found');
      }

      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/${userId}`);
      return res.data;
    },
    {
      enabled: !!userId, // Only run the query if userId is truthy
    }
  );

  return query;
}
