import DashboardLayout from "@/layouts/DashboardLayout";
import { CalendarColorIcon } from "@/utils/Icons";
import {
  ArrowLeftIcon,
  ShareIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { push } from "mixpanel-browser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function Example() {
  const { back, push } = useRouter();
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
        <div
          className={`mb-2 flex items-start justify-between border cursor-pointer p-4 rounded-lg ${
            currentType == 1
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300"
          }`}
          onClick={() => {
            setCurrentType(1);
          }}
        >
          <div className="flex items-start flex-col">
            <span className="text-md font-semibold">VIP Access</span>
            <span className="text-xs font-normal text-purple-700 my-2">
              View contract (Polygon)
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <TicketIcon className="mr-2" width={18} /> 100 Left
            </span>
          </div>
          <div className="flex items-end flex-col">
            <span className="text-md font-bold">$999 USDC</span>
            <span className="text-md font-normal text-gray-500">~$999.00</span>
          </div>
        </div>
        <div
          className={`mb-2 flex items-start justify-between border cursor-pointer p-4 rounded-lg ${
            currentType == 2
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300"
          }`}
          onClick={() => {
            setCurrentType(2);
          }}
        >
          <div className="flex items-start flex-col">
            <span className="text-md font-semibold">Early bird</span>
            <span className="text-xs font-normal text-purple-700 my-2">
              View contract (Polygon)
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <TicketIcon className="mr-2" width={18} /> 100 Left
            </span>
          </div>
          <div className="flex items-end flex-col">
            <span className="text-md font-bold">$399 USDC</span>
            <span className="text-md font-normal text-gray-500">~$399.00</span>
          </div>
        </div>
        <div
          className={`mb-2 flex items-start justify-between border cursor-pointer p-4 rounded-lg ${
            currentType == 3
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300"
          }`}
          onClick={() => {
            setCurrentType(3);
          }}
        >
          <div className="flex items-start flex-col">
            <span className="text-md font-semibold">Main event Access</span>
            <span className="text-xs font-normal text-purple-700 my-2">
              View contract (Polygon)
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <TicketIcon className="mr-2" width={18} /> 100 Left
            </span>
          </div>
          <div className="flex items-end flex-col">
            <span className="text-md font-bold">$50 USDC</span>
            <span className="text-md font-normal text-gray-500">~$50.00</span>
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
              Purchase the {currentType == 1 && "VIP Access pass"}
              {currentType == 2 && "Early bird pass"}
              {currentType == 3 && "Main event pass"}
            </span>
            <span className="text-gray-500 text-sm text-center">
              The event pass will be in the form of an NFT which will be sent to
              your wallet address{" "}
            </span>
            <div className="flex mt-4 items-center w-full gap-4">
              <button
                onClick={() => {
                  setIsBottomSheetOpen(false);
                  push("/tickets/successful");
                }}
                type="button"
                className=" rounded-lg bg-indigo-600 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy with USDC
              </button>
              <button
                onClick={() => {
                  setIsBottomSheetOpen(false);
                  push("/tickets/successful");
                }}
                type="button"
                className=" rounded-lg bg-indigo-50 border border-indigo-500 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100"
              >
                Buy with fiat
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
            Buy ticket
          </button>
        </div>
      </main>
    </DashboardLayout>
  );
}
