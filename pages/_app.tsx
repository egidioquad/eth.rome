import React, { createContext, useContext, useState, useEffect } from "react";
import { ChakraProvider, Button, Input, Flex, Box, IconButton, Tooltip } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import "../index.d.ts";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "./providers";

export const MetaMaskContext = createContext<{
  account: string | null;
  provider: Web3Provider | null;
  signer: ethers.Signer | null;
  connectToMetaMask: () => void;
  disconnectFromMetaMask: () => void;
  switchChain: (chainId: string) => void;
}>({
  account: null,
  provider: null,
  signer: null,
  connectToMetaMask: () => {},
  disconnectFromMetaMask: () => {},
  switchChain: () => {},
});

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const providerInstance = new Web3Provider(window.ethereum);
      setProvider(providerInstance);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signerInstance = providerInstance.getSigner();
        setSigner(signerInstance);
        const connectedAccount = await signerInstance.getAddress();
        setAccount(connectedAccount);
        console.log("account set:", account);
      } catch (error) {
        console.error("Errore nel collegamento a MetaMask:", error);
      }
    }
  };

  const disconnectFromMetaMask = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  const switchChain = async (chainId: string) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (error) {
        console.error("Errore nel cambio di chain:", error);
      }
    }
  };
  useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // MetaMask è bloccato o l'utente ha disconnesso tutti gli account
        disconnectFromMetaMask();
      } else {
        const newAccount = accounts[0];
        setAccount(newAccount);
      }
    };

    const handleChainChanged = async (chainId: string) => {
      // Gestisci il cambiamento della catena se necessario
      switchChain(chainId);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <MetaMaskContext.Provider
            value={{
              account,
              provider,
              signer,
              connectToMetaMask,
              disconnectFromMetaMask,
              switchChain,
            }}>
            <Wallet />
            <Component {...pageProps} />
          </MetaMaskContext.Provider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

function Wallet() {
  const { account, signer, connectToMetaMask, disconnectFromMetaMask, switchChain } =
    useContext(MetaMaskContext);

  useEffect(() => {
    // Auto-connect to MetaMask if user has previously connected
    if (localStorage.getItem("autoConnect") === "true") {
      connectToMetaMask();
    }
  }, []);

  const handleConnect = () => {
    localStorage.setItem("autoConnect", "true");
    connectToMetaMask();
  };

  const handleDisconnect = () => {
    localStorage.setItem("autoConnect", "false");
    disconnectFromMetaMask();
  };

  if (!signer) {
    return (
      <Flex
        justify="flex-end"
        top="4"
        position="fixed"
        zIndex="23436789876567898765678765243"
        right="4%">
        <Button
          onClick={handleConnect}
          color="white"
          bg="linear-gradient(97.41deg, #1400FF 0%, #B100EF 100%)"
          borderRadius="50"
          // variant="outline"
          size="md">
          Connect
        </Button>
      </Flex>
    );
  }

  return (
    <Flex>
      {account ? (
        <Flex
          justify="flex-end"
          top="4"
          position="fixed"
          zIndex="12321234321232123212321232"
          right="4%">
          <Button
            onClick={handleDisconnect}
            zIndex="12321234321232123212321232"
            color="white"
            bg="linear-gradient(97.41deg, #1400FF 0%, #B100EF 100%)"
            borderRadius="50"
            //variant="outline"
            size="md">
            Disconnect
          </Button>
        </Flex>
      ) : (
        <Tooltip label="Connect to MetaMask" aria-label="Connect tooltip">
          <IconButton aria-label="Connect wallet" onClick={handleConnect} />
        </Tooltip>
      )}
    </Flex>
  );
}

export default MyApp;
