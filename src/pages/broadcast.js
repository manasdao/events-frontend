import DashboardLayout from "@/layouts/DashboardLayout";
import customAxios from "@/utils/axios";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Broadcast() {
  const { push } = useRouter();
  const [announcementFormDetails, setAnnouncementFormDetails] = useState({
    title: "",
    description: "",
    expiry: 10,
    url: "",
  });
  // ! Local handlers
  const setState = (stateToSet) => {
    setAnnouncementFormDetails({ ...announcementFormDetails, ...stateToSet });
  };
  const handleCreateBroadcast = () => {
    if (!announcementFormDetails.title) toast.error("Title cannot be empty!");
    if (!announcementFormDetails.description)
      toast.error("Description cannot be empty!");
    if (!announcementFormDetails.url) toast.error("Link cannot be empty!");
    customAxios
      .post(
        "/announcement/broadcast",
        {
          title: announcementFormDetails.title,
          description: announcementFormDetails.description,
          expiry: announcementFormDetails.expiry,
          link: announcementFormDetails.url,
        },
        { headers: { workspace: "2" } }
      )
      .then((res) => {
        console.log("announcement create", res.data);
        push("/events");
        toast.success("Broadcast created");
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <DashboardLayout>
      <div className="mt-10">
        <h3 className="text-2xl ">Submit an announcement</h3>
        <div className="mt-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-100"
          >
            Announcement title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Title"
              value={announcementFormDetails.title}
              onChange={(ev) => {
                setState({ title: ev.target.value });
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-100"
          >
            Announcement description
          </label>
          <div className="mt-2">
            <p className="mb-2 text-sm leading-6 text-gray-300">
              Write a few sentences about the announcement.
            </p>
            <textarea
              type="text"
              name="description"
              id="description"
              rows={3}
              className="block w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Description"
              value={announcementFormDetails.description}
              onChange={(ev) => {
                setState({ description: ev.target.value });
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium leading-6 text-gray-100"
          >
            Announcement Link
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Link"
              value={announcementFormDetails.url}
              onChange={(ev) => {
                setState({ url: ev.target.value });
              }}
            />
          </div>
        </div>
        <div className="mt-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <label
            htmlFor="announcement-expiry"
            className="block text-sm font-medium leading-6 text-gray-100 sm:pt-1.5"
          >
            Announcement expiry (in days)
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <select
              id="announcement-expiry"
              name="announcement-expiry"
              autoComplete="announcement-expiry-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={announcementFormDetails.expiry}
              onChange={(ev) => {
                setState({ expiry: +ev.target.value });
              }}
            >
              <option>10</option>
              <option>30</option>
              <option>90</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full inline-flex items-center justify-center gap-x-2 rounded-md bg-indigo-200 px-3.5 py-2.5 text-sm font-semibold text-indigo-800 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCreateBroadcast}
        >
          <MegaphoneIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Broadcast
        </button>
        <p className="mt-4 text-indigo-200 text-sm inline-flex items-start">
          <InformationCircleIcon className="mr-2" width={20} /> Only one
          announcement can be broadcasted by you per event!
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Broadcast;
