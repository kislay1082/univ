import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

const Rating = ({ rating }) => {
  const starArr = new Array(5).fill(0).map((_, i) => i + 1);

  return (
    <div className="flex items-center">
      {starArr.map((star) => (
        <Star
          key={star}
          size={16}
          className={cn(
            "text-yellow-500",
            rating >= star && "fill-yellow-500"
          )}
        />
      ))}
    </div>
  );
};

export default Rating;
