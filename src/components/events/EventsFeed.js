import React, { useContext, useEffect, useState } from "react";

import moment from "moment";
import Link from "next/link";
import { giveRandomIcon } from "@/utils/helpers";
import { BoltIcon } from "@heroicons/react/24/outline";
import { BoltIcon as BoltIconSolid } from "@heroicons/react/24/solid";
import { pickEventForUser } from "@/pages/event/[event_id]";
import { mixpanel } from "@/utils/mixpanel";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { UserContext } from "@/contexts/UserContextProvider";
const DynamicQrReader = dynamic(
  () => import("@/components/modals/QRReaderModal"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
function EventsFeed({
  eventsTitle,
  allEvents,
  canMarkInterested,
  fetchAllEvents,
  canMarkAttended,
}) {
  // ! Hooks
  const { pathname, replace } = useRouter();
  const userContext = useContext(UserContext);
  // ! States
  const [loading, setLoading] = useState(false);
  const [isQrModalOpen, setisQrModalOpen] = useState(false);
  // ! Local handlers
  const isAttended = (eventId) => {
    console.log("ev", eventId);
    return userContext.userProfile?.attended?.find(
      (singleEvent) => singleEvent.event == eventId
    );
  };
  // ! Effects
  useEffect(() => {
    setLoading(false);
  }, [allEvents]);

  return (
    <div className="flow-root mt-12">
      <p className="text-4xl">{eventsTitle}</p>
      {allEvents ? (
        <ul role="list" className="-mb-8">
          {allEvents.length > 0 ? (
            <>
              {allEvents.map((singleDay, dayIndex) => {
                return (
                  <>
                    <div className="my-8">
                      <span className="text-3xl">
                        {moment(singleDay.date, "DD-MM-YYYY").format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </div>
                    {singleDay.events.map((activityItem, activityItemIdx) => (
                      <div key={activityItem?.id}>
                        <div className="relative pb-8">
                          {activityItemIdx !== singleDay.events.length - 1 ? (
                            <span
                              className="absolute left-6 top-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="absolute left-6 top-5 -ml-px h-full w-0.5 bg-gradient-to-b from-gray-200 to-transparent"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-300 ">
                                {giveRandomIcon()}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/event/${activityItem?.id}`}
                                onClick={() => {
                                  mixpanel("generic_link_click", {
                                    linkType: "Link to event",
                                    destinationUrl: `/event/${activityItem?.id}`,
                                  });
                                  mixpanel("event_card_click", {
                                    source_page: pathname,
                                    triggered_location: "events_feed_card",
                                    isPicked: activityItem?.isPicked,
                                    eventId: activityItem?.id,
                                    eventStartTime: moment(
                                      activityItem?.fields.Start
                                    ).format("DD MMM, YYYY (HH:MM A)"),
                                  });
                                }}
                              >
                                <div>
                                  <div className="text-lg">
                                    <p className="font-medium text-gray-100">
                                      {activityItem?.fields.Activity}
                                    </p>
                                  </div>
                                  {activityItem?.fields.SpeakerNames?.length >
                                    0 && (
                                    <p className="mt-1.5 text-sm text-gray-300">
                                      By{" "}
                                      <Link
                                        href={`/speaker/${activityItem?.fields.Speakers[0]}`}
                                        className="inline-flex mx-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800"
                                      >
                                        {activityItem?.fields.SpeakerNames[0]}
                                      </Link>{" "}
                                      {activityItem?.fields.SpeakerNames
                                        .length > 1 ? (
                                        <>
                                          and{" "}
                                          <span className="inline-flex ml-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                                            {activityItem?.fields.SpeakerNames
                                              .length - 1}{" "}
                                            others
                                          </span>
                                        </>
                                      ) : null}
                                    </p>
                                  )}
                                </div>
                                <div className="mt-2 text-sm text-gray-400">
                                  <img
                                    className="my-4 object-cover w-full rounded-lg"
                                    src={
                                      "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80"
                                    }
                                    alt={activityItem?.fields.Activity}
                                  />
                                  {activityItem?.fields.Notes && (
                                    <p className="text-lg text-purple-50">
                                      {activityItem?.fields.Notes}
                                    </p>
                                  )}
                                  <p className="my-1 mt-2 text-2xl text-purple-200">
                                    {moment(activityItem?.fields.Start).format(
                                      "HH:MM A"
                                    )}
                                  </p>
                                  <p className="my-1 text-2xl text-purple-200">
                                    {activityItem?.fields.Location}
                                  </p>
                                </div>
                              </Link>
                              {canMarkInterested && (
                                <>
                                  {activityItem.isPicked ? (
                                    <button
                                      type="button"
                                      class="inline-flex items-center gap-x-2 rounded-md border-2 border-indigo-100 px-3.5 py-2.5 mt-4 text-md font-medium text-purple-200 shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                                      onClick={() => {
                                        mixpanel("generic_button_click", {
                                          buttonText: "Going",
                                          eventId: activityItem.id,
                                        });
                                      }}
                                    >
                                      <BoltIconSolid width={20} />
                                      Going
                                    </button>
                                  ) : (
                                    <div className="flex items-center mt-4">
                                      <button
                                        type="button"
                                        class="inline-flex items-center gap-x-2 rounded-md bg-indigo-100 px-3.5 py-2.5 text-md font-medium text-purple-700 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200"
                                        onClick={(ev) => {
                                          ev.stopPropagation();
                                          setLoading(activityItem?.id);
                                          pickEventForUser(
                                            activityItem?.id,
                                            activityItem.fields[
                                              "Is Side Event"
                                            ] || false,
                                            activityItem.fields.Activity
                                          )
                                            .then(fetchAllEvents)
                                            .catch((err) => {
                                              if (err?.response?.status == 403)
                                                replace("/tickets");
                                              console.log("err", err);
                                            });
                                          mixpanel("mark_as_interested", {
                                            source_page: pathname,
                                            triggered_location:
                                              "events_feed_card",
                                            isPicked: activityItem?.isPicked,
                                            eventId: activityItem?.id,
                                            eventStartTime: moment(
                                              activityItem?.fields.Start
                                            ).format("DD MMM, YYYY (HH:MM A)"),
                                          });
                                          mixpanel("generic_button_click", {
                                            buttonText: "Interested",
                                            eventId: activityItem.id,
                                          });
                                        }}
                                      >
                                        <BoltIcon width={20} />
                                        Interested
                                      </button>
                                      {loading &&
                                        loading == activityItem.id && (
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
                                            <span className="sr-only">
                                              Loading...
                                            </span>
                                          </div>
                                        )}
                                    </div>
                                  )}
                                </>
                              )}
                              {canMarkAttended && (
                                <>
                                  {isAttended(activityItem?.id) ? (
                                    <button
                                      type="button"
                                      class="inline-flex items-center gap-x-2 rounded-md border-2 border-indigo-100 px-3.5 py-2.5 mt-4 text-md font-medium text-purple-200 shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                                      onClick={() => {
                                        mixpanel("generic_button_click", {
                                          buttonText: "Attended",
                                          eventId: activityItem.id,
                                        });
                                      }}
                                    >
                                      <BoltIconSolid width={20} />
                                      Attended
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      class="mt-4 inline-flex items-center gap-x-2 rounded-md bg-indigo-100 px-3.5 py-2.5 text-md font-medium text-purple-700 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200"
                                      onClick={(ev) => {
                                        ev.stopPropagation();
                                        setisQrModalOpen(true);
                                        mixpanel("mark_as_attended", {
                                          source_page: pathname,
                                          triggered_location:
                                            "events_feed_card",
                                          isPicked: activityItem?.isPicked,
                                          eventId: activityItem?.id,
                                          eventStartTime: moment(
                                            activityItem?.fields.Start
                                          ).format("DD MMM, YYYY (HH:MM A)"),
                                        });
                                        mixpanel("generic_button_click", {
                                          buttonText: "Mark attendance",
                                          eventId: activityItem.id,
                                        });
                                      }}
                                    >
                                      <BoltIcon width={20} />
                                      Mark attendance
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-lg mt-4 mb-6 block text-indigo-200">
                Select events that you are interested in.
              </p>
              <Link
                href={"/events"}
                className="rounded-md  inline bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Explore events
              </Link>
            </>
          )}
        </ul>
      ) : (
        <>
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
        </>
      )}
      <DynamicQrReader
        open={isQrModalOpen}
        setOpen={setisQrModalOpen}
        markAttendance
      />
    </div>
  );
}

export default EventsFeed;
