import SingleAnnouncementCard from "@/components/SingleAnnouncementCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import customAxios from "@/utils/axios";
import React, { useEffect, useState } from "react";

function Announcements() {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [announcements, setAnnouncements] = useState(null);

  // ! Local helpers ****************************************************************************************************************
  const fetchAnnouncements = () => {
    customAxios
      .get(`/announcement/fetch?newAnnouncements=true`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        setAnnouncements(res.data.announcements);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("announcement err", err);
      });
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  console.log("announcements", announcements);
  return (
    <DashboardLayout unpadded hideChat>
      <section className="mt-8">
        <div className="px-4 flex items-center">
          <span
            className={`inline-flex mr-2 items-center gap-x-1.5 rounded-full px-4 py-[5px] text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 ${
              currentCategory == "All" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setCurrentCategory("All");
            }}
          >
            All
          </span>
          <span
            className={`inline-flex mr-2 items-center gap-x-1.5 rounded-full px-4 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 ${
              currentCategory == "General" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setCurrentCategory("General");
            }}
          >
            <svg
              className="h-1.5 w-1.5 fill-red-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            General
          </span>
          <span
            className={`inline-flex mr-2 items-center gap-x-1.5 rounded-full px-4 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 ${
              currentCategory == "event_name" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setCurrentCategory("event_name");
            }}
          >
            <svg
              className="h-1.5 w-1.5 fill-green-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            event_name
          </span>
        </div>
        <div className="flex items-center border border-gray-300 rounded-full py-2 pl-8 pr-4 w-max -translate-x-4 my-4">
          <span className="text-lg text-gray-900 font-semibold mr-2 block">
            12th April
          </span>
          <span className="text-sm text-gray-500 font-light">Saturday</span>
        </div>
        <div className="px-4">
          {announcements?.map((singleAnnouncement) => {
            return (
              <SingleAnnouncementCard
                key={singleAnnouncement.id}
                category={"general"}
                title={singleAnnouncement.title}
                content={singleAnnouncement.description}
                date={singleAnnouncement.updatedAt}
              />
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Announcements;
