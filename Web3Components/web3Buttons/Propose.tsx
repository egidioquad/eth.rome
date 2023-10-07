import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { MetaMaskContext } from "../../pages/_app";
import { GrantHubABI } from "../../utils/GrantHubABI";
import { ERC20ABI } from "../../utils/GrantHubABI";

interface Web3ButtonProps {
  CID: string;
}
const CONTRACT_ADDRESS = "0x9aa70da7902eb50342a0337c0721b8a51f1dfe7c";



const Propose: React.FC<Web3ButtonProps> = ({  CID }) => {
  console.log("Cid ricevuto" + CID)
  const [isOpen, setIsOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
const signer = useContext(MetaMaskContext).signer;
const provider = useContext(MetaMaskContext).provider;
  const [grantAmount, setGrantAmount] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (CID) {
      setDescription(CID);
    }
  }
  , [CID]);
  

  const propose = async () => {
    try {
      const tokenAddress = "0xFEd4CEB5D41d426e0f95f5D6e28c664B2b3f8Fd6";
      const token = new ethers.Contract(tokenAddress, ERC20ABI, signer);
      const teamAddress = await signer.getAddress();
      const transferCalldata = token.interface.encodeFunctionData("transfer", [
        teamAddress,
        grantAmount,
      ]);
  
      const targets = [tokenAddress];
      const values = [0];
      const calldatas = [transferCalldata];
  
      const contract = new ethers.Contract(CONTRACT_ADDRESS, GrantHubABI, signer);

      const data = contract.interface.encodeFunctionData("propose", [targets, values, calldatas, description]);
  
      const tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESS,
        data
      });
      const receipt = await tx.wait();
      console.log("Receipt: ", receipt.confirmations);

      if (receipt.confirmations >= 1) {
        console.log("Transaction confirmed");
      } else {
        console.log("Transaction not confirmed yet");
      }
      contract.removeAllListeners("ProposalCreated");

      console.log("Proposal created successfully");
    } catch (error) {
      console.error("Error in proposing:", error);
    }
  };
  
  

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);


  
  useEffect(() => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GrantHubABI, signer);
  
    // Listen for ProposalCreated events
    const listener = contract.on("ProposalCreated", (proposalId, proposer, targets, values, signatures, calldatas, voteStart, voteEnd, description) => {
      console.log(`Proposal Created: 
        - Proposal ID: ${proposalId}
        - Proposer: ${proposer}
        - Targets: ${targets}
        - Values: ${values}
        - Signatures: ${signatures}
        - Calldatas: ${calldatas}
        - Vote Start: ${voteStart}
        - Vote End: ${voteEnd}
        - Description: ${description}`);
    });
  console.log("Listener: ", listener);  
    // Cleanup listener when component is unmounted
    return () => {
      contract.removeAllListeners("ProposalCreated");

    };
  }, []);
  
  // ...rest of your code
  

  

  return (
    <>
      <Button 
        onClick={onOpen}
        borderRadius="50px"
        bg="linear-gradient(93.48deg, #1400FF 0%, #B100EF 100%)"
        color="white"
        marginTop="20px"
        marginLeft="5px"
        // ml="70px"
        fontSize="15px"
        height="38px"
        width="130px"
        alignSelf="left"
        mt={4}
        fontFamily="'Inter', sans-serif">
        PROPOSE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Propose</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         
            <FormControl>
              <FormLabel>Grant Amount</FormLabel>
              <Input
                type="number"
                placeholder="Enter grant amount"
                onChange={(e) => setGrantAmount(e.target.value)}
              />
            </FormControl>
           
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={propose}>
              Confirm Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Propose;

//https://sepolia.etherscan.io/writecontract/index?m=light&v=21.10.1.1&a=0xd548b6e543c84dc1613c6e04bf23938a2795e321&n=sepolia&p=#collapse11
