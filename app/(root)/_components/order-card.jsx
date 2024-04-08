"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const OrderCard = ({ order }) => {

  const [isLoading, setIsLoading] = React.useState(false);

  const [rating, setRating] = React.useState(0);

  const router = useRouter()

  if (!order) {
    return;
  }

  const cancelOrder = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/updateStatus", {
        id: order.id,
        status: "cancelled",
      });
      toast.success("Order cancelled");
      router.refresh()
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setIsLoading(false);
    }
  };
  const AcceptOrder = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/updateStatus", {
        id: order.id,
        status: "accepted",
        rating,
      });
      toast.success("Order accepted");
      router.refresh()
    } catch (error) {
      toast.error("Failed to accept order");
    } finally {
      setIsLoading(false);
    }
  };

  const starArr = new Array(5).fill(0).map((_, i) => i + 1);

  return (
    <div className="border border-gray-300 shadow-md rounded-sm w-full">
      <div className="p-6 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-1">
            <h6 className="text-lg font-medium text-gray-700">Status</h6>
            <p className="text-sm text-gray-500">{order.status}</p>
          </div>
          <div className="space-y-1">
            <h6 className="text-lg font-medium text-gray-700">Date placed</h6>
            <time
              dateTime={order.BookAd.createdAt}
              className="text-sm text-gray-500"
            >
              {format(new Date(order.BookAd.createdAt), "PP")}
            </time>
          </div>
          <div className="space-y-1">
            <h6 className="text-lg font-medium text-gray-700">Total Amount</h6>
            <p className="text-sm text-gray-500">₹{order.amount}</p>
          </div>
        </div>
        {order.status.toLowerCase() === "pending" && (
          <div className="flex flex-wrap gap-4 items-center">
            <Dialog>
              <DialogTrigger>
                <Button disabled={isLoading}>Accept Order</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Leave a review for buyer</DialogTitle>
                  <div className="flex items-center space-x-1">
                    {starArr.map((star) => (
                      <Star
                        key={star}
                        size={24}
                        onClick={() => setRating(star)}
                        className={cn(
                          "text-yellow-500 cursor-pointer transition-colors duration-200 ease-in-out",
                          rating >= star && "fill-yellow-500"
                        )}
                      />
                    ))}
                  </div>
                </DialogHeader>
                <Button disabled={isLoading} onClick={AcceptOrder}>
                  Accept Order
                </Button>
              </DialogContent>
            </Dialog>
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={cancelOrder}
            >
              Cancel Order
            </Button>
          </div>
        )}
      </div>
      <div className="border-t border-gray-300 w-full" />
      <div className="p-6 flex flex-col lg:flex-row gap-8 w-full">
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:shrink-0 lg:w-40">
          <Image
            src={order.BookAd.image}
            alt=""
            className="object-cover bg-gray-50 rounded-2xl absolute inset-0 w-full h-full"
            fill
          />
        </div>
        <div className="max-w-xl space-y-2 w-full">
          <h3 className="text-gray-900 leading-6 font-semibold text-lg text-left">
            {order.BookAd.title}
          </h3>
          <p className="text-gray-600 leading-6 text-sm text-left">
            {order.BookAd.description}
          </p>

          <div className="pt-6 mt-4 border-t border-gray-300 w-full">
            <div className="relative flex items-center gap-x-4">
              <UserAvatar
                user={{
                  name: order.BookAd.Seller?.name || null,
                  image: order.BookAd.Seller?.image || null,
                }}
                className="h-8 w-8"
              />
              <div className="leading-6 text-sm">
                <p className="text-gray-900 font-semibold">
                  {order.BookAd.Seller.name}
                </p>
                <p className="text-gray-900 font-normal">
                  {order.BookAd.Seller.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
