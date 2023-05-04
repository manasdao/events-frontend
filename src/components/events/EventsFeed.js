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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SingleBanner from "../banners/SingleBanner";
import { push } from "mixpanel-browser";
export const Thunderline = ({ width = 81 }) => {
  return (
    <svg
      width={width}
      height="9"
      viewBox="0 0 81 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1H80L1 8H56.3" stroke="#FBBF24" />
    </svg>
  );
};
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
  myEvents,
}) {
  // ! Hooks
  const { pathname, replace, push } = useRouter();
  const userContext = useContext(UserContext);
  // ! States
  const [loading, setLoading] = useState(false);
  const [isQrModalOpen, setisQrModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Events");
  const [eventsToRender, setEventsToRender] = useState(null);
  // ! Local handlers
  const isAttended = (eventId) => {
    console.log("ev", eventId);
    return userContext.userProfile?.attended?.find(
      (singleEvent) => singleEvent.event == eventId
    );
  };
  // ! Effects
  useEffect(() => {
    if (allEvents) {
      setEventsToRender(allEvents);
      setLoading(false);
    }
  }, [allEvents]);
  useEffect(() => {
    if (allEvents && myEvents) {
      if (currentTab === "Events") setEventsToRender(allEvents);
      if (currentTab === "Going") setEventsToRender(myEvents);
    }
  }, [currentTab]);

  return (
    <div className="flow-root mt-6">
      {" "}
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="events-page-swiper"
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src="https://cdn.discordapp.com/attachments/1028914396048662528/1101496653007028234/image.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://pbs.twimg.com/media/Fr9PaZZXgAAsZXY?format=jpg&name=medium" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://pbs.twimg.com/media/Fuu4JsAXoAAiWu_?format=jpg&name=large" />
        </SwiperSlide>
      </Swiper>
      <div className="flex items-start my-2 px-4">
        <span
          onClick={() => {
            setCurrentTab("Events");
          }}
          className={`cursor-pointer text-2xl font-semibold min-w-[81px] flex items-center flex-col mr-4 ${
            currentTab == "Events" ? "text-gray-900 " : "text-gray-600"
          }`}
        >
          Browse events
          {currentTab == "Events" && <Thunderline />}
        </span>
        <span
          onClick={() => {
            setCurrentTab("Going");
          }}
          className={`cursor-pointer text-2xl font-semibold min-w-[81px] flex items-center flex-col ${
            currentTab == "Going" ? "text-gray-900 " : "text-gray-500"
          }`}
        >
          My calendar
          {currentTab == "Going" && <Thunderline />}{" "}
        </span>
      </div>
      {eventsToRender ? (
        <ul role="list" className="-mb-8 px-4">
          {eventsToRender.length > 0 ? (
            <>
              {eventsToRender.map((singleDay, dayIndex) => {
                return (
                  <>
                    <div className="flex items-center border border-gray-300 rounded-full py-2 pl-12 pr-4 w-max -translate-x-12 mt-4">
                      <span className="text-lg text-gray-900 font-semibold mr-2 block">
                        {moment(singleDay.date, "DD-MM-YYYY").format("DD MMMM")}
                      </span>
                      <span className="text-sm text-gray-500 font-light">
                        {moment(singleDay.date, "DD-MM-YYYY").format("dddd")}
                      </span>
                    </div>
                    {singleDay.events.map((activityItem, activityItemIdx) => (
                      <div key={activityItem?.id}>
                        <div className="relative">
                          {activityItemIdx !== singleDay.events.length - 1 ? (
                            <span
                              className="absolute left-1 top-0 -ml-px h-full w-0.5 bg-gray-300"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="absolute left-1 top-0 -ml-px h-full w-0.5 bg-gradient-to-b from-gray-300 to-transparent"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex items-start space-x-3">
                            <div className="min-w-0 flex-1 pl-6">
                              <div
                                onClick={() => {
                                  push(`/event/${activityItem?.id}`);
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
                                <div className="border border-gray-300 rounded-lg p-2 mt-4">
                                  <div className=" text-sm text-gray-400">
                                    <img
                                      className="mb-2 object-cover w-full rounded-lg"
                                      src={activityItem?.fields.images}
                                      alt={activityItem?.fields.Activity}
                                    />
                                    <p className="my-1 text-sm text-gray-500 font-medium">
                                      {moment(
                                        activityItem?.fields.Start
                                      ).format("HH:MM A")}
                                    </p>
                                    <p className="font-medium text-gray-900 text-lg mb-2">
                                      {activityItem?.fields.Activity}
                                    </p>
                                    {activityItem.fields.SpeakerNames?.length >
                                      0 && (
                                      <div className="flex items-center mb-2 mt-2 text-sm text-gray-700">
                                        <div className="flex -space-x-1 overflow-hidden">
                                          <img
                                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                          />
                                        </div>
                                        <span className="block ml-2">
                                          Hosted by{" "}
                                          {activityItem.fields.SpeakerNames[0]}{" "}
                                          {activityItem.fields.SpeakerNames
                                            .length > 1 && (
                                            <>
                                              and{" "}
                                              {
                                                activityItem.fields.SpeakerNames
                                                  .length
                                              }{" "}
                                              others
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center text-gray-500">
                                      <span>
                                        {activityItem?.fields.Location}
                                      </span>
                                      <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
                                      <span>300+ going</span>
                                    </div>
                                    {canMarkInterested &&
                                      currentTab == "Events" && (
                                        <>
                                          {activityItem.isPicked ? (
                                            <button
                                              type="button"
                                              class="w-full inline-flex items-center bg-indigo-50 justify-center gap-x-2 rounded-md border-2  px-3.5 py-2.5 mt-4 text-md font-medium text-indigo-700 shadow-sm "
                                              onClick={(ev) => {
                                                ev.stopPropagation();
                                                mixpanel(
                                                  "generic_button_click",
                                                  {
                                                    buttonText: "Going",
                                                    eventId: activityItem.id,
                                                  }
                                                );
                                              }}
                                            >
                                              <BoltIconSolid width={20} />
                                              Going
                                            </button>
                                          ) : (
                                            <div className="flex items-center mt-4">
                                              <button
                                                type="button"
                                                class="mt-4 w-full inline-flex items-center justify-center  bg-indigo-50 gap-x-2 rounded-md  px-3.5 py-2.5 text-md font-medium text-indigo-700 shadow-sm "
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
                                                      if (
                                                        err?.response?.status ==
                                                        403
                                                      )
                                                        replace("/tickets");
                                                      console.log("err", err);
                                                    });
                                                  mixpanel(
                                                    "mark_as_interested",
                                                    {
                                                      source_page: pathname,
                                                      triggered_location:
                                                        "events_feed_card",
                                                      isPicked:
                                                        activityItem?.isPicked,
                                                      eventId: activityItem?.id,
                                                      eventStartTime: moment(
                                                        activityItem?.fields
                                                          .Start
                                                      ).format(
                                                        "DD MMM, YYYY (HH:MM A)"
                                                      ),
                                                    }
                                                  );
                                                  mixpanel(
                                                    "generic_button_click",
                                                    {
                                                      buttonText: "Interested",
                                                      eventId: activityItem.id,
                                                    }
                                                  );
                                                }}
                                              >
                                                <BoltIcon width={20} />
                                                Mark as going
                                              </button>
                                              {loading &&
                                                loading == activityItem.id && (
                                                  <div
                                                    role="status"
                                                    className="ml-4"
                                                  >
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
                                    {canMarkAttended &&
                                      currentTab == "Going" && (
                                        <>
                                          {isAttended(activityItem?.id) ? (
                                            <button
                                              type="button"
                                              class="w-full justify-center  bg-indigo-50 inline-flex items-center gap-x-2 rounded-md border-2  px-3.5 py-2.5 mt-4 text-md font-medium text-indigo-700 shadow-sm "
                                              onClick={() => {
                                                mixpanel(
                                                  "generic_button_click",
                                                  {
                                                    buttonText: "Attended",
                                                    eventId: activityItem.id,
                                                  }
                                                );
                                              }}
                                            >
                                              <BoltIconSolid width={20} />
                                              Attended
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              class="mt-4 w-full justify-center inline-flex items-center gap-x-2 rounded-md bg-indigo-50 px-3.5 py-2.5 text-md font-medium text-indigo-700 shadow-sm "
                                              onClick={(ev) => {
                                                ev.stopPropagation();
                                                setisQrModalOpen(true);
                                                mixpanel("mark_as_attended", {
                                                  source_page: pathname,
                                                  triggered_location:
                                                    "events_feed_card",
                                                  isPicked:
                                                    activityItem?.isPicked,
                                                  eventId: activityItem?.id,
                                                  eventStartTime: moment(
                                                    activityItem?.fields.Start
                                                  ).format(
                                                    "DD MMM, YYYY (HH:MM A)"
                                                  ),
                                                });
                                                mixpanel(
                                                  "generic_button_click",
                                                  {
                                                    buttonText:
                                                      "Mark attendance",
                                                    eventId: activityItem.id,
                                                  }
                                                );
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
            class="px-4 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-10"
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
