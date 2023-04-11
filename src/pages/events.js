import DashboardLayout from "@/layouts/DashboardLayout";
import EventsFeed from "@/components/events/EventsFeed";
import customAxios from "@/utils/axios";
import React, { useEffect, useState } from "react";

function Events() {
  // ! Local states
  const [allEvents, setAllEvents] = useState(null);
  // ! Local handlers
  const fetchAllEvents = () => {
    customAxios
      .get(`/airtable/events`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("res", res);
        setAllEvents(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // ! Local effects
  useEffect(() => {
    fetchAllEvents();
  }, []);
  console.log("allEvents", allEvents);
  return (
    <DashboardLayout canSearch currentTab="Events">
      <EventsFeed
        eventsTitle="All Events"
        allEvents={allEvents}
        fetchAllEvents={fetchAllEvents}
        canMarkInterested
      />
    </DashboardLayout>
  );
}

export default Events;
