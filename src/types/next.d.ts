// Type declarations for Next.js
import { NextPage } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP>;
}

// Override the default Next.js types to avoid type errors during build
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      MONGODB_URI: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

export {};
