import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";

function SingleSideEventCard({ imageUrl, eventDetails, href }) {
  const { push } = useRouter();
  return (
    <div
      className="p-2 border border-gray-300 rounded-lg max-w-[320px]"
      onClick={() => {
        push(href);
      }}
    >
      <img
        src={eventDetails.fields.Image}
        className="w-full rounded-lg mb-2 font-medium"
      />
      <div className="flex items-center text-gray-500 text-xs my-1">
        <span>16th June</span>
        <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
        <span>09:00 AM</span>
      </div>
      <p>{eventDetails.fields.Activity}</p>
      <div className="flex items-center text-gray-500 text-xs mt-1">
        <span className="flex items-center">
          <MapPinIcon width={16} className="mr-1" /> {eventDetails.fields.Location}
        </span>
        <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
        <span>12+ going</span>
      </div>
      <button
        type="button"
        class="mt-4 w-full inline-flex items-center justify-center  bg-indigo-50 gap-x-2 rounded-md  px-3.5 py-2.5 text-md font-medium text-indigo-700 shadow-sm "
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <BoltIcon width={20} />
        Mark as going
      </button>
    </div>
  );
}

export default SingleSideEventCard;
