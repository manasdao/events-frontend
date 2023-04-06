import React from "react";
import { Fragment } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
function EventsFeed({ eventsTitle }) {
  const activity = [
    {
      eventDayTimestamp: "1680675050026",
      events: [
        {
          id: 1,
          type: "mainEvent",
          eventTime: "1680677150026",
          eventTitle: "Can DAOs shape the future?",
          eventDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
          eventVenue: "Paris, France.",
          people: [
            { name: "Manas Tripathi", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
          ],
          mainEventImageUrl:
            "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80",
          smallImageUrl:
            "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
          id: 2,
          type: "sideEvent",
          eventTime: "1680697150026",
          eventTitle: "A walk around the Eiffel Tower with the DAO-CON team!",
          eventDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
          eventVenue: "Paris, France.",
          people: [
            { name: "Manas Tripathi", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
          ],
          sideEventImageUrl:
            "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          smallImageUrl:
            "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
      ],
    },
    {
      eventDayTimestamp: "1680761031568",
      events: [
        {
          id: 1,
          type: "mainEvent",
          eventTime: "1680677150026",
          eventTitle: "Can DAOs shape the future?",
          eventDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
          eventVenue: "Paris, France.",
          people: [
            { name: "Manas Tripathi", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
          ],
          mainEventImageUrl:
            "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3269&q=80",
          smallImageUrl:
            "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
          id: 2,
          type: "sideEvent",
          eventTime: "1680697150026",
          eventTitle: "A walk around the Eiffel Tower with the DAO-CON team!",
          eventDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
          eventVenue: "Paris, France.",
          people: [
            { name: "Manas Tripathi", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
            { name: "Eduardo Benz", href: "#", userName: "", iconUrl: "" },
          ],
          sideEventImageUrl:
            "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
          smallImageUrl:
            "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
      ],
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flow-root mt-12">
      <p className="text-4xl">{eventsTitle}</p>
      <ul role="list" className="-mb-8">
        {activity.map((singleDay, dayIndex) => {
          return (
            <>
              <div className="my-8">
                <span className="text-3xl">
                  {moment(+singleDay.eventDayTimestamp).format("DD MMM, YYYY")}
                </span>
              </div>
              {singleDay.events.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id}>
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
                      {activityItem.type === "mainEvent" ? (
                        <>
                          <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-300 ">
                              <img
                                className="rounded-full h-10 w-10"
                                src={activityItem.smallImageUrl}
                                alt=""
                              />
                            </div>

                            <span className="absolute -bottom-3 text-2xl -right-1 rounded-tlpx-0.5 py-px">
                              ⚡️
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-lg">
                                <p className="font-medium text-gray-100">
                                  {activityItem.eventTitle}
                                </p>
                              </div>
                              <p className="mt-1.5 text-sm text-gray-300">
                                By{" "}
                                <span className="inline-flex mx-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                                  {activityItem.people[0].name}
                                </span>{" "}
                                {activityItem.people.length > 1 ? (
                                  <>
                                    and{" "}
                                    <span className="inline-flex ml-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                                      {activityItem.people.length - 1} others
                                    </span>
                                  </>
                                ) : null}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-400">
                              <img
                                className="my-4 object-cover w-full rounded-lg"
                                src={activityItem.mainEventImageUrl}
                                alt={activityItem.eventTitle}
                              />
                              <p className="my-1 mt-2 text-2xl text-purple-200">
                                {moment(+activityItem.eventTime).format(
                                  "HH:MM A"
                                )}
                              </p>
                              <p className="my-1 text-2xl text-purple-200">
                                {activityItem.eventVenue}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : activityItem.type === "sideEvent" ? (
                        <>
                          <div>
                            <div className="relative">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-300 ">
                                <img
                                  className="rounded-full h-10 w-10"
                                  src={activityItem.smallImageUrl}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 py-1.5">
                            <div className="text-sm text-gray-400">
                              <div className="text-lg">
                                <p className="font-medium text-gray-100">
                                  {activityItem.eventTitle}
                                </p>
                              </div>
                              <p className="mt-1.5 text-sm text-gray-300">
                                By{" "}
                                <span className="inline-flex mx-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                                  {activityItem.people[0].name}
                                </span>{" "}
                                {activityItem.people.length > 1 ? (
                                  <>
                                    and{" "}
                                    <span className="inline-flex ml-1 items-center rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-800">
                                      {activityItem.people.length - 1} others
                                    </span>
                                  </>
                                ) : null}
                              </p>
                              <div className="mt-2 text-sm text-gray-400">
                                <img
                                  className="my-4 object-cover w-full rounded-lg"
                                  src={activityItem.sideEventImageUrl}
                                  alt={activityItem.eventTitle}
                                />
                                <p className="my-1 mt-2 text-2xl text-purple-200">
                                  {moment(+activityItem.eventTime).format(
                                    "HH:MM A"
                                  )}
                                </p>
                                <p className="my-1 text-2xl text-purple-200">
                                  {activityItem.eventVenue}
                                </p>
                              </div>
                              <span className="whitespace-nowrap">
                                {/* {activityItem.date} */}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default EventsFeed;
