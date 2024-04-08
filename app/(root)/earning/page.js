import getCurrentUser from "@/actions/getCurrentUser";
import React from "react";
import Withdraw from "../_components/withdraw";

export default async function EarningPage () {
  const user = await getCurrentUser();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-white bg-gray-900 text-center py-12 px-4 rounded font-bold mb-8 text-4xl">
        Your Earning
      </div>

      <Withdraw user={user} />
    </main>
  );
};
