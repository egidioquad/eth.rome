import { Button } from "@chakra-ui/react";
import React, { useCallback, useState, useEffect, useContext } from "react";
import { JsonRpcProvider, ethers } from "ethers";
import { IpfsData } from "../../utils/IpfsJsonData";
import SupportModal from "../SupportModal";
import { MetaMaskContext } from "../../pages/_app";
import { GrantHubABI } from "../../utils/GrantHubABI";

interface Web3ButtonProps {
  CID?: string;
  proposalId?: string;
}

const contractAddress = "0x9aa70da7902eb50342a0337c0721b8a51f1dfe7c";

const VoteButton: React.FC<Web3ButtonProps> = (props) => {
  console.log("props", props.proposalId);
  const [proposalId, setProposalId] = useState(props?.proposalId); // Initialize with a default value
  const [support, setSupport] = useState(""); // Initialize with a default value
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { provider, signer } = useContext(MetaMaskContext);
  /*
	support is a uint8 number. 
		we can do it like this -- CURRENTLY HANDLING LIKE THIS
		0: Strongly oppose				0: Strongly oppose	
    1: Oppose									1: a favore
    2: Neutral								2: mi astengo // neutral
    3: Suppo  rt
    4: Strongly support

				x															x																										x
		Support & Abstain / explore al posto di categories / modal to page - - - 2 abt u / vote on profile 
	*/
  const handleVote = async (supportDecision) => {
    try {
      //const response = await fetch("YOUR_IPFS_URL");
      //const data = await response.json();
      //setProposalId(data.proposalId);
      //setSupport(data.support);
      //setProposalId(IpfsData.proposalId);
      console.log("proposalId ricevuto in tasto vote", props.proposalId);
      setProposalId(proposalId);
      setSupport(supportDecision);
    } catch (error) {
      console.error("Error fetching data from IPFS:", error);
      return;
    }
  };
  useEffect(() => {
    if (support !== "") {
      const castVote = async () => {
        if (!provider || !signer) {
          console.error("Provider or signer not available.");
          return;
        }
        console.log("Support value:", support);

        //const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(contractAddress, GrantHubABI, signer);

        try {
          const tx = await contract.castVote(props.proposalId, support);
          await tx.wait();
          console.log("Vote cast successfully!");
        } catch (error) {
          console.error("Error casting vote:", error);
        } finally {
          // Close the modal after handling the vote or if an error occurs
        }
        setIsModalOpen(false);
      };
      castVote();
    }
  }, [support]);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        borderRadius="60px"
        bg="linear-gradient(93.48deg, #1400FF 0%, #B100EF 100%)"
        color="white"
        marginTop="20px"
        // ml="70px"
        fontSize="m"
        height="50px"
        width="150px">
        VOTE
      </Button>
      <SupportModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSupport={handleVote}
      />
    </>
  );
}

export default VoteButton;
/*

import { useContext, useState } from 'react';
import { ethers } from 'ethers';

// Importa il tuo contesto MetaMask o il contesto in cui hai il provider e il signer
const { provider, signer } = useContext(MetaMaskContext);

// Inizializza il contratto con ethers.js
const ContrattoEsempio = new ethers.Contract(
  "Indirizzo_Contratto_Esempio",
  // Array ABI
  [/* ...ABI Array... /],
  provider.getSigner()
);

// Stato per tracciare il caricamento e i dati della transazione
const [isLoading, setIsLoading] = useState(false);
const [transactionData, setTransactionData] = useState(null);
const [isReceiptVisible, setIsReceiptVisible] = useState(false);

// Funzione asincrona per gestire l'esecuzione di una transazione generica
const eseguiTransazione = async (funzioneDelContratto, argomento1, argomento2 /, .../) => {
  // Ottieni l'indirizzo dell'utente
  const userAddress = await signer.getAddress();

  // Stampa parametri per il debug
  console.log("Parametri Debug:", userAddress, argomento1, argomento2 /, ... /);

  try {
    // Esegui la chiamata al contratto
    const tx = await ContrattoEsempio.funzioneDelContratto(argomento1, argomento2 /, .../);

    // Imposta lo stato di caricamento a vero
    setIsLoading(true);

    // Attendi la ricevuta della transazione
    const receipt = await tx.wait();

    // Imposta lo stato di caricamento a falso e salva i dati della transazione
    setIsLoading(false);
    setTransactionData(receipt);
    setIsReceiptVisible(true);

  } catch (error) {
    // Gestisci errori
    setIsLoading(false);
    console.error("Errore:", error);
  }
}; */
