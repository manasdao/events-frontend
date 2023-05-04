import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

function SingleUserCard({ name, designation, imageUrl }) {
  return (
    <div className="flex items-center my-2">
      <img
        className="inline-block h-8 w-8 mr-4 rounded-full ring-2 ring-white"
        src={imageUrl}
        alt=""
      />
      <div className="flex items-start flex-col justify-between text-sm">
        <span className="text-gray-900 font-semibold">{name}</span>
        <span className="text-gray-500 font-normal">{designation}</span>
      </div>
    </div>
  );
}

export default SingleUserCard;
