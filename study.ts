import "reflect-metadata";
import { z, ZodSchema } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

function Validate(schema: ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: IRouteRequest, ...args: any[]) {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        console.log(result.error.flatten());
        return new Response(
          JSON.stringify({
            message: "Erro de validação",
            errors: result.error.flatten(),
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return originalMethod.call(this, req, ...args);
    };
  };
}

interface IRouteRequest {
  query: URLSearchParams;
  body: {
    [key: string]: any;
  };
  params: {
    [key: string]: any;
  };
}

class TestController {
  @Validate(authSchema)
  login(req: IRouteRequest): Promise<Response> {
    return Promise.resolve(
      new Response(JSON.stringify({ message: "test message" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }
}

const test = new TestController();
test.login({
  query: new URLSearchParams(),
  body: { email: "data" },
  params: { id: "123" },
});
