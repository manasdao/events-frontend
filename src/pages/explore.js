import DashboardLayout from "@/layouts/DashboardLayout";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import React from "react";

function Explore() {
  const explore = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Photography run",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1541628951107-a9af5346a3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Antique stays",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Arc De Triomphe",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Visit Louvre",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Explore Cafes",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGFyaXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Cycle rides",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1454386608169-1c3b4edc1df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Take the metro",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1619794578892-cbdd3ff81c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "Visit the parks",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1586190528628-4b7e5c5dd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBhcmlzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      exploreTitle: "See the bridges",
    },
  ];
  const restaurants = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1596192037609-856730b30078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFyaXMlMjByZXN0YXVyYW50fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      restaurantTitle: "Street side",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1630360304828-ec7e999d1d77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
      restaurantTitle: "With Eiffel",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1583338917451-face2751d8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
      restaurantTitle: "Something sweet",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1527507320-e38cd6f8e1b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBhcmlzJTIwcmVzdGF1cmFudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60",
      restaurantTitle: "Royal escape",
    },
  ];
  return (
    <DashboardLayout unpadded canSearch>
      <div className="mx-auto mt-10 rounded-lg drop-shadow-lg flex flex-col items-left">
        <span className="text-3xl pl-4">What&apos;s happening?</span>
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
        </div>
        <span className="text-3xl pl-4 mt-8">Top things to do in Paris</span>
        <div className="flex items-center my-8 overflow-x-scroll">
          <div className="flex">
            {explore.map((singleActivity, index) => {
              return (
                <div
                  key={index}
                  className={
                    index == 0
                      ? "relative h-max w-40 mx-5 ml-10 overflow-visible"
                      : "relative h-max w-40 mx-5 overflow-visible"
                  }
                >
                  <img
                    src={singleActivity.imageUrl}
                    alt={singleActivity.exploreTitle}
                    className="rounded-4 w-40 object-cover h-60 drop-shadow-xl"
                  />
                  <span className="drop-shadow-xl text-9xl font-semibold absolute -left-6 bottom-0 text_shadow text-transparent">
                    {index + 1}
                  </span>
                  <span className="drop-shadow-xl text-2xl text_shadow absolute top-1 -right-4">
                    {singleActivity.exploreTitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <span className="text-3xl pl-4 mt-8">Book Restaurants</span>
        <div className="flex items-center my-8 overflow-x-scroll">
          <div className="flex">
            {restaurants.map((singleActivity, index) => {
              return (
                <div
                  key={index}
                  className={
                    index == 0
                      ? "relative h-max w-40 mx-5 ml-10 overflow-visible"
                      : "relative h-max w-40 mx-5 overflow-visible"
                  }
                >
                  <img
                    src={singleActivity.imageUrl}
                    alt={singleActivity.restaurantTitle}
                    className="rounded-4 w-40 object-cover h-60 drop-shadow-xl"
                  />
                  <span className="drop-shadow-xl text-9xl font-semibold absolute -left-6 bottom-0 text_shadow text-transparent">
                    {index + 1}
                  </span>
                  <span className="drop-shadow-xl text-2xl text_shadow absolute top-1 -right-4">
                    {singleActivity.restaurantTitle}
                  </span>
                  <span className="absolute right-2 bottom-2 bg-purple-100 rounded-full p-2">
                    <PhoneArrowUpRightIcon width={24} color="rgb(107,33,168)" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Explore;
