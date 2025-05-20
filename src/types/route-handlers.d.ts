// Override Next.js route handler types to fix build errors
import { NextRequest } from 'next/server';

declare module 'next/server' {
  export type RouteHandlerContext<Params = Record<string, string | string[]>> = {
    params: Params;
  };
  
  export type RouteHandler<Params = Record<string, string | string[]>> = (
    request: NextRequest,
    context: RouteHandlerContext<Params>
  ) => Promise<Response> | Response;
}
