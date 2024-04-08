import * as React from "react";
import { Html, Button, Heading, Text } from "@react-email/components";

export function VerifyEmail({ url }) {
  return (
    <Html lang="en">
      <Heading as="h2">Confirm Your Email</Heading>
      <Text>Click on this to verify your email</Text>
      <Button href={url}>Verify Email</Button>
    </Html>
  );
}
