import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Web3Button } from "@web3modal/react";
import ConnectTelegramModal from "@/components/modals/ConnectTelegramModal";
import {
  useAccount,
  useChainId,
  useNetwork,
  useSwitchNetwork,
  // useSignMessage,
} from "wagmi";
import customAxios from "@/utils/axios";
import { useRouter } from "next/router";
import { signMessage } from "@wagmi/core";
import { toast } from "react-toastify";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { BumppLogo } from "@/utils/Icons";

export default function Home() {
  // ! Contexts ****************************************************************************************************************
  const userContext = useContext(UserContext);
  const router = useRouter();
  // ! Hooks ****************************************************************************************************************
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      signMessageForToken(address);
    },
  });
  const chainid = useChainId();
  const network = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // ! Local states ****************************************************************************************************************
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  // ! Local helpers ****************************************************************************************************************
  const signMessageForToken = (address) => {
    console.log("signing start");
    setIsSigning(true);
    customAxios
      .post(
        "/auth/login",
        {
          walletAddress: address,
          isWalletConnect: false,
        },
        { headers: { workspace: "2" } }
      )
      .then((res) => {
        // ! Store the access token on LS
        window.localStorage.setItem("access_token", res.data.access_token);
        // userContext.setUserContext({ isSigned: true });
        if (userContext.telegramDetails) router.replace("/schedule");
        else setIsTelegramModalOpen(true);
        setIsSigning(false);
      })
      // ! Metamsk login by passign the signature error
      .catch((err) => {
        if (err?.response?.status == 403) router.replace("/tickets");
        console.log(
          "\n\nMetamsk login by passign the signature error\n\n",
          err
        );
      });
    // // ! Fetch local token
    // customAxios
    //   .post("auth/metamask", {
    //     publicAddress: account.address,
    //   })
    //   .then((res) => {
    //     console.log("temptoken");
    //     // ! Sign the one time nonce
    //     signMessage({
    //       message: `I am signing my one-time nonce: ${res.data.message}`,
    //     })
    //       .then((signingResponse) => {
    //         console.log("signingResponse", signingResponse);
    //         // ! Metamsk login by passign the signature
    //         customAxios
    //           .post("auth/metamask/login", {
    //             isWalletConnect: false,
    //             token: `Bearer ${res.data.token}`,
    //             signature: signingResponse,
    //           })
    //           .then((res) => {
    //             console.log("meta login resp");
    //             // ! Store the access token on LS
    //             window.localStorage.setItem(
    //               "access_token",
    //               res.data.access_token
    //             );
    //             userContext.setUserContext({ isSigned: true });
    //             router.replace("/schedule");
    //             setIsSigning(false);
    //           })
    //           // ! Metamsk login by passign the signature error
    //           .catch((err) => {
    //             console.log(
    //               "\n\nMetamsk login by passign the signature error\n\n",
    //               err
    //             );
    //           });
    //       })
    //       // ! Sign the one time nonce error
    //       .catch((err) => {
    //         toast.error("Signing failed");
    //         setIsSigning("FAILED");
    //         console.log("\n\nSign the one time nonce error\n\n", err);
    //       });
    //   })
    //   // ! Fetch local token error
    //   .catch((err) => console.log("\n\nFetch local token error\n\n", err));
  };
  // ! Effects ****************************************************************************************************************
  // useEffect(() => {
  //   if (account.isConnected) {
  //     signMessageForToken();
  //   }
  // }, [account.isConnected]);

  useEffect(() => {
    if (switchNetwork && chainid !== 137) switchNetwork(137);
  }, [chainid, switchNetwork]);
  // useEffect(() => {
  //   if (userContext.walletDetails) {
  //     if (userContext.telegramDetails) {
  //       router.replace("/schedule");
  //     } else setIsTelegramModalOpen(true);
  //   }
  // }, [userContext.telegramDetails, userContext.walletDetails]);
  // console.log("\n\naccount\n\n", account.status);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="relative h-screen pt-8 px-4 flex items-center flex-col">
        <BumppLogo />
        <img
          className="w-full h-80 object-cover rounded-lg mt-6"
          src={"/assets/images/daocon-cover.webp"}
          alt="daocon_image"
        />
        <div className="relative mx-auto h-max max-w-7xl py-12 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-0 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className=" text-3xl font-semibold leading-5 text-gray-500">
              Welcome
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              DAOCON Paris 2023
            </p>
            <p className="mt-6 text-base leading-7 text-gray-500">
              The first DAO trade show and the biggest DAO event in 2023{" "}
            </p>
            <div className="mt-8 flex items-center">
              {account.isConnected ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => router.push("/schedule")}
                >
                  Explore DAO-CON
                  <ArrowRightIcon
                    className="-mr-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <Web3Button />
              )}
              {isSigning ? (
                isSigning == "FAILED" ? (
                  <button
                    onClick={() => {
                      mixpanel("generic_button_click", {
                        buttonText: "Sign message for token",
                      });
                      signMessageForToken();
                    }}
                    type="button"
                    className="rounded-lg ml-4 bg-white/40 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                  >
                    Sign again
                  </button>
                ) : (
                  <div role="status" className="ml-4">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
        <ConnectTelegramModal
          open={isTelegramModalOpen}
          setOpen={setIsTelegramModalOpen}
        />
      </div>
    </>
  );
}
