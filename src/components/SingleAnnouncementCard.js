import moment from "moment";
import React from "react";

function SingleAnnouncementCard({ category, title, content, date }) {
  return (
    <div className="flex items-start flex-col text-gray-900 border border-gray-300 p-2 rounded-lg mb-4">
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <span className="">{moment(date).format("hh:mm a")}</span>
        <span className="h-4 w-px bg-gray-300 block mx-2"></span>

        {category == "general" && (
          <span className="flex items-center">
            <svg
              className="h-1.5 w-1.5 fill-red-500 mr-2"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            General
          </span>
        )}
        {category == "event_name" && (
          <span className="flex items-center">
            <svg
              className="h-1.5 w-1.5 fill-green-500 mr-2"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            Hacker house
          </span>
        )}
      </div>
      <p className="font-medium text-lg mb-2 break-all">{title}</p>
      <p className=" break-all">{content}</p>
    </div>
  );
}

export default SingleAnnouncementCard;
