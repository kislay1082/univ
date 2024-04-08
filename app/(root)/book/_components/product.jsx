"use client";

import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/navigation";
import Rating from "@/components/rating";
import { toast } from "sonner";

const Product = ({ ad, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async () => {
    if (!user) {
      router.push("/register");
    }

    if (user.id === ad.Seller.id) {
      toast.error("You can't purchase your own ad.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post("/api/createCharge", { amount: ad.price });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: ad.price,
        currency: "INR",
        name: ad.title,
        description: ad.description,
        image: ad.image,
        order_id: res.data.id,
        handler: async (res) => {
          try {
            setIsLoading(true);
            const order = await axios.post("/api/registerOrder", {
              user: user,
              bookAd: ad,
              razorpay: res,
              amount: ad.price,
            });
            toast.success("Purchased successfully!");
            router.push("/purchases");
          } catch (err) {
            toast.error("Purchase failed! Please try again.");
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [Razorpay, ad, user, router]);

  if(ad?.sold) {
    router.push("/")
  }

  return (
    <div className="grid grid-cols-1 py-8">
      <div className="relative pt-[50%]">
        <Image
          src={ad.image}
          alt=""
          className="object-cover bg-gray-50 rounded-2xl absolute inset-0 w-full h-full"
          fill
        />
      </div>
      <div className="space-y-4">
        <div className="pb-6 mt-6 border-b border-gray-900/5 flex">
          <div className="relative flex items-center space-x-4">
            <UserAvatar
              user={{
                name: ad.Seller?.name || null,
                image: ad.Seller?.image || null,
              }}
              className="h-8 w-8"
            />
            <div className="">
              <p className="text-gray-900 font-semibold capitalize leading-6 text-base">
                {ad.Seller.name}
              </p>
              {!!ad.Seller?.rating && <Rating rating={ad.Seller?.rating} />}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {ad.title}
        </h1>

        <p className="text-base text-gray-900">{ad.description}</p>

        <Button onClick={handlePayment} className="w-full" disabled={isLoading}>
          Pay ₹{ad.price}
        </Button>
      </div>
    </div>
  );
};

export default Product;
