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

export default function Home() {
  // ! Contexts ****************************************************************************************************************
  const userContext = useContext(UserContext);
  const router = useRouter();
  // ! Hooks ****************************************************************************************************************
  const account = useAccount();
  const chainid = useChainId();
  const network = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // ! Local states ****************************************************************************************************************
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  // ! Local helpers ****************************************************************************************************************
  const signMessageForToken = () => {
    console.log("signing start");
    setIsSigning(true);
    customAxios
      .post(
        "/auth/login",
        {
          walletAddress: account.address,
          isWalletConnect: false,
        },
        { headers: { workspace: "2" } }
      )
      .then((res) => {
        console.log("meta login usercontext", userContext);
        // ! Store the access token on LS
        window.localStorage.setItem("access_token", res.data.access_token);
        userContext.setUserContext({ isSigned: true });
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
  useEffect(() => {
    if (account.isConnected) {
      signMessageForToken();
    }
  }, [account.isConnected]);

  useEffect(() => {
    if (switchNetwork && chainid !== 137) switchNetwork(137);
  }, [chainid, switchNetwork]);
  useEffect(() => {
    if (account.isConnected) {
      if (userContext.telegramDetails) {
        router.replace("/schedule");
      } else setIsTelegramModalOpen(true);
    }
  }, [userContext.telegramDetails]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

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
            <div className="mt-8 flex items-center">
              <Web3Button />
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
