import { Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import TelegramLoginButton from "react-telegram-login";
import { UserContext } from "@/contexts/UserContextProvider";
import { toast } from "react-toastify";
import customAxios from "@/utils/axios";
import { useAccount } from "wagmi";
import { mixpanel } from "@/utils/mixpanel";
import { useRouter } from "next/router";
export default function ConnectTelegramModal({ open, setOpen }) {
  const userContext = useContext(UserContext);
  const { address } = useAccount();
  const { pathname } = useRouter();
  const handleTelegramResponse = (response) => {
    console.log(response);
    customAxios
      .patch(
        "/users/update",
        {
          userName: response.username,
          firstName: response.first_name,
          lastName: response.last_name,
          profilePicture: response.photo_url,
          walletAddress: address,
          telegramId: `${response.id}`,
        },
        { headers: { workspace: "2" } }
      )
      .then((res) => {
        userContext.setUserContext({
          userDetails: res.data[0],
          telegramDetails: response,
        });
        console.log("res", res);
      })
      .catch((err) => console.log("err", err));
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          toast.error("Telegram must be connected");
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <LinkIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Connect Telegram
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The important conversations would happen on Telegram and
                        you would not want to miss those.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-5 sm:mt-6"
                  onClick={() => {
                    mixpanel("connect_telegram", {
                      source_page: pathname,
                      triggered_location: "telegram_modal",
                    });
                  }}
                >
                  <TelegramLoginButton
                    dataOnauth={handleTelegramResponse}
                    botName="daolens_bot"
                    className="w-full"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
