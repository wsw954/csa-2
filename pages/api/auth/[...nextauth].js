import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import axios from 'axios';

export default async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {});

  return NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: 'localhost',
          port: 1025,
          auth: null,
        },
        from: 'MailHog@localServer.com',
      }),
    ],
    adapter: MongoDBAdapter(client),
    callbacks: {
      async redirect({ url, baseUrl }) {
        if (url === 'http://localhost:3000') {
          return `${baseUrl}/buyers/dashboard`;
        }
        return baseUrl;
      },
    },
  });
};
