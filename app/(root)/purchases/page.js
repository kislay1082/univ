import getPurchases from "@/actions/get-purchases";
import React from "react";
import OrderCard from "../_components/order-card";
import getCurrentUser from "@/actions/getCurrentUser";

const Purchases = async () => {
  const user = await getCurrentUser()

  const purchases = await getPurchases(user.id);

  if (!purchases) {
    return;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-white bg-gray-900 text-center py-12 px-4 rounded font-bold mb-8 text-4xl">
        Your Purchases
      </div>
      <div className="space-y-2">
        {purchases.map((item) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </div>
    </main>
  );
};

export default Purchases;
