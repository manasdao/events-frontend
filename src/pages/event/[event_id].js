import { UserContext } from "@/contexts/UserContextProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import customAxios from "@/utils/axios";
import { mixpanel } from "@/utils/mixpanel";
import { BoltSlashIcon } from "@heroicons/react/20/solid";
import { BoltIcon } from "@heroicons/react/24/outline";
import { BoltIcon as BoltIconSolid } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
export const pickEventForUser = (eventId, isSideEvent, name) => {
  return customAxios.post(
    "/events/pickevent",
    { eventId, isSideEvent, name },
    { headers: { workspace: "2" } }
  );
};
function SingleEvent() {
  // ! Hooks
  const { query, pathname, replace } = useRouter();
  const userContext = useContext(UserContext);
  // ! Local states
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  // ! LocalHelpers
  const isAttended = (eventId) => {
    console.log("ev", eventId);
    return userContext.userProfile?.attended?.find(
      (singleEvent) => singleEvent.event == eventId
    );
  };
  const fetchSingleEvent = () => {
    customAxios
      .get(`/airtable/events?eventId=${query.event_id}`, {
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
    if (query.event_id) fetchSingleEvent();
  }, [query.event_id]);
  console.log("eventDetails", eventDetails);
  return (
    <DashboardLayout>
      {eventDetails ? (
        <>
          <div className="md:flex items-start justify-center mt-7">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
              <img
                className="w-full"
                alt="img of a girl posing"
                src="https://i.ibb.co/QMdWfzX/component-image-one.png"
              />
              <img
                className="mt-6 w-full"
                alt="img of a girl posing"
                src="https://i.ibb.co/qxkRXSq/component-image-two.png"
              />
            </div>
            <div className="md:hidden">
              <img
                className="w-full"
                alt="img of a girl posing"
                src="https://i.ibb.co/QMdWfzX/component-image-one.png"
              />
            </div>
          </div>
          <div className="text-lg">
            <p className="font-medium text-3xl mt-4 mb-2 text-gray-100">
              {eventDetails?.fields.Activity}
            </p>
          </div>
          {eventDetails?.fields.Speakers && (
            <p className="mt-1.5 text-lg text-gray-300">
              By{" "}
              <Link
                href={`/speaker/${eventDetails?.fields.Speakers[0]}`}
                className="inline-flex mx-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800"
              >
                {eventDetails?.fields.SpeakerNames[0]}
              </Link>{" "}
              {eventDetails?.fields.SpeakerNames.length > 1 ? (
                <>
                  and{" "}
                  <span className="inline-flex ml-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                    {eventDetails?.fields.SpeakerNames.length - 1} others
                  </span>
                </>
              ) : null}
            </p>
          )}
          <p className="my-1 mt-2 text-md text-purple-100">
            {eventDetails?.fields?.Notes || ""}
          </p>
          <p className="my-1 mt-2 text-2xl text-purple-300">
            {moment(eventDetails?.fields.Start).format("DD MMM, HH:MM A")}
          </p>
          <p className="my-1 text-2xl text-purple-300">
            {eventDetails?.fields.Location}
          </p>
          {eventDetails.isPicked ? (
            <button
              type="button"
              class="inline-flex items-center gap-x-2 rounded-md border-2 border-indigo-100 px-3.5 py-2.5 mt-4 text-md font-medium text-purple-200 shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
            >
              <BoltIconSolid width={20} />
              {isAttended(eventDetails?.id) ? "Attended" : "Going"}
            </button>
          ) : (
            <div className="flex items-center mt-4">
              <button
                type="button"
                class="inline-flex items-center gap-x-2 rounded-md bg-indigo-100 px-3.5 py-2.5 text-md font-medium text-purple-700 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200"
                onClick={() => {
                  setLoading(true);
                  pickEventForUser(
                    query.event_id,
                    eventDetails.fields["Is Side Event"] || false,
                    eventDetails.fields.Activity
                  )
                    .then(fetchSingleEvent)
                    .catch((err) => {
                      if (err?.response?.status == 403) replace("/tickets");
                      console.log("err", err);
                    });
                  mixpanel("mark_as_interested", {
                    source_page: pathname,
                    triggered_location: "single_event_page",
                    isPicked: eventDetails?.isPicked,
                    eventId: eventDetails?.id,
                    eventStartTime: moment(eventDetails?.fields.Start).format(
                      "DD MMM, YYYY (HH:MM A)"
                    ),
                  });
                }}
              >
                <BoltIcon width={20} />
                Interested
              </button>
              {loading && (
                <div role="status" className="ml-4">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          )}
        </>
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
