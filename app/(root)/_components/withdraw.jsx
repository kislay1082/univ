"use client";

import { sendWithdrawEmail } from "@/actions/send-withdraw-email";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Withdraw = ({ user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await sendWithdrawEmail(user);
      toast.success(res.status);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-4xl font-extrabold dark:text-white">
        Available for withdrawal
      </h2>
      <h3 className="text-3xl font-bold dark:text-white">₹{user.balance}</h3>
      <Button onClick={handleClick} disabled={isLoading}>
        Request Withdraw
      </Button>
    </div>
  );
};

export default Withdraw;
