import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

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
];

export default function Example() {
  return (
    <div className=" h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
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
                      <p className="text-base leading-7 text-gray-300">
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
