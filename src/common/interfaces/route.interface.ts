/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

export interface IRouteArgs {
  params: Promise<{ id: string }>;
}

export interface IRouteRequest {
  query: URLSearchParams;
  body: {
    [key: string]: any;
  };
  params: {
    [key: string]: any;
  };
}

export type IRouteParams = [req: NextRequest, args: IRouteArgs];

export type NextFunction = (req: IRouteRequest) => Promise<Response>;
