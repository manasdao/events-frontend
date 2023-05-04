import { UserContext } from "@/contexts/UserContextProvider";
import React, { useContext, useState } from "react";
import { SocialIcon } from "react-social-icons";
import QRCode from "react-qr-code";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import { Thunderline } from "../events/EventsFeed";
import SingleUserCard from "../SingleUserCard";
import CompactEventCard from "../CompactEventCard";
import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
export const users = [
  {
    name: "Avery",
    designation: "UI/UX Designer",
    imageUrl: "https://source.unsplash.com/random/?avery",
  },
  {
    name: "Leo",
    designation: "Frontend Developer",
    imageUrl: "https://source.unsplash.com/random/?leo",
  },
  {
    name: "Mia",
    designation: "Product Manager",
    imageUrl: "https://source.unsplash.com/random/?mia",
  },
  {
    name: "Noah",
    designation: "Software Engineer",
    imageUrl: "https://source.unsplash.com/random/?noah",
  },
  {
    name: "Ava",
    designation: "Data Analyst",
    imageUrl: "https://source.unsplash.com/random/?ava",
  },
  {
    name: "Ethan",
    designation: "Systems Architect",
    imageUrl: "https://source.unsplash.com/random/?ethan",
  },
  {
    name: "Lila",
    designation: "Full Stack Developer",
    imageUrl: "https://source.unsplash.com/random/?lila",
  },
  {
    name: "Elijah",
    designation: "Cloud Engineer",
    imageUrl: "https://source.unsplash.com/random/?elia",
  },
  {
    name: "Sophia",
    designation: "Cybersecurity Analyst",
    imageUrl: "https://source.unsplash.com/random/?sophia",
  },
  {
    name: "Oliver",
    designation: "Blockchain Developer",
    imageUrl: "https://source.unsplash.com/random/?olive",
  },
  {
    name: "Lily",
    designation: "AI/ML Engineer",
    imageUrl: "https://source.unsplash.com/random/?lily",
  },
  {
    name: "Mason",
    designation: "DevOps Engineer",
    imageUrl: "https://source.unsplash.com/random/?mason",
  },
  {
    name: "Zoe",
    designation: "Mobile Developer",
    imageUrl: "https://source.unsplash.com/random/?zoe",
  },
  {
    name: "Lucas",
    designation: "Database Administrator",
    imageUrl: "https://source.unsplash.com/random/?luke",
  },
  {
    name: "Chloe",
    designation: "Network Engineer",
    imageUrl: "https://source.unsplash.com/random/?chole",
  },
  {
    name: "Logan",
    designation: "Game Developer",
    imageUrl: "https://source.unsplash.com/random/?logan",
  },
  {
    name: "Emma",
    designation: "IT Manager",
    imageUrl: "https://source.unsplash.com/random/?emma",
  },
  {
    name: "Sebastian",
    designation: "QA Engineer",
    imageUrl: "https://source.unsplash.com/random/?seb",
  },
  {
    name: "Aria",
    designation: "UI Developer",
    imageUrl: "https://source.unsplash.com/random/?person",
  },
  {
    name: "Caleb",
    designation: "Tech Support Specialist",
    imageUrl: "https://source.unsplash.com/random/?person",
  },
];

