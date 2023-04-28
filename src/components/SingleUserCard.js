import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";

function SingleUserCard() {
  return (
    <div className="flex items-center my-2">
      <img
        className="inline-block h-8 w-8 mr-4 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
      <div className="flex items-start flex-col justify-between text-sm">
        <span className="text-gray-900 font-semibold">Mukund Chourey</span>
        <span className="text-gray-500 font-normal">Blockchain @Daolens</span>
      </div>
    </div>
  );
}

export default SingleUserCard;
