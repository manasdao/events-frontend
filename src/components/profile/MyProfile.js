import { UserContext } from "@/contexts/UserContextProvider";
import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import QRCode from "react-qr-code";
function MyProfile() {
  const { userDetails } = useContext(UserContext);
  let myPoaps = [
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
    { iconUrl: userDetails?.profile_picture, poapName: "Poap " },
  ];
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10 rounded-lg drop-shadow-lg">
      <div className="overflow-hidden bg-gradient-to-b from-purple-300 to-purple-950 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex">
            <div className="flex flex-col w-full items-center">
              <img
                src={userDetails?.profile_picture}
                alt=""
                className="w-16 rounded-full shadow-lg drop-shadow-lg"
              />
              <h4 className="text-4xl my-3 text-purple-900 font-bold text-center">
                {userDetails?.first_name} {userDetails?.last_name}
              </h4>
            </div>
            <div className="mb-4 flex justify-center sm:mb-0 sm:mr-4">
              {userDetails && (
                <QRCode value={`https://www.t.me/${userDetails?.user_name}`} />
              )}
            </div>
            <div className="flex items-center mx-auto w-full justify-center">
              <SocialIcon
                url="https://twitter.com/tripathigrows"
                className="mx-4"
              />
              <SocialIcon
                url="https://www.linkedin.com/in/manas-tripathi-dev/"
                className="mx-4"
              />
              <SocialIcon url="https://www.t.me/scotch1998" className="mx-4" />
            </div>
            <div>
              <h4 className="text-lg text-gray-200 font-bold">Bio</h4>
              <p className="mt-1 text-purple-300">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Distinctio commodi vel culpa fugit numquam ratione dolorum
                animi, aperiam minus accusantium!
              </p>
              <h4 className="text-lg text-gray-300 my-2 font-bold">POAPs</h4>
              <div className="overflow-x-scroll flex items-center">
                {myPoaps.map((singlePoap, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center mr-4 "
                    >
                      <img
                        className="w-10 rounded-full"
                        src={singlePoap.iconUrl}
                      />
                      <span className="whitespace-nowrap">
                        {singlePoap.poapName + (index + 1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
