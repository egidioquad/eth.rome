import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { MetaMaskContext } from "../_app";
import ProfilePage from "../../ProfileComponents/ProfilePage";
import { GrantHubABI } from "../../utils/GrantHubABI";

const ContractInfo: React.FC = () => {
  const router = useRouter();
  const { paths } = router.query;
  const { provider } = useContext(MetaMaskContext);
  const userAddress = paths && (paths as string[])[0];
  const CONTRACT_ADDRESS = "0x9Aa70da7902Eb50342A0337C0721b8A51F1Dfe7C";

  const [loading, setLoading] = useState(true); // Loading state
  const [proposalCID, setProposalCID] = useState(""); // State to store the CID
  const [propId, setProposalId] = useState(""); // State to store the CID

  useEffect(() => {
    const fetchProposalCID = async () => {
      try {
        const contractForReading = new ethers.Contract(CONTRACT_ADDRESS, GrantHubABI, provider);
        const proposalId = await contractForReading.getProposalByProposer(userAddress);
        setProposalId(proposalId);
        // Ensure proposalId exists before making the next call
        if (proposalId) {
          const cid = await contractForReading.getProposal(proposalId);
          setProposalCID(cid[1]);
        } else {
          // If proposalId is null or undefined, set cid to null
          setProposalCID(null);
        }
      } catch (error) {
        console.error("Error fetching proposal CID:", error);
        setProposalCID(null); // Set cid to null in case of an error
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    if (userAddress) {
      fetchProposalCID();
    }
  }, [userAddress, provider]);

  return (
    <Box width="100%" height="100vh" backgroundColor="#111111">
      {loading ? (
        <Text color="white">Loading...</Text>
      ) : proposalCID ? (
        <ProfilePage
          provider={provider}
          CID={proposalCID}
          chainId={11155111}
          proposalId={propId}
        />
      ) : (
        <Text color="white">{userAddress} doesn't have any proposal.</Text>
      )}
    </Box>
  );
};

export default ContractInfo;
