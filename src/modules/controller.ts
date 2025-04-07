import { NextResponse } from "next/server";
import { Exception } from "../common/exceptions";

export abstract class Controller<T> {
  constructor(protected readonly service: T) {}

  protected success<R>(data?: R, status: number = 200): Response {
    return NextResponse.json(data, {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected error(err: unknown) {
    if (err instanceof Exception) {
      return NextResponse.json(
        {
          message: err.message,
          status: err.statusCode,
          details: err.statusText,
        },
        {
          status: err.statusCode,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return NextResponse.json(
      {
        message: "Unknown Error",
        status: 500,
        details: "Unknown Server Error",
        error: err,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
