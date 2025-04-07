/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from "zod";
import { IRouteRequest } from "../interfaces";

interface ErrorFormat {
  [key: string]: string[] | { _errors: string[] };
}

interface ErrorResponse {
  [key: string]: string[];
}

export function formatErrors(error: ErrorFormat) {
  const response: ErrorResponse = {};
  for (const field of Object.keys(error)) {
    if (!Array.isArray(error[field])) {
      response[field] = error[field]._errors;
    }
  }
  return response;
}

export function validate(schema: ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: IRouteRequest) {
      const validation = schema.safeParse(req.body);

      if (!validation.success) {
        const response = formatErrors(validation.error.format());
        return new Response(JSON.stringify(response), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return originalMethod.call(this, req);
    };
  };
}
