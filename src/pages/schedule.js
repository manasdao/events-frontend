import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import ConnectTelegramModal from "@/components/modals/ConnectTelegramModal";
import EventsFeed from "@/components/events/EventsFeed";

const inter = Inter({ subsets: ["latin"] });

export default function Schedule() {
  const userContext = useContext(UserContext);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  useEffect(() => {
    if (!userContext.telegramDetails) setIsTelegramModalOpen(true);
  }, []);
  console.log();
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
        {userContext.telegramDetails ? (
          <main>
            <EventsFeed eventsTitle="My Schedule" />
          </main>
        ) : (
          <ConnectTelegramModal
            open={isTelegramModalOpen}
            setOpen={setIsTelegramModalOpen}
          />
        )}
      </DashboardLayout>
    </>
  );
}
