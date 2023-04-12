import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import customAxios from "@/utils/axios";
import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon as BoltIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { giveRandomIcon } from "@/utils/helpers";

function Sponsors() {
  // ! Local states
  const [allSponsors, setAllSponsors] = useState(null);
  // ! Local handlers
  const fetchAllSponsors = () => {
    customAxios
      .get(`/airtable/sponsors`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("res", res);
        setAllSponsors(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // ! Local effects
  useEffect(() => {
    fetchAllSponsors();
  }, []);
  console.log("allSponsors", allSponsors);
  if (!allSponsors)
    return (
      <DashboardLayout>
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
      </DashboardLayout>
    );
  return (
    <DashboardLayout>
      <div className="mt-10">
        {allSponsors.map((singleSponsor) => {
          return (
            <div className="min-w-0 flex-1 my-4" key={singleSponsor.id}>
              <Link
                href={`/sponsor/${singleSponsor?.id}`}
                onClick={() => {
                  // mixpanel("event_card_click", {
                  //   source_page: pathname,
                  //   triggered_location: "events_feed_card",
                  //   isPicked: activityItem?.isPicked,
                  //   eventId: activityItem?.id,
                  //   eventStartTime: moment(activityItem?.fields.Start).format(
                  //     "DD MMM, YYYY (HH:MM A)"
                  //   ),
                  // });
                }}
              >
                <div>
                  <div className="text-lg">
                    <p className="font-medium text-gray-100">
                      {singleSponsor?.fields.Name}
                    </p>
                  </div>
                </div>
                {singleSponsor?.fields.Bio && (
                  <p className="text-md text-purple-200">
                    {singleSponsor?.fields.Bio}
                  </p>
                )}
                <div className="mt-2 text-sm text-gray-400">
                  <img
                    className="my-4 object-cover w-full rounded-lg"
                    src={
                      "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80"
                    }
                    alt={singleSponsor?.fields.Activity}
                  />
                  {singleSponsor?.fields.ScheduleName?.length > 0 && (
                    <>
                      <h4 className="text-lg text-gray-200 font-bold mt-4">
                        Talks
                      </h4>
                      <ol className="flex flex-col items-left">
                        {singleSponsor.fields.ScheduleName.map(
                          (singleTalk, index) => {
                            return (
                              <li key={singleSponsor.fields.Schedule[index]}>
                                <Link
                                  className="mt-1 text-purple-300 flex items-center"
                                  href={`/event/${singleSponsor.fields.Schedule[index]}`}
                                >
                                  {giveRandomIcon()} {singleTalk}{" "}
                                  <ArrowTopRightOnSquareIcon
                                    width={16}
                                    className="inline  ml-2"
                                  />
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </>
                  )}{" "}
                  {singleSponsor.fields["Side Events Names"]?.length > 0 && (
                    <>
                      <h4 className="text-lg text-gray-200 font-bold mt-4">
                        Side Events
                      </h4>
                      <ol className="flex flex-col items-left">
                        {singleSponsor.fields["Side Events Names"].map(
                          (singleEvent, index) => {
                            return (
                              <li
                                key={singleSponsor.fields["Side Events"][index]}
                              >
                                <Link
                                  className="mt-1 text-purple-300 flex items-center"
                                  href={`/event/${singleSponsor.fields["Side Events"][index]}`}
                                >
                                  {giveRandomIcon()} {singleEvent}{" "}
                                  <ArrowTopRightOnSquareIcon
                                    width={16}
                                    className="inline  ml-2"
                                  />
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ol>
                    </>
                  )}
                </div>
              </Link>
              <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export default Sponsors;
