import SingleHotelCard from "@/components/SingleHotelCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import customAxios from "@/utils/axios";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SingleSideEventCard from "@/components/SingleSideEventCard";
let HOTEL_IMAGE =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
let PARIS_IMAGE =
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2240&q=80";
export const ThunderlineBlue = () => {
  return (
    <svg
      width="80"
      height="9"
      viewBox="0 0 80 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1H79L1 8H55.6" stroke="#0EA5E9" />
    </svg>
  );
};
export const ThunderlinePurple = () => {
  return (
    <svg
      width="64"
      height="9"
      viewBox="0 0 64 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1H63L1 8H44.4" stroke="#8B5CF6" />
    </svg>
  );
};
function Explore() {
  const router = useRouter();
  // ! Local states
  const [sideEvents, setSideEvents] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  // ! Local handlers
  const fetchSideEvents = () => {
    customAxios
      .get(`/airtable/sideevents`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("fetchSideEvents res", res);
        setSideEvents(res.data);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("err", err);
      });
  };
  const fetchHotels = () => {
    customAxios
      .get(`/airtable/hotels`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("fetchHotels res", res);
        setHotels(res.data);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("err", err);
      });
  };
  // ! Effects
  useEffect(() => {
    fetchSideEvents();
    fetchHotels();
  }, []);
  useEffect(() => {
    if (hotels && sideEvents) setLoading(false);
  }, [hotels, sideEvents]);

  // const explore = [
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Photography run",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1541628951107-a9af5346a3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Antique stays",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Arc De Triomphe",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Visit Louvre",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Explore Cafes",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Cycle rides",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1454386608169-1c3b4edc1df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Take the metro",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1619794578892-cbdd3ff81c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "Visit the parks",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1586190528628-4b7e5c5dd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  //     exploreTitle: "See the bridges",
  //   },
  // ];
  // const restaurants = [
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1596192037609-856730b30078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFyaXMlMjByZXN0YXVyYW50fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  //     restaurantTitle: "Street side",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1630360304828-ec7e999d1d77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
  //     restaurantTitle: "With Eiffel",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1583338917451-face2751d8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
  //     restaurantTitle: "Something sweet",
  //   },
  //   {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1527507320-e38cd6f8e1b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
  //     restaurantTitle: "Royal escape",
  //   },
  // ];
  if (!sideEvents || !hotels)
    return (
      <DashboardLayout>
        <div className="mt-10">
          {/* <div className="h-8 bg-purple-200 w-64 my-8 rounded-full dark:bg-slate-700"></div>
          <div className="flex items-left w-full justify-left">
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
            <div className="h-14 w-14 rounded-full bg-gray-500 mx-4" />
          </div> */}
          <div className="h-8 bg-purple-200 w-64 my-8 rounded-full dark:bg-slate-700"></div>
          <div className="flex items-center w-full justify-start ">
            <div className="h-64 w-40 rounded-lg bg-gray-500 mx-4" />
            <div className="h-64 w-40 rounded-lg bg-gray-500 mx-4" />
          </div>
          <div className="h-8 bg-purple-200 w-64 my-8 rounded-full dark:bg-slate-700"></div>
          <div className="flex items-center w-full justify-start ">
            <div className="h-64 w-40 rounded-lg bg-gray-500 mx-4" />
            <div className="h-64 w-40 rounded-lg bg-gray-500 mx-4" />
          </div>
        </div>
      </DashboardLayout>
    );
  return (
    <DashboardLayout unpadded canSearch>
      <div className="mx-auto mt-8 rounded-lg drop-shadow-lg flex flex-col items-left text-gray-900 pl-4">
        {/* <span className="text-3xl pl-4">What&apos;s happening?</span>
        <div className="flex items-center mt-8 overflow-x-scroll">
          <div className="flex">
            <span className="w-16 grow-0 h-16 mx-2 ml-4 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
            <span className="w-16 grow-0 h-16 mx-2 border-2 border-red-300 rounded-full bg-slate-400"></span>
          </div>
        </div> */}
        <span className="text-3xl flex items-start font-semibold mb-2">
          Places to{" "}
          <span className="flex items-center flex-col">
            <span>🏡Stay</span>
            <ThunderlineBlue />
          </span>
        </span>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="explore-page-swiper"
          slidesPerView={"auto"}
          spaceBetween={16}
        >
          <SwiperSlide>
            <SingleHotelCard imageUrl={HOTEL_IMAGE} />
          </SwiperSlide>
          <SwiperSlide>
            <SingleHotelCard imageUrl={HOTEL_IMAGE} />
          </SwiperSlide>
          <SwiperSlide>
            <SingleHotelCard imageUrl={HOTEL_IMAGE} />
          </SwiperSlide>
          <SwiperSlide>
            <SingleHotelCard imageUrl={HOTEL_IMAGE} />
          </SwiperSlide>
        </Swiper>
        <span className="text-3xl flex items-start font-semibold my-2">
          things to{" "}
          <span className="flex items-center flex-col">
            <span>🎭Do</span>
            <ThunderlinePurple />
          </span>
        </span>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="explore-page-swiper"
          slidesPerView={"auto"}
          spaceBetween={16}
        >
          {sideEvents.map((singleEvent) => {
            return (
              <SwiperSlide key={singleEvent.id}>
                <SingleSideEventCard
                  imageUrl={PARIS_IMAGE}
                  href={`/side-event/${singleEvent.id}`}
                  eventDetails={singleEvent}
                />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>
            <SingleSideEventCard imageUrl={PARIS_IMAGE} />
          </SwiperSlide>
          <SwiperSlide>
            <SingleSideEventCard imageUrl={PARIS_IMAGE} />
          </SwiperSlide>
          <SwiperSlide>
            <SingleSideEventCard imageUrl={PARIS_IMAGE} />
          </SwiperSlide> */}
        </Swiper>
        {/* <div className="flex items-center my-8 overflow-x-scroll">
          <div className="flex">
            {sideEvents.map((singleActivity, index) => {
              return (
                <Link
                  href={`/event/${singleActivity.id}`}
                  key={singleActivity.id}
                  className={
                    index == 0
                      ? "relative h-64 w-40 mx-5 ml-10 overflow-visible"
                      : "relative h-64 w-40 mx-5 overflow-visible"
                  }
                >
                  <img
                    src={PARIS_IMAGE}
                    alt={singleActivity.fields?.Activity}
                    className="rounded-4 w-40 object-cover h-60 drop-shadow-xl"
                  />
                  <span className="drop-shadow-xl text-9xl font-semibold absolute -left-6 bottom-4 text_shadow text-transparent">
                    {index + 1}
                  </span>
                  <span className="drop-shadow-xl text-2xl text_shadow absolute top-1 -right-4">
                    {singleActivity.fields?.Activity}
                  </span>
                </Link>
              );
            })}
          </div>
        </div> */}
        {/* <span className="text-3xl pl-4 mt-8">Book Restaurants</span>
        <div className="flex items-center my-8 overflow-x-scroll">
          <div className="flex">
            {hotels.map((singleActivity, index) => {
              return (
                <div
                  key={singleActivity.id}
                  className={
                    index == 0
                      ? "relative h-64 w-40 mx-5 ml-10 overflow-visible"
                      : "relative h-64 w-40 mx-5 overflow-visible"
                  }
                >
                  <img
                    src={HOTEL_IMAGE}
                    alt={singleActivity.fields?.Name}
                    className="rounded-4 w-40 object-cover h-60 drop-shadow-xl"
                  />
                  <span className="drop-shadow-xl text-9xl font-semibold absolute -left-6 bottom-0 text_shadow text-transparent">
                    {index + 1}
                  </span>
                  <span className="drop-shadow-xl text-2xl text_shadow absolute top-1 -right-4">
                    {singleActivity.fields?.Name}
                  </span>
                  <Link
                    type="tel"
                    href={`tel:${singleActivity.fields?.Contact}`}
                    className="absolute right-2 bottom-6 bg-purple-100 rounded-full p-2 drop-shadow-xl"
                  >
                    <PhoneArrowUpRightIcon width={24} color="rgb(107,33,168)" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </DashboardLayout>
  );
}

export default Explore;
