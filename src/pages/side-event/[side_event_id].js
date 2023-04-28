import { Thunderline } from "@/components/events/EventsFeed";
import SingleUserCard from "@/components/SingleUserCard";
import { UserContext } from "@/contexts/UserContextProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import customAxios from "@/utils/axios";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import {
  ArrowLeftIcon,
  BoltIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon as BoltIconSolid, UserIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CalendarColorIcon } from "@/utils/Icons";
export const pickEventForUser = (eventId, isSideEvent, name) => {
  return customAxios.post(
    "/events/pickevent",
    { eventId, isSideEvent, name },
    { headers: { workspace: "2" } }
  );
};
function SingleEvent() {
  // ! Hooks
  const { query, pathname, replace, back } = useRouter();
  const userContext = useContext(UserContext);
  // ! Local states
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("About");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // ! LocalHelpers
  const isAttended = (eventId) => {
    console.log("ev", eventId);
    return userContext.userProfile?.attended?.find(
      (singleEvent) => singleEvent.event == eventId
    );
  };
  const fetchSingleEvent = () => {
    customAxios
      .get(`/airtable/events?eventId=${query.side_event_id}`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("res", res);
        setEventDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status == 403) replace("/tickets");
        console.log("err", err);
        setLoading(false);
      });
  };
  // ! Local effects
  useEffect(() => {
    if (query.side_event_id) fetchSingleEvent();
  }, [query.side_event_id]);
  console.log("eventDetails", eventDetails);
  return (
    <DashboardLayout hideBottomNav hideChat>
      {eventDetails ? (
        <section className="mt-6 text-gray-900">
          <div className="flex items-center justify-between">
            <ArrowLeftIcon
              onClick={back}
              className=""
              width={24}
              strokeWidth={2}
            />
            <ShareIcon className="" width={24} strokeWidth={2} />
          </div>
          <img
            className="my-5 rounded-lg"
            src="https://images.unsplash.com/photo-1639987759021-bc55a0c96ce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80"
          />
          <p className="text-lg font-medium">{eventDetails.fields.Activity}</p>{" "}
          {eventDetails.fields.SpeakerNames?.length > 0 && (
            <div className="flex items-center mb-2 mt-4 text-sm text-gray-700">
              <div className="flex -space-x-1 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <span className="block ml-2">
                Hosted by {eventDetails.fields.SpeakerNames[0]}{" "}
                {eventDetails.fields.SpeakerNames.length > 1 && (
                  <>and {eventDetails.fields.SpeakerNames.length} others</>
                )}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2 mb-2 text-sm text-gray-700">
            <span className="bg-orange-50 p-1 rounded-lg">
              <CalendarIcon
                width={18}
                className="text-orange-500 translate-y-[-1px]"
              />
            </span>
            <span>
              {moment(eventDetails.fields.Start).format("dddd, MMMM DD YYYY")}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-500"></span>
            <span>{moment(eventDetails.fields.Start).format("hh:mm a")}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="bg-yellow-50 p-1 rounded-lg">
              <MapPinIcon
                width={18}
                className="text-yellow-500 translate-y-[-1px]"
              />
            </span>
            <span>{eventDetails.fields.Location}</span>
          </div>
          <div className="flex items-start my-4">
            <span
              onClick={() => {
                setCurrentTab("About");
              }}
              className={`cursor-pointer text-lg font-semibold flex items-center min-w-[81px] flex-col mr-4 ${
                currentTab == "About" ? "text-gray-900 " : "text-gray-600"
              }`}
            >
              About
              {currentTab == "About" && <Thunderline />}
            </span>
            {eventDetails?.fields?.SpeakerNames?.length > 0 && (
              <span
                onClick={() => {
                  setCurrentTab("Speakers");
                }}
                className={`cursor-pointer text-lg font-semibold flex items-center min-w-[81px] flex-col mr-4 ${
                  currentTab == "Speakers" ? "text-gray-900 " : "text-gray-500"
                }`}
              >
                Speakers
                {currentTab == "Speakers" && <Thunderline />}{" "}
              </span>
            )}
            {eventDetails?.fields?.SponsorNames?.length > 0 && (
              <span
                onClick={() => {
                  setCurrentTab("Sponsors");
                }}
                className={`cursor-pointer text-lg font-semibold flex items-center min-w-[81px] flex-col mr-4 ${
                  currentTab == "Sponsors" ? "text-gray-900 " : "text-gray-500"
                }`}
              >
                Sponsors
                {currentTab == "Sponsors" && <Thunderline />}{" "}
              </span>
            )}
            <span
              onClick={() => {
                setCurrentTab("Going");
              }}
              className={`cursor-pointer text-lg font-semibold flex items-center min-w-[81px] flex-col mr-4 ${
                currentTab == "Going" ? "text-gray-900 " : "text-gray-600"
              }`}
            >
              9 Going
              {currentTab == "Going" && <Thunderline />}
            </span>
          </div>
          {currentTab == "About" && (
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
              architecto ut <strong>adipisci iusto provident</strong> omnis
              necessitatibus ducimus beatae, veniam assumenda maxime, dicta
              aspernatur nulla molestiae. Facilis laboriosam dolor inventore
              magnam magni.
              <br />
              <br />
              fugit reiciendis, tempora maiores expedita, veniam ad quae.
              beatae, veniam assumenda maxime, dicta aspernatur nulla molestiae.
              Facilis laboriosam <strong>adipisci iusto provident</strong> dolor
              inventore magnam magni, et fugit reiciendis, tempora maiores
              expedita, veniam ad quae.
            </p>
          )}
          {currentTab == "Going" && (
            <div>
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
            </div>
          )}
          {currentTab == "Speakers" && (
            <div>
              <SingleUserCard />
              <SingleUserCard />
            </div>
          )}
          {currentTab == "Sponsors" && (
            <div>
              <SingleUserCard />
              <SingleUserCard />
              <SingleUserCard />
            </div>
          )}
          <div className="fixed bottom-0 w-full left-0 bg-white p-2 border-t border-gray-200">
            <button
              onClick={() => {
                setIsBottomSheetOpen(true);
              }}
              type="button"
              className="rounded-lg bg-indigo-600 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon width={16} className="mr-2" /> Mark as going
            </button>
          </div>
          <BottomSheet open={isBottomSheetOpen}>
            <div className="p-4 flex items-center flex-col">
              <CalendarColorIcon />
              <span className="text-gray-900 text-lg block my-2">
                Add event to your calender
              </span>
              <span className="text-gray-500 text-sm">
                Keep track of all upcoming event by adding it your calender
              </span>
              <button
                onClick={() => {
                  setIsBottomSheetOpen(true);
                }}
                type="button"
                className="mt-4 rounded-lg bg-indigo-600 w-full px-3.5 py-2.5 flex items-center justify-center text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add to calendar
              </button>
            </div>
          </BottomSheet>
        </section>
      ) : (
        <div
          role="status"
          class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-10"
        >
          <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-slate-700">
            <svg
              class="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div class="w-full">
            <div class="h-2.5 bg-purple-200 rounded-full dark:bg-slate-700 w-48 mb-4"></div>
            <div class="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-purple-200 rounded-full dark:bg-slate-700 mb-2.5"></div>
            <div class="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[440px] mb-2.5"></div>
            <div class="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[460px] mb-2.5"></div>
            <div class="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[360px]"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </DashboardLayout>
  );
}
export default SingleEvent;
