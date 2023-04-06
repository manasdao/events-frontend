import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition, Popover } from "@headlessui/react";
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
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Web3Button } from "@web3modal/react";
import { useChainId, useSwitchNetwork, useAccount, useNetwork } from "wagmi";
import Link from "next/link";
// import daocon_image from "../assets/images/daocon-cover.webp";
const navigation = [
  { name: "Explore", href: "/explore", icon: GlobeAltIcon, current: false },
  { name: "DAO-CON team", href: "/team", icon: UserGroupIcon, current: false },
  { name: "FAQ", href: "/faq", icon: QuestionMarkCircleIcon, current: false },
  {
    name: "Follow ups",
    href: "/follow-up",
    icon: CalendarIcon,
    current: false,
  },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
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
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const account = useAccount();
  const chainid = useChainId();
  const network = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  console.log("wagmi", account);
  useEffect(() => {
    if (switchNetwork && chainid !== 137) switchNetwork(137);
  }, [chainid, switchNetwork]);

  if (account?.isConnecting || account?.isReconnecting) return;
  if (account.isDisconnected)
    return (
      <div className="relative h-screen">
        <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src={"/assets/images/daocon-cover.webp"}
            alt="daocon_image"
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto h-max max-w-7xl py-12 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Welcome
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              DAOCON Paris 2023
            </p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              The first DAO trade show and the biggest DAO event in 2023
            </p>
            <div className="mt-8">
              <Web3Button className="button" />
            </div>
          </div>
        </div>
      </div>
    );
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
                      onClick={() => setSidebarOpen(false)}
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
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
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

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
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
        <div className="fixed top-0 w-full shadow-xl z-40 flex h-12 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 justify-between self-stretch lg:gap-x-6">
            {canSearch ? (
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
                  placeholder="Looking for something?"
                  type="search"
                  name="search"
                />
              </form>
            ) : (
              <div></div>
            )}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {/* <Popover className="relative">
                  <Popover.Button>
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
                    <Popover.Panel className="absolute -right-0 z-10 mt-6 flex w-[92vw] max-w-max ">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-purple-100 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="block">
                          <nav className="flex space-x-4" aria-label="Tabs">
                            <a
                              key={"Host"}
                              href={"#"}
                              className={classNames(
                                true
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "text-gray-500 hover:text-gray-700",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={true ? "page" : undefined}
                            >
                              Host
                            </a>
                            <a
                              key={"Event"}
                              href={"#"}
                              className={classNames(
                                false
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "text-gray-500 hover:text-gray-700",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={false ? "page" : undefined}
                            >
                              Event
                            </a>
                          </nav>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Sint exercitationem eligendi similique excepturi
                          tenetur totam incidunt ipsam quasi praesentium
                          molestiae, eveniet, asperiores impedit enim. Enim
                          tempora impedit officia natus non.
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover> */}
              </button>
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <main className="py-10">
          <div className={unpadded ? "" : "px-4 sm:px-6 lg:px-8"}>
            {children}
          </div>
        </main>
        <span className="isolate border-0 inline-flex fixed -bottom-0.5 w-screen bg-slate-500 shadow-xl">
          <Link
            href={"/"}
            className={`relative border-r border-gray-400 justify-center flex-col text-center w-full inline-flex items-center px-3 my-2 text-sm text-white focus:z-10 ${
              currentTab == "Schedule" ? "font-semibold" : "font-light"
            }`}
          >
            <StarIcon
              color="#ffffff"
              width={16}
              strokeWidth={currentTab == "Schedule" ? 3 : 1}
              className="mb-1"
            />
            <span>Schedule</span>
          </Link>
          <Link
            href={"/events"}
            className={`relative border-r border-gray-400 justify-center flex-col text-center w-full inline-flex items-center px-3 my-2 text-sm text-white focus:z-10 ${
              currentTab == "Events" ? "font-semibold" : "font-light"
            }`}
          >
            <StarIcon
              color="#ffffff"
              width={16}
              strokeWidth={currentTab == "Events" ? 3 : 1}
              className="mb-1"
            />
            <span>Events</span>
          </Link>

          <Link
            href="/profile"
            className={`relative justify-center flex-col text-center w-full -ml-px inline-flex items-center px-3 my-2 text-sm font-light text-white focus:z-10 ${
              currentTab == "Profile" ? "font-semibold" : "font-light"
            }`}
          >
            <UserCircleIcon
              color="#ffffff"
              strokeWidth={currentTab == "Profile" ? 3 : 1}
              width={16}
              className="mb-1"
            />
            <span>Profile</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
