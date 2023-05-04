import { Disclosure } from "@headlessui/react";
import {
  ArrowLeftIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const faqs = [
  {
    question: "What is DAO-CON",
    answer:
      "The first DAO trade show and the biggest DAO event in 2023.\n\nDAOCON started as an idea in 2018 when market was tough and DAOs were few. Luckily, times have changed. DAOs are now everywhere. It's a DAO renaissance. It's time for DAOs to get into the spotlight. That's exactly what DAOCON is about.",
  },
  {
    question: "What's the trade show about?",
    answer:
      "DAOCON is primarily a trade show. Large floor will be filled with exhibition spaces of DAOs showing their products.",
  },
  {
    question: "What's the conference show about?",
    answer:
      "Important part of DAOCON will be stages where DAO knowledge and opinions will be shared openly.",
  },
  {
    question: "Do we get discounts on hotel stays?",
    answer:
      "DAOCON has partnered with Ritz-Carlton and is providing 10% off for all the DAOCON VIP Access attendees",
  },
  {
    question: "Can we connect with the sponsors directly?",
    answer:
      "Sponsors host side events around the city which are a great time to interact with them.",
  },
];

export default function Example() {
  const { back } = useRouter();
  return (
    <div className=" h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8 lg:py-40 text-gray-900">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <div className="flex items-center w-full justify-between mb-8">
            <ArrowLeftIcon
              onClick={back}
              className=""
              width={24}
              strokeWidth={2}
            />
            {/* <ShareIcon className="" width={24} strokeWidth={2} /> */}
            <div></div>
          </div>
          <h2 className="text-2xl font-bold leading-10 tracking-tight">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-2">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-500">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
