"use client";

import { Card, Form } from "../../../../components";
import { useAuth } from "../../../../hooks";

const SignIn = () => {
  const { register, errors, onSubmit } = useAuth();
  return (
    <Card.Root>
      <Card.Header>Sign in to your account</Card.Header>
      <Card.Body>
        <Form.Root onSubmit={onSubmit}>
          <Form.Input
            label="Email address"
            type="email"
            autoComplete="email"
            errors={errors}
            {...register("email", { required: true })}
          />
          <Form.Input
            label="Password"
            type="password"
            autoComplete="current-password"
            errors={errors}
            {...register("password", { required: true })}
          />
          <Form.Group>
            <Form.Button type="submit">Sign In</Form.Button>
            <Form.Link href="/sign-up">Create your account</Form.Link>
          </Form.Group>
        </Form.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default SignIn;
