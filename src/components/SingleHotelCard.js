import {
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

function SingleHotelCard({ imageUrl, hotelDetails }) {
  return (
    <div className="p-2 border border-gray-300 rounded-lg max-w-[320px]">
      <img
        src={hotelDetails.fields.Image}
        className="w-full rounded-lg mb-2 font-medium"
      />
      <p>{hotelDetails.fields.Name}</p>
      <div className="flex items-center text-gray-500 text-xs mt-1 mb-2">
        <span className="flex items-center">
          <MapPinIcon width={16} className="mr-1" />{" "}
          {hotelDetails.fields.Address}
        </span>
        <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
        <span>0.3 miles</span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mt-1">
        <span className="text-gray-900">
          <span className="font-semibold">$28.4</span> per night{" "}
          <span className=" rounded-md bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700 ">
            10% Off
          </span>
        </span>
        <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
        <span>⭐️{hotelDetails.fields.Rating}</span>
      </div>
      <div
        className="grid gap-2 mt-2"
        style={{ gridTemplateColumns: "4fr 1fr" }}
      >
        <button
          type="button"
          className="flex items-center justify-center rounded-md bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-600 shadow-xs hover:bg-indigo-100"
        >
          <ArrowTopRightOnSquareIcon className="mr-2" width={18} />
          Book now
        </button>
        <Link
          type="button"
          className="flex items-center justify-center rounded-md bg-pink-50 px-3 py-3 text-sm font-semibold text-pink-600 shadow-xs hover:bg-pink-100"
          href={"tel:+91-7977984255"}
        >
          <PhoneIcon width={18} />
        </Link>
      </div>
    </div>
  );
}

export default SingleHotelCard;
