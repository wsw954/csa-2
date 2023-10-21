import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';

export default async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
  });

  return NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: MongoDBAdapter(client),
    callbacks: {
      async redirect({ url, baseUrl }) {
        if (url ==='http://localhost:3000') {
          return `${baseUrl}/buyers/dashboard`;
        }
        return baseUrl;
      },
    }
  });
};
