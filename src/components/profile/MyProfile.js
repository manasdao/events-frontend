import { UserContext } from "@/contexts/UserContextProvider";
import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import QRCode from "react-qr-code";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
function MyProfile() {
  const { userDetails, userProfile } = useContext(UserContext);

  if (!userDetails)
    return (
      <DashboardLayout>
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-10 bg-purple-100 p-6 rounded-lg"
        >
          <div className="h-16 bg-purple-200 rounded-full dark:bg-slate-700 w-16 mx-auto mb-4"></div>
          <div className="h-8 bg-purple-200 rounded-full dark:bg-slate-700 w-64 mx-auto mb-4"></div>
          <div className="flex items-center justify-center mx-auto w-48 h-48 bg-gray-300 rounded sm:w-96 dark:bg-slate-700">
            <svg
              className="w-12 h-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="flex items-center mx-auto w-full justify-center">
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-purple-200 rounded-full dark:bg-slate-700 w-48 mb-4"></div>
            <div className="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-purple-200 rounded-full dark:bg-slate-700 mb-2.5"></div>
            <div className="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-purple-200 rounded-full dark:bg-slate-700 max-w-[360px] mb-5"></div>
            <div className="h-8 bg-purple-200 rounded-full dark:bg-slate-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </DashboardLayout>
    );
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10 rounded-lg drop-shadow-lg">
      <div className="overflow-hidden bg-gradient-to-b from-purple-300 to-purple-950 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex">
            <div className="flex flex-col w-full items-center">
              <img
                src={userDetails?.profile_picture}
                alt=""
                className="w-16 rounded-full shadow-lg drop-shadow-lg"
              />
              <h4 className="text-4xl my-3 text-purple-900 font-bold text-center">
                {userDetails?.first_name} {userDetails?.last_name}
              </h4>
            </div>
            <div className="mb-4 flex justify-center sm:mb-0 sm:mr-4">
              <QRCode
                value={`{userId:${userDetails?.id},telegram:https://www.t.me/${userDetails?.user_name}}`}
              />
            </div>
            <div className="flex items-center mx-auto w-full justify-center">
              <SocialIcon
                url="https://twitter.com/tripathigrows"
                className="mx-4"
              />
              <SocialIcon
                url="https://www.linkedin.com/in/manas-tripathi-dev/"
                className="mx-4"
              />
              <SocialIcon url="https://www.t.me/scotch1998" className="mx-4" />
            </div>
            {userProfile?.attended?.length > 0 && (
              <div>
                <h4 className="text-lg text-gray-300 my-2 font-bold">POAPs</h4>
                <div className="overflow-x-scroll flex items-center">
                  {userProfile?.attended.map((singlePoap, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center mr-4 "
                      >
                        <Link
                          href={`/event/${singlePoap.event}`}
                          className="whitespace-nowrap inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-200 text-purple-800 font-bold text-xl "
                        >
                          {singlePoap.eventName[0]}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
