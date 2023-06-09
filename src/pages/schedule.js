import Head from "next/head";
import { Inter } from "next/font/google";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import EventsFeed from "@/components/events/EventsFeed";
import customAxios from "@/utils/axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Schedule() {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    customAxios
      .get(`/events/myevents`, {
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
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <DashboardLayout currentTab="Schedule">
        <main>
          <EventsFeed
            eventsTitle="My Schedule"
            allEvents={allEvents}
            canMarkAttended
          />
        </main>
      </DashboardLayout>
    </>
  );
}
