import * as React from "react";
import { Html, Button, Heading, Text } from "@react-email/components";

export function WithdrawEmail({ name, email, balance }) {
  return (
    <Html lang="en">
      <Heading as="h2">Withdraw Request</Heading>
      <Text>
        {name} has requested a payment of {balance} from their balance. The
        contact email is {email}
      </Text>
    </Html>
  );
}
