import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { SocialIcon } from "react-social-icons";

const people = [
  // More people...
  {
    name: "Griff Green",
    role: "Founder at Giveth",
    twitter: "https://twitter.com/thegrifft",
    imageUrl:
      "https://v5.airtableusercontent.com/v1/16/16/1682690400000/NSPKOAIUl_2R9Ru2ikS5KQ/mK40Tjfr2RIdJDbP94oN8DYmDu3TXU3D8HwZHsAEMvzj6Emzplp_NY12dAaF0K5O9e0xQaK7zJLBcCqSnRB-FoSK0PIuHWZH96teDcc9iKEdISRoI3MuzJg9xCAeUujHK6rhjjtF9oe_9E6crjwBrekruaWMMRpSkldsuBi7_-WamQiU3x_MnaX-CBjB8pZcrufTkqDmCPzbm2jwWh00EcB97JNSDfjbuK9D68hWf7gfQ53ORo1kgllW1a4hANbPMoUzN0SxIA-4N3WRH7LNzyGnxuo_P6RiMSXP3GFzKFBS4f6im0D7J6jDJJ98g3HhewomEZnUw6xW36ksXcYWRw/0nEWSViNEg8buQi1GE_xzNNd-40p11RnAcxxnpjkJ5Q",
  },
  {
    name: "Julien Bouteloup",
    role: "Founder at Stake Capital Group",
    twitter: "https://twitter.com/bneiluj",
    imageUrl:
      "https://v5.airtableusercontent.com/v1/16/16/1682690400000/3I1NQX82AuHEH58wg5bZeQ/Am2yxq9pAm5BO1TSI6kWrMkBQdMdQRoXu66U7fB1EG7fV-LkrSSwpQenSk5Eelhr-pA1Mm2wYlH4Np27-Uw_l-g698jvW8I-o8flL2VKVtz-enqyf_X_2qu9TiaW1LKLnpC9Ax6fcCcvecJF-0SIa-iB788cS9ZCi_jMOwdpCsgMPLg2kwVO7FUN44XoYfDg6CL4bOTAdoz3GibfbRpvG2lMZX1-cGqVH16YYe_ogA0qg0Zql1JuyyEvwCeGMzO_YM7Z3O8XhnnXj9QEm6Vu35CEyLJsW1zS8xO-h_NRB61Ss2W8iAbunyh16PVmN3AuSa2HE6TjNm2yZD_PlpTrEQ/xi7ji9-_VyxMq7DGTZFzQwz79eOW0QTk_gOQF9sXI1o",
  },
  {
    name: "Ivan Fartunov",
    role: "Head of ecosystem at Aragon",
    twitter: "https://twitter.com/TheTakenUser",
    imageUrl:
      "https://v5.airtableusercontent.com/v1/16/16/1682690400000/JUT8r3QAX_bDRw-313pfJQ/FpUqeiifvzhQpKj0BqXJpWKpzzFhYcZHTomVJyXMH_qZl11df8bOTgXOFREjs1N_8-XbhCxklsNp4pjU-KY8mAZJKnql2ubqwj33fC8-lnrAJaT7we6x4LfTbkOgRRGIjcXyR7W7S7NccR8kj5TcEVD-QujqtXIoingosgoifNubQ5pEqvIZ6cHisny80M1EARCalSHDHFWV-zAalBgPrcViTBqyd0k5YjgWnY_bFX3Px5rtK_fRIUS5uG3N6htE6PsxPuA6JIkvBv9msNE4WqIZHjrYDvt9VPo_izP3H1kz51Y7K6BxKea-rv8GXRtwOf8d34W94-9j1SXUJjnCGw/M_npoG6PBN85ubHhra2-mWBBSOc8t7eVs2GGq0b_0oA",
  },
  {
    name: "Bobby Bola",
    role: "Governance lead at StableLab",
    twitter: "https://twitter.com/bobbay_b",
    imageUrl:
      "https://v5.airtableusercontent.com/v1/16/16/1682690400000/pNpYfoGUMwD12dHrfBBHTQ/mGxazLe_4qOtBeFs8PK2x1s7GF0rK2QLr30Q3ZRrc3tHNS7QYmFuYHwOJwuCNMbD9ylY9AlQTm8EdbZC4ZUVzLQuwHlkHZiqyQktkJ6mZTLpKi0JgjaJo7m-cWQKolDGRnbiRz7KllJp0ENCpPCmOWQd9N0TkGpF2Wq4X7XmjJV7rgwZec3WNQ_bg4eZ808-esPKf8nhxuLhscfQjiw_7q18PVFgfA97wgQTm05L9qHajnLcal68yZYo4CXtbYzDKsT0qIP6x7hVQEXj5unCgqA9ti-J7fK_VESWzYNeeKT42EsiUk6ZiGknw-57g7wU0_BVEVfbUtJHeZ79dAeyOw/EgWh8hFug5v1fa6pCfu7ZUmAMJ5yDFpZmpZWtNPjxuw",
  },
  {
    name: "Christina Frankopan",
    role: "Blockchain financial advisory",
    twitter: "https://twitter.com/nichnachnoch",
    imageUrl:
      "https://v5.airtableusercontent.com/v1/16/16/1682690400000/UsULaccwJ8zu8_ieeVze0w/gUAHM7qmQ7Ym4iVzwtDtFrl2sswlZ_QtuXh4U0c0ySZFtS2j2JkWj8KYaxgwJuc9NN4XOYBx0RqYDhV0YKq3GO-lOBLHzH9JMfUHx14deBzcSA8yFll4s5EsD5E9fJAOoarTQk9yXypSpTM27aCpSf2iOVGTjBNzB3ugguBh-pgfJBngNIs3GA4hMQ0OBNBjVYYyr7FmPYzn_ZAfN4T1gL-Es-NrZmBVBeLcAlkdQowU2q_bJH1lFAJC3A2NftusVSzSqzJ1oY3f_sCXk-9gvi1xmoVFG15h6nVy4humVJ6vmOf_JzQC0lGUAmPDdI2aoDLM3KWGqBLxHNq9A1ilnA/mBXkDZOGDs5dshuFPHosxVZ5JMXHOjxzb7n7tH2MKgM",
  },
];

export default function Example() {
  const { back } = useRouter();
  return (
    <div className="h-screen pt-8 sm:py-32 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {people.map((person) => (
            <li key={person.name}>
              <img
                className="mx-auto h-24 w-24 rounded-full object-cover object-center"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
                <SocialIcon
                  url={person.twitter}
                  style={{ width: "16px", height: "16px", marginLeft: "8px" }}
                />
              </h3>
              <p className="text-sm leading-6 text-gray-500">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
