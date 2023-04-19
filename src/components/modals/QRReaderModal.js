import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import QrScan from "react-qr-reader";
import QrScanner from "qr-scanner";
import { useRouter } from "next/router";
import customAxios from "@/utils/axios";
import { toast } from "react-toastify";
import { UserContext } from "@/contexts/UserContextProvider";
import { mixpanel } from "@/utils/mixpanel";
function QRReaderModal({ open, setOpen, markAttendance }) {
  const [qrscan, setQrscan] = useState("No result");
  const router = useRouter();
  const userContext = useContext(UserContext);
  const handleScan = (data) => {
    try {
      if (data) {
        setOpen(false);
        mixpanel("qr_scan", {
          source_page: router.pathname,
          triggered_location: "qr_reader",
          data,
          isSuccess: true,
        });
        console.log("qr scan data", data);
        if (markAttendance) {
          let dataToMarkAttendance = JSON.parse(data);
          customAxios
            .post("/events/addattendance", dataToMarkAttendance, {
              headers: { workspace: "2" },
            })
            .then((res) => {
              console.log("addattendance res", res.data);
              setOpen(false);
              mixpanel("mark_attended", {
                source_page: router.pathname,
                triggered_location: "qr_reader",
                isPicked: true,
                eventId: dataToMarkAttendance.eventId,
              });
              toast.success("Marked attendace!");
              userContext.fetchUserProfile();
            })
            .catch((err) => {
              console.log("addattendance err", err);
              setOpen(false);
              // toast.error(err.response.data.error.message);
            });
        } else {
          let dataToConnect = JSON.parse(data);
          console.log(
            "qr scan data in else",
            dataToConnect,
            `${dataToConnect.userId}`
          );
          customAxios
            .post(
              "/users/connect",
              { otherUser: `${dataToConnect.userId}` },
              {
                headers: { workspace: "2" },
              }
            )
            .then((res) => {
              console.log("connect res", res.data);
              setOpen(false);
              toast.success("Connected");
            })
            .catch((err) => {
              console.log("addattendance err", err);
              setOpen(false);
            });
          router.push(data.telegram);
          setOpen(false);
        }
        setQrscan(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleError = (err) => {
    mixpanel("qr_scan", {
      source_page: router.pathname,
      triggered_location: "qr_reader",
      isSuccess: false,
    });
    console.error(err);
  };
  // ! Local helpers

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden  w-full rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <QrScan
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ height: "100%", width: "100%" }}
                />
                <p>{qrscan}</p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default QRReaderModal;
