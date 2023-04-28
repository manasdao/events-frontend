import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Listbox, Transition, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  Cog6ToothIcon,
  StarIcon,
  UserCircleIcon,
  XMarkIcon,
  GlobeAltIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  QrCodeIcon,
  PlusCircleIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { Web3Button } from "@web3modal/react";
import { useChainId, useSwitchNetwork, useAccount } from "wagmi";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContextProvider";
import { useRouter } from "next/router";
import { mixpanel } from "@/utils/mixpanel";
import customAxios from "@/utils/axios";
import { giveRandomIcon, linkGenerator } from "@/utils/helpers";
import moment from "moment/moment";
import dynamic from "next/dynamic";
import { BumppLogo } from "@/utils/Icons";
const DynamicQrReader = dynamic(
  () => import("@/components/modals/QRReaderModal"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const navigation = [
  {
    name: "Sponsors",
    href: "/sponsor",
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: "Tickets",
    href: "/tickets",
    icon: TicketIcon,
    current: false,
  },
  { name: "DAO-CON team", href: "/team", icon: UserGroupIcon, current: false },
  { name: "FAQ", href: "/faq", icon: QuestionMarkCircleIcon, current: false },
  // {
  //   name: "Follow ups",
  //   href: "/follow-up",
  //   icon: CalendarIcon,
  //   current: false,
  // },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
let user = { userName: "", userId: "", userEmail: "", walletAddress: "" };
export default function DashboardLayout({
  children,
  currentTab,
  canSearch,
  unpadded,
  hideBottomNav,
  hideChat,
}) {
  // ! Hooks ****************************************************************************************************************
  const router = useRouter();
  const account = useAccount({
    onDisconnect() {
      userContext.logoutUser();
      router.push("/");
    },
  });
  const chainid = useChainId();
  const { switchNetwork } = useSwitchNetwork();

  // ! Contexts ****************************************************************************************************************
  const userContext = useContext(UserContext);
  // ! Local states ****************************************************************************************************************
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchresults, setSearchresults] = useState(null);
  // ! Local helpers ****************************************************************************************************************
  const fetchAnnouncements = () => {
    customAxios
      .get(`/announcement/fetch?newAnnouncements=true`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        setAnnouncements(res.data.announcements);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("announcement err", err);
      });
  };
  const fetchSearchResults = () => {
    let searchType = "";
    if (router.pathname.includes("events"))
      searchType = "&searchType=EVENTS&searchType=SPEAKERS&searchType=SPONSORS";
    if (router.pathname.includes("explore"))
      searchType = "&searchType=EVENTS&searchType=HOTELS&searchType=SPONSORS";

    customAxios
      .get(`/airtable/search?keyword=${searchTerm}${searchType}`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        setSearchresults(res.data);
        console.log("search res", res);
      })
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log("err", err);
      });
  };
  // ! Effects ****************************************************************************************************************

  useEffect(() => {
    if (switchNetwork && chainid !== 137) switchNetwork(137);
  }, [chainid, switchNetwork]);
  // useEffect(() => {
  //   if (account.isDisconnected) {
  //     mixpanel("wallet_disconnecting", {
  //       source_page: router.pathname,
  //       triggered_location: "page",
  //     });
  //     console.log("from here - 1 -- status -- ", account.status);
  //     // router.replace("/");
  //   }
  //   if (account.isConnecting || account.isReconnecting)
  //     mixpanel("wallet_connecting", {
  //       source_page: router.pathname,
  //       triggered_location: "page",
  //     });
  // }, [account]);
  useEffect(() => {
    fetchAnnouncements();
  }, [userContext.pollAnnouncements]);
  // ! Console logs ****************************************************************************************************************
  if (account?.isConnecting || account?.isReconnecting) return;

  return (
    <div className="mb-12">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => {
                        mixpanel("generic_button_click", {
                          buttonText: "Close sidebar",
                        });
                        setSidebarOpen(false);
                      }}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 mt-8 flex-col items-start">
                    <span className="text-3xl font-bold text-gray-700">
                      DAO-CON 2023.
                    </span>

                    <span className="text-lg text-gray-900">
                      Paris, France.
                    </span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                onClick={() => {
                                  mixpanel("sidebar_link_click", {
                                    link: item.href,
                                  });
                                }}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-800 hover:text-gray-900 hover:bg-gray-200",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li
                        className="mt-auto"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Web3Button />
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {userContext?.telegramDetails && !hideChat && (
        <Link
          type="button"
          className="fixed bottom-20 z-[65] right-6 drop-shadow-xl rounded-full bg-gray-600 p-2 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          href={"https://telegram.me/MukundChourey"}
          onClick={() => {
            mixpanel("generic_link_click", {
              linkType: "Open telegram",
              destinationUrl: "https://telegram.me/MukundChourey",
            });
          }}
        >
          <ChatBubbleLeftIcon width={32} />
        </Link>
      )}
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=500"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="fixed top-0 w-full z-40 flex h-12 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {/* <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => {
              mixpanel("generic_button_click", {
                buttonText: "Open sidebar",
              });
              setSidebarOpen(true);
            }}
          >
            <span className="sr-only">Profile</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button> */}
          <Link href={"/profile"}>
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </Link>
          <BumppLogo />
          <div className="flex  ">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {canSearch ? (
                <form className="relative flex w-full" action="#" method="GET">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <div className="relative w-full">
                          <div className="flex items-center justify-between max-w-[100px] h-full">
                            <label htmlFor="search-field" className="sr-only">
                              Search
                            </label>
                            <input
                              id="search-field"
                              className="block h-full w-full border-0 py-0 pl-0 pr-0 text-gray-900 placeholder:text-gray-600 text-sm !focus:border-none !focus-visible:border-none focus:ring-transparent "
                              placeholder="Search"
                              type="search"
                              name="search"
                              value={searchTerm}
                              onChange={(ev) => {
                                setSearchTerm(ev.target.value);
                              }}
                            />
                            <Listbox.Button
                              onClick={fetchSearchResults}
                              className="inline-flex items-center gap-x-1.5 px-2 py-1.5 text-sm font-semibold "
                            >
                              <MagnifyingGlassIcon
                                width={20}
                                aria-hidden="true"
                                color="rgb(17 24 39)"
                              />
                            </Listbox.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="fixed z-10 mt-3 left-[0.5vw] max-h-[450px] w-[99vw] overflow-auto rounded-md bg-white py-1 text-base shadow-xl focus:outline-none sm:text-sm">
                              {searchresults ? (
                                <div>
                                  {searchresults.events && (
                                    <div className="p-4">
                                      <h3 className="text-gray-900 font-semibold text-xl">
                                        Events
                                      </h3>
                                      {searchresults.events.length > 0 ? (
                                        <div>
                                          {searchresults.events.map(
                                            (singleResult) => {
                                              return (
                                                <div
                                                  key={singleResult.id}
                                                  onClick={() => {
                                                    router.push(
                                                      `/event/${singleResult.id}`
                                                    );
                                                  }}
                                                  className="text-gray-800 text-sm border-[1px] border-gray-300 rounded-lg p-2 my-2 flex items-center justify-between"
                                                >
                                                  <span className="flex flex-col items-left">
                                                    <span className="text-lg font-medium">
                                                      {
                                                        singleResult.fields
                                                          .Activity
                                                      }
                                                    </span>
                                                    <span>
                                                      {
                                                        singleResult.fields
                                                          .Location
                                                      }
                                                    </span>
                                                  </span>
                                                  <span>
                                                    {moment(
                                                      singleResult.fields.Start
                                                    ).format("HH:MM A")}
                                                  </span>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 text-sm">
                                          No results for {searchTerm} in Events
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {searchresults.speakers && (
                                    <div className="p-4">
                                      <h3 className="text-gray-900 font-semibold text-lg">
                                        Speakers
                                      </h3>
                                      {searchresults.speakers.length > 0 ? (
                                        <div>
                                          {searchresults.speakers.map(
                                            (singleResult) => {
                                              return (
                                                <div
                                                  key={singleResult.id}
                                                  onClick={() => {
                                                    router.push(
                                                      `/speaker/${singleResult.id}`
                                                    );
                                                  }}
                                                  className="text-gray-800 text-sm border-[1px] border-gray-300 rounded-lg p-2 my-2 flex items-center justify-between"
                                                >
                                                  <span className="flex flex-col items-left">
                                                    <span className="text-lg font-medium">
                                                      {singleResult.fields.Name}
                                                    </span>
                                                    <span>
                                                      {singleResult.fields.Bio}
                                                    </span>
                                                  </span>
                                                  <span></span>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 text-sm">
                                          No results for {searchTerm} in
                                          Speakers
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {searchresults.sponsors && (
                                    <div className="p-4">
                                      <h3 className="text-gray-900 font-semibold text-lg">
                                        Sponsors
                                      </h3>
                                      {searchresults.sponsors.length > 0 ? (
                                        <div>
                                          {searchresults.sponsors.map(
                                            (singleResult) => {
                                              return (
                                                <div
                                                  key={singleResult.id}
                                                  onClick={() => {
                                                    router.push(
                                                      `/sponsor/${singleResult.id}`
                                                    );
                                                  }}
                                                  className="text-gray-800 text-sm border-[1px] border-gray-300 rounded-lg p-2 my-2 flex items-center justify-between"
                                                >
                                                  <span className="flex flex-col items-left">
                                                    <span className="text-lg font-medium">
                                                      {singleResult.fields.Name}
                                                    </span>
                                                    <span>
                                                      {singleResult.fields.Bio}
                                                    </span>
                                                  </span>
                                                  <span></span>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 text-sm">
                                          No results for {searchTerm} in
                                          Sponsors
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {searchresults.hotels && (
                                    <div className="p-4">
                                      <h3 className="text-gray-900 font-semibold text-lg">
                                        Hotels
                                      </h3>
                                      {searchresults.hotels.length > 0 ? (
                                        <div>
                                          {searchresults.hotels.map(
                                            (singleResult) => {
                                              return (
                                                <div
                                                  key={singleResult.id}
                                                  onClick={() => {
                                                    router.push(
                                                      `tel:${singleResult.fields.Contact}`
                                                    );
                                                  }}
                                                  className="text-gray-800 text-sm border-[1px] border-gray-300 rounded-lg p-2 my-2 flex items-center justify-between"
                                                >
                                                  <span className="flex flex-col items-left">
                                                    <span className="text-lg font-medium">
                                                      {singleResult.fields.Name}
                                                    </span>
                                                    <span>
                                                      {
                                                        singleResult.fields
                                                          .Address
                                                      }
                                                    </span>
                                                  </span>
                                                  <span></span>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 text-sm">
                                          No results for {searchTerm} in Hotels
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="w-full flex justify-center">
                                  <div
                                    role="status"
                                    className="w-full animate-pulse flex flex-col items-start bg-gray-100 px-2 pt-4 rounded-lg"
                                  >
                                    <div className="h-6 my-1 bg-gray-200 rounded-full dark:bg-slate-700 w-20"></div>
                                    <div className="h-12 my-1 bg-gray-200 rounded-lg dark:bg-slate-700 w-full mx-auto"></div>
                                    <div className="h-12 my-1 bg-gray-200 rounded-lg dark:bg-slate-700 w-full mx-auto"></div>
                                  </div>
                                </div>
                              )}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </form>
              ) : (
                <div></div>
              )}
              <QrCodeIcon
                width={24}
                color="rgb(17 24 39)"
                onClick={() => {
                  setQrModalOpen(true);
                }}
              />
              {/* <button
                onClick={() => {
                  mixpanel("generic_button_click", {
                    buttonText: "Open announcements",
                  });
                }}
                type="button"
                className="-m-2.5 p-2.5 text-gray-400"
              >
                <span className="sr-only">View notifications</span>
                <Popover className="relative">
                  <Popover.Button className="flex items-center ">
                    <BellIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      color={
                        announcements?.length > 0 ? "rgb(153 27 27)" : "normal"
                      }
                    />
                    {announcements && (
                      <span class="absolute -top-2 left-[70%] z-50 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[8px] font-medium text-red-800">
                        {announcements.length}
                      </span>
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute -right-0 z-10 mt-6 flex w-[92vw] max-w-[360px]">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-lg bg-gray-100 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="flex flex-col items-left w-full pt-2 pb-4">
                          <span className="flex items-center justify-between text-2xl pl-6 my-4 font-semibold text-left text-gray-950">
                            Announcements
                            <button
                              type="button"
                              className="inline-flex mr-4 items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              onClick={() => {
                                router.push("/broadcast");
                                mixpanel("generic_button_click", {
                                  buttonText: "Add broadcast",
                                });
                              }}
                            >
                              <PlusCircleIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              Add new
                            </button>
                          </span>
                          <div className=" max-h-[450px]  overflow-y-scroll">
                            {announcements?.length > 0 &&
                              announcements.map((singleAnnouncement, index) => {
                                return (
                                  <>
                                    <Link
                                      href={
                                        singleAnnouncement.link ||
                                        linkGenerator(
                                          singleAnnouncement.type,
                                          singleAnnouncement.airtableId
                                        )
                                      }
                                      key={singleAnnouncement.id}
                                      className="w-full grid items-center px-4"
                                      style={{
                                        gridTemplateColumns: "1fr 6fr 3fr",
                                      }}
                                      onClick={() => {
                                        mixpanel("generic_link_click", {
                                          linkType: "Open announcement source",
                                          destinationUrl:
                                            singleAnnouncement.link ||
                                            linkGenerator(
                                              singleAnnouncement.type,
                                              singleAnnouncement.airtableId
                                            ),
                                        });
                                      }}
                                    >
                                      <span className="text-2xl">
                                        {giveRandomIcon()}
                                      </span>
                                      <div className="flex flex-col items-left ml-4">
                                        <span className="text-gray-950 text-lg text-left font-medium">
                                          {singleAnnouncement.title}
                                        </span>
                                        <span className="text-gray-600 text-left">
                                          {singleAnnouncement.description}
                                        </span>
                                      </div>
                                      <span className="self-end justify-self-end">
                                        {moment(
                                          singleAnnouncement.createdAt
                                        ).format("HH:MM A")}
                                      </span>
                                    </Link>{" "}
                                    {index !== announcements.length - 1 && (
                                      <hr class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                                    )}{" "}
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </button> */}
              {/* <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              /> */}
            </div>
          </div>
        </div>
        <main className="py-10">
          <div className={unpadded ? "" : "px-4 sm:px-6 lg:px-8"}>
            {children}
          </div>
        </main>
        {!hideBottomNav && (
          <span className="isolate border-0 inline-flex fixed -bottom-0.5 w-screen bg-white shadow-xl border-t border-gray-200">
            <Link
              href={"/events"}
              onClick={() => {
                mixpanel("bottom_nav_link_click", {
                  source_page: router.pathname,
                  destinationUrl: "/events",
                  triggered_location: "bottom_nav",
                });
              }}
              className={`relative justify-center flex-col text-center w-full inline-flex items-center px-3 my-2 text-sm focus:z-10 ${
                currentTab == "Events"
                  ? "font-semibold text-gray-900"
                  : "font-light text-gray-700"
              }`}
            >
              <CalendarIcon
                width={16}
                strokeWidth={currentTab == "Events" ? 3 : 1}
                className="mb-1"
              />
              <span>Events</span>
            </Link>
            <Link
              href={"/explore"}
              onClick={() => {
                mixpanel("bottom_nav_link_click", {
                  source_page: router.pathname,
                  destinationUrl: "/explore",
                  triggered_location: "bottom_nav",
                });
              }}
              className={`relative justify-center flex-col text-center w-full inline-flex items-center px-3 my-2 text-sm focus:z-10 ${
                currentTab == "Explore"
                  ? "font-semibold text-gray-900"
                  : "font-light text-gray-700"
              }`}
            >
              <GlobeAltIcon
                width={16}
                strokeWidth={currentTab == "Explore" ? 3 : 1}
                className="mb-1"
              />
              <span>Explore</span>
            </Link>
            <Link
              href="/announcements"
              onClick={() => {
                mixpanel("bottom_nav_link_click", {
                  source_page: router.pathname,
                  destinationUrl: "/announcements",
                  triggered_location: "bottom_nav",
                });
              }}
              className={`relative justify-center flex-col text-center w-full -ml-px inline-flex items-center px-3 my-2 text-sm font-light focus:z-10 ${
                currentTab == "Announcements"
                  ? "font-semibold text-gray-900"
                  : "font-light text-gray-700"
              }`}
            >
              <BellIcon
                strokeWidth={currentTab == "Announcements" ? 3 : 1}
                width={16}
                className="mb-1"
              />
              <span>Announcement</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                mixpanel("bottom_nav_link_click", {
                  source_page: router.pathname,
                  destinationUrl: "sidebar",
                  triggered_location: "bottom_nav",
                });
                setSidebarOpen(true);
              }}
              className={`relative justify-center flex-col text-center w-full -ml-px inline-flex items-center px-3 my-2 text-sm font-light focus:z-10 ${
                currentTab == "Profile"
                  ? "font-semibold text-gray-900"
                  : "font-light text-gray-700"
              }`}
            >
              <Bars3Icon width={16} className="mb-1" />
              <span>More</span>
            </Link>
          </span>
        )}
      </div>
      <DynamicQrReader open={qrModalOpen} setOpen={setQrModalOpen} />
    </div>
  );
}
