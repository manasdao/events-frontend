import "@/styles/globals.css";
import mixpanel from "mixpanel-browser";
import Head from "next/head";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";
import UserContextProvider from "@/contexts/UserContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  );
}
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  const { theme, setTheme } = useWeb3ModalTheme();
  useEffect(() => {
    setReady(true);
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY, { debug: true });
    window.mixpanel = mixpanel;
    setTheme({
      themeVariables: {
        "--w3m-text-medium-regular-size": "14px",
        "--w3m-z-index": "555",
      },
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <UserContextProvider>
            <ToastContainer
              position={"top-center"}
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              limit={2}
              rtl={false}
              style={{
                width: "calc(100vw - 10px)",
                transform: "translate(5px , 0)",
                boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.4)",
                margin: "5px 0",
              }}
              toastStyle={{
                borderRadius: "8px",
              }}
            />
            <Component {...pageProps} />
          </UserContextProvider>
        </WagmiConfig>
      ) : null}
      <Web3Modal
        defaultChain={polygon}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
