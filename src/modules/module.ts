import { NextRequest } from "next/server";
import { IRouteArgs, IRouteRequest, NextFunction } from "../common";

export abstract class Module<T> {
  constructor(protected readonly controller: T) {}

  protected async parse(
    req: NextRequest,
    { params: args }: IRouteArgs,
    method: keyof T
  ): Promise<Response> {
    const body =
      req.method !== "GET" && req.method !== "DELETE" ? await req.json() : {};
    const params = await args;
    const request: IRouteRequest = {
      query: req.nextUrl.searchParams,
      body,
      params,
    };
    return (this.controller[method] as NextFunction)(request);
  }
}
