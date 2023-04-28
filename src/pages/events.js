import DashboardLayout from "@/layouts/DashboardLayout";
import EventsFeed from "@/components/events/EventsFeed";
import customAxios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
function Events() {
  const router = useRouter();
  // ! Local states
  const [allEvents, setAllEvents] = useState(null);
  const [myEvents, setMyEvents] = useState(null);
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
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("err", err);
      });
    customAxios
      .get(`/events/myevents`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("res", res);
        setMyEvents(res.data);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("err", err);
      });
  };
  // ! Local effects
  useEffect(() => {
    fetchAllEvents();
  }, []);
  console.log("allEvents", allEvents);
  return (
    <DashboardLayout canSearch currentTab="Events" unpadded>
      <EventsFeed
        eventsTitle="All Events"
        allEvents={allEvents}
        myEvents={myEvents}
        fetchAllEvents={fetchAllEvents}
        canMarkInterested
        canMarkAttended
      />
    </DashboardLayout>
  );
}

export default Events;
