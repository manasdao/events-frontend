import DashboardLayout from "@/layouts/DashboardLayout";
import { CalendarColorIcon, TicketBackground } from "@/utils/Icons";
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import QRCode from "react-qr-code";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function Example() {
  const { back } = useRouter();
  const [currentType, setCurrentType] = useState(2);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <DashboardLayout unpadded hideBottomNav hideChat>
      <main className="mt-4 p-4 relative isolate min-h-screen text-gray-900">
        <div className="flex items-center justify-between mb-4">
          <ArrowLeftIcon
            onClick={back}
            className=""
            width={24}
            strokeWidth={2}
          />
          <ShareIcon className="" width={24} strokeWidth={2} />
        </div>
        <div className="relative flex items-center justify-between flex-col h-[600px] w-full  rounded-lg ticket_layout">
          <div className="flex items-center flex-col h-[300px] p-4">
            <span className="text-2xl font-bold">VIP Access</span>{" "}
            <span className=" block border border-dashed border-gray-300 top-[50%] w-[75%] "></span>
            <div className="self-start flex items-center text-lg text-gray-700 font-bold my-4">
              <img
                className="inline-block mr-2 h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />{" "}
              Mukund Chourey
            </div>
            <div className="self-start flex items-start flex-col my-2">
              <span className="text-gray-500 text-sm">Event name</span>
              <span className="text-gray-900 text-md">DAOCON Paris</span>
            </div>
            <div className="flex items-start self-start" >
              <div className="self-start flex items-start flex-col my-2">
                <span className="text-gray-500 text-sm">Date</span>
                <span className="text-gray-900 text-md">16th June, 2023</span>
              </div>
              <div className="ml-4 self-start flex items-start flex-col my-2">
                <span className="text-gray-500 text-sm">Smart contract</span>
                <span className="text-purple-600 text-md flex items-center">
                  123422424898{" "}
                  <ArrowTopRightOnSquareIcon width={18} className="ml-2" />
                </span>
              </div>
            </div>
          </div>
          <span className="absolute block border border-dashed border-gray-300 top-[50%] w-[75%] left-[50%] translate-x-[-50%]"></span>
          <div className="flex items-center flex-col justify-center h-[300px]">
            <QRCode
              width={100}
              value={JSON.stringify({
                ticket_id: "1234",
                ticket_type: "VIP Access",
              })}
            />
          </div>
        </div>

        <BottomSheet
          open={isBottomSheetOpen}
          onDismiss={() => {
            setIsBottomSheetOpen(false);
          }}
        >
          <div className="p-4 flex items-center flex-col">
            {/* <CalendarColorIcon /> */}
            <span className="text-gray-900 text-lg block my-2 font-semibold">
              Add your pass details to your apple wallet
            </span>
            <span className="text-gray-500 text-sm text-center">
              The NFT for the event pass is minted and sent to your wallet. You
              can add the event details to your apple wallet.
            </span>
            <div className="grid grid-cols-2 mt-4  w-full gap-4">
              <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/add-to-apple-wallet-logo.png" />

              <button
                onClick={() => {
                  setIsBottomSheetOpen(false);
                }}
                type="button"
                className=" rounded-lg bg-indigo-50 border border-indigo-500 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </BottomSheet>
        <div className="fixed bottom-0 w-full left-0 bg-white p-2 border-t border-gray-200">
          <button
            onClick={() => {
              setIsBottomSheetOpen(true);
            }}
            type="button"
            className="rounded-lg bg-indigo-600 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add to wallet
          </button>
        </div>
      </main>
    </DashboardLayout>
  );
}
