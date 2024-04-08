import Rating from "@/components/rating";
import { UserAvatar } from "@/components/user-avatar";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ ad }) => {
  return (
    <div className="relative flex flex-col lg:flex-row gap-8">
      <Link href={`/book/${ad.id}`} className="absolute inset-0 z-20" />
      <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:shrink-0 lg:w-64">
        <Image
          src={ad.image}
          alt=""
          className="object-cover bg-gray-50 rounded-2xl absolute inset-0 w-full h-full"
          fill
        />
      </div>
      <div className="max-w-xl w-full space-y-2">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={ad.createdAt} className="text-gray-500">
            {format(new Date(ad.createdAt), "PPpp")}
          </time>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900 leading-6 font-semibold text-lg text-left">
            {ad.title}
          </h3>
          <span className="text-gray-900 leading-6 font-semibold text-lg text-left">
            ₹{ad.price}
          </span>
        </div>
        <p className="text-gray-600 leading-6 text-sm text-left">
          {ad.description}
        </p>
        <div className="pt-6 mt-4 border-t border-gray-300 space-y-1 w-full">
          <div className="relative flex items-center gap-x-4">
            <UserAvatar
              user={{
                name: ad.Seller?.name || null,
                image: ad.Seller?.image || null,
              }}
              className="h-8 w-8"
            />
            <div className="leading-6 text-sm">
              <p className="text-gray-900 font-semibold">{ad.Seller.name}</p>
            </div>
          </div>
          {!!ad.Seller?.rating && <Rating rating={ad.Seller?.rating} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
