import EventsFeed from "@/components/events/EventsFeed";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

function Events() {
  return (
    <DashboardLayout canSearch currentTab="Events">
      <EventsFeed eventsTitle="All Events" />
    </DashboardLayout>
  );
}

export default Events;