function MyProfile() {
  const { back } = useRouter();

  const { userDetails, userProfile } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("About");

  let qrDetails = {
    userId: `${userDetails?.id}`,
    telegram: `https://www.t.me/${userDetails?.user_name}`,
  };
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
    <div className="mt-10 text-gray-900">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center w-full justify-between">
          <ArrowLeftIcon
            onClick={back}
            className=""
            width={24}
            strokeWidth={2}
          />
          <ShareIcon className="" width={24} strokeWidth={2} />
        </div>
        <img
          src={userDetails?.profile_picture}
          alt=""
          className="w-16 rounded-full shadow-lg drop-shadow-lg"
        />
        <h4 className="text-xl mt-3 text-gray-900 font-bold text-center">
          {userDetails?.first_name} {userDetails?.last_name}
        </h4>
        <p className="text-sm text-gray-500 mb-4">Blockchain Engineer</p>
      </div>
      <div className="mb-4 flex justify-center ">
        <QRCode value={JSON.stringify(qrDetails)} />
      </div>
      <div className="flex items-center mx-auto w-full justify-center">
        <SocialIcon
          url="https://twitter.com/tripathigrows"
          className="mx-4 "
          style={{ width: "32px", height: "32px" }}
        />
        <SocialIcon
          url="https://www.linkedin.com/in/manas-tripathi-dev/"
          className="mx-4 "
          style={{ width: "32px", height: "32px" }}
        />
        <SocialIcon
          url="https://www.t.me/scotch1998"
          className="mx-4 "
          style={{ width: "32px", height: "32px" }}
        />
      </div>
      <div className="grid grid-cols-3 my-4 mx-8">
        <div className="flex flex-col items-center">
          <span className="text-gray-900 text-md">10</span>
          <span className="text-gray-500 text-sm">Bumpped</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-900 text-md">10</span>
          <span className="text-gray-500 text-sm">Attended</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-900 text-md">10</span>
          <span className="text-gray-500 text-sm">Going</span>
        </div>
      </div>
      <div className="bg-gray-300 w-full h-[1px]"></div>
      <div className="flex items-start my-4">
        <span
          onClick={() => {
            setCurrentTab("About");
          }}
          className={`cursor-pointer text-lg font-semibold flex items-center  flex-col  mr-2 min-w-[60px] ${
            currentTab == "About" ? "text-gray-900 " : "text-gray-600"
          }`}
        >
          About
          {currentTab == "About" && <Thunderline width={60} />}
        </span>
        <span
          onClick={() => {
            setCurrentTab("Bumpped");
          }}
          className={`cursor-pointer text-lg font-semibold flex items-center  flex-col mr-2 min-w-[60px] ${
            currentTab == "Bumpped" ? "text-gray-900 " : "text-gray-500"
          }`}
        >
          Bumpped
          {currentTab == "Bumpped" && <Thunderline width={60} />}{" "}
        </span>
        {/* <span
          onClick={() => {
            setCurrentTab("Event");
          }}
          className={`cursor-pointer text-lg font-semibold flex items-center  flex-col  mr-2 min-w-[60px] ${
            currentTab == "Event" ? "text-gray-900 " : "text-gray-600"
          }`}
        >
          Event
          {currentTab == "Event" && <Thunderline width={60} />}
        </span> */}
        <span
          onClick={() => {
            setCurrentTab("POAP");
          }}
          className={`cursor-pointer text-lg font-semibold flex items-center  min-w-[60px] flex-col ${
            currentTab == "POAP" ? "text-gray-900 " : "text-gray-500"
          }`}
        >
          POAP
          {currentTab == "POAP" && <Thunderline width={60} />}{" "}
        </span>
      </div>
      {currentTab == "About" && (
        <p>
          As a blockchain engineer, I am at the forefront of innovation in the
          decentralized space. With a passion for developing new systems that
          can transform the way we interact with one another, I have spent years
          honing my craft and pushing the boundaries of what is possible. At the
          DAO conference, I have the opportunity to share my expertise with
          like-minded individuals and learn from some of the brightest minds in
          the industry. Whether I am interested in building new DAOs or
          exploring the latest trends in blockchain technology, this conference
          is the perfect place for me to network and grow as a professional.
        </p>
      )}
      {currentTab == "Bumpped" && (
        <>
          {users.map((singleUser, index) => {
            if (index > 9) return null;
            return (
              <SingleUserCard
                key={singleUser.name}
                name={singleUser.name}
                designation={singleUser.designation}
                imageUrl={singleUser.imageUrl}
              />
            );
          })}
        </>
      )}
      {/* {currentTab == "Event" && (
        <>
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
          <CompactEventCard />
        </>
      )} */}
      {userProfile?.attended?.length > 0 && currentTab == "POAP" && (
        <div>
          {/* <h4 className="text-lg text-gray-300 my-2 font-bold">POAPs</h4> */}
          <div className="overflow-x-scroll flex items-center">
            {userProfile?.attended.map((singlePoap, index) => {
              return (
                <>
                  <div key={index} className="flex flex-col items-center mr-4 ">
                    <Link
                      href={`/event/${singlePoap.event}`}
                      className="whitespace-nowrap inline-flex  items-center justify-center h-12 w-12 rounded-full  font-bold text-xl "
                    >
                      <img
                        className="object-cover rounded-full h-full"
                        src={`https://source.unsplash.com/random/?${singlePoap.eventName}`}
                      />
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
