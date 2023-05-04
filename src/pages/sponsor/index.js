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
import { useRouter } from "next/router";
import { SocialIcon } from "react-social-icons";

function Sponsors() {
  const { replace, push } = useRouter();
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
        if (err?.response?.status == 403) replace("/tickets");
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
            <div
              className="relative flex items-start space-x-3"
              key={singleSponsor.id}
            >
              <div className="min-w-0 flex-1">
                <div
                  onClick={() => {
                    push(`/event/${singleSponsor?.id}`);
                  }}
                >
                  <div className="border border-gray-300 rounded-lg p-2 mt-4">
                    <div className=" text-sm text-gray-400">
                      <div className="flex items-center mb-4">
                        <img
                          className=" w-10 h-10 object-cover  rounded-lg"
                          src={singleSponsor.fields.Image}
                          alt={singleSponsor?.fields.Name}
                        />
                        <p className="font-medium text-gray-900 text-lg  ml-2">
                          {singleSponsor?.fields.Name}
                        </p>
                        <SocialIcon
                          url={singleSponsor?.fields.Twitter}
                          style={{
                            width: "18px",
                            height: "18px",
                            marginLeft: "6px",
                          }}
                          onClick={(ev) => {
                            ev.stopPropagation();
                          }}
                        />
                      </div>

                      {singleSponsor.fields.ScheduleName?.length > 0 && (
                        <div className="flex items-start flex-col text-blue-500">
                          <span className="text-lg font-medium text-gray-700">
                            Sponsored events
                          </span>
                          {singleSponsor.fields.ScheduleName.map(
                            (singleSchedule, index) => {
                              return (
                                <Link
                                  href={`/event/${singleSponsor.fields.Schedule[index]}`}
                                  key={singleSchedule}
                                  className="flex items-center my-1"
                                  onClick={(ev) => ev.stopPropagation()}
                                >
                                  {singleSchedule}
                                  <ArrowTopRightOnSquareIcon
                                    width={16}
                                    className="ml-2"
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      )}
                      {singleSponsor.fields["Side Events Names"]?.length >
                        0 && (
                        <div className="flex items-start flex-col text-blue-500">
                          <span className="text-lg font-medium text-gray-700">
                            Side events
                          </span>
                          {singleSponsor.fields["Side Events Names"].map(
                            (singleSchedule, index) => {
                              return (
                                <Link
                                  href={`/side-event/${singleSponsor.fields["Side Events"][index]}`}
                                  key={singleSchedule}
                                  className="flex items-center my-1"
                                  onClick={(ev) => ev.stopPropagation()}
                                >
                                  {singleSchedule}
                                  <ArrowTopRightOnSquareIcon
                                    width={16}
                                    className="ml-2"
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      )}
                      {/* <div className="flex items-center text-gray-500">
                        <span>{singleSponsor?.fields.Location}</span>
                        <span className="block w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full"></span>
                        <span>300+ going</span>
                      </div> */}
                      <button
                        type="button"
                        class="mt-4 w-full inline-flex items-center justify-center  bg-indigo-50 gap-x-2 rounded-md  px-3.5 py-2.5 text-md font-medium text-indigo-700 shadow-sm "
                        onClick={(ev) => {
                          ev.stopPropagation();
                        }}
                      >
                        <BoltIcon width={20} />
                        Mark as interested
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export default Sponsors;
