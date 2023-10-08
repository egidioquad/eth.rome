import {
  Box,
  Center,
  Text,
  Grid,
  Image,
  VStack,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { GrantHubABI } from "../utils/GrantHubABI";
import { ethers } from "ethers";
import { MetaMaskContext } from "../pages/_app";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { checkENSName } from "../utils/ipfsfunctions";
import { create } from "ipfs-http-client";

const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });
export const InfoSection = () => {
  const [cards, setCards] = useState([]);

  // Utilizzando MetaMaskContext per ottenere il provider
  // Assicurati di avere sia il provider che il signer dal tuo context
  const { provider, signer } = useContext(MetaMaskContext);

  const CONTRACT_ADDRESS = "0x9aa70da7902eb50342a0337c0721b8a51f1dfe7c";
  const [proposalIds, setProposalIds] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const GetFileFromIpfs = async (cid: string) => {
      const chunks = [];

      for await (const chunk of ipfs.cat(cid)) {
        chunks.push(chunk);
      }
      console.log("chunks", chunks);
      const textData = new TextDecoder().decode(Buffer.concat(chunks));
      console.log("textData", textData);
      setCards((prevCards) => [...prevCards, textData]);
      const jsonData = [];
      jsonData.push(JSON.parse(textData));
      return jsonData;
    };

    async function fetchProposals() {
      const contractForReading = new ethers.Contract(
        CONTRACT_ADDRESS,
        GrantHubABI,
        provider
      );
      try {
        const test = await contractForReading.getAllProposalIds();
        setProposalIds(test);
        const ProposalIdArray = Object.values(test);

        console.log("Proposal Ids Array:", ProposalIdArray);
        for (const proposalId of ProposalIdArray) {
          const userAddress = await contractForReading.getProposal(proposalId);
          const address = Object.values(userAddress)[1] as string;
          console.log("address", address);
          const hasEnsName = await checkENSName(provider, address);
          console.log("hasEndName", hasEnsName);
          if (hasEnsName) {
            setAddresses((prev) => [...prev, hasEnsName[0]]);
          } else {
            setAddresses((prev) => [...prev, address]);
          }
        }

        console.log("Proposal Ids Array:", ProposalIdArray);
        for (const proposalId of ProposalIdArray) {
          const userAddress = await contractForReading.getProposal(proposalId);
          const address = Object.values(userAddress)[1] as string;
          console.log("address", address);
          const hasEnsName = await checkENSName(provider, address);
          console.log("hasEndName", hasEnsName);
          if (hasEnsName) {
            setAddresses((prev) => [...prev, hasEnsName[0]]);
          } else {
            setAddresses((prev) => [...prev, address]);
          }
          const ipfsHashes = await Promise.all(
            ProposalIdArray.map(async (id) => {
              const proposal = await contractForReading.getProposal(id);
              console.log("proposal", Object.values(proposal));
              return Object.values(proposal)[1];
            })
          );

          console.log("IPFS Hashes:", ipfsHashes);

          const ipfsLinksToFetch = ipfsHashes
            .filter((el) => el.length > 0)
            .map((el) => `https://gateway.pinata.cloud/ipfs/${el}`);
          console.log("ipfsLinksToFetch", ipfsLinksToFetch);
          const fetchAllJsons = ipfsLinksToFetch.map(async (ipfsLink) => {
            try {
              const cidFromUrl = ipfsLink.split("/").pop();
              const clearLink = await GetFileFromIpfs(cidFromUrl);
              console.log(
                `Data fetched for ${cidFromUrl}: ${JSON.stringify(clearLink)}`
              );
              return clearLink;
            } catch (error) {
              console.log(`Failed to fetch data for ${cidFromUrl}: ${error}`);
              return null; // or some default value
            }
          });

          const AllJsonsfromCids = await Promise.all(fetchAllJsons);
          console.log("AllJsonsfromCids", AllJsonsfromCids);

          const validJsonData = AllJsonsfromCids.filter(
            (data) => data !== null
          ); // Remove null values, if any
          setJsonData(validJsonData);

          await Promise.all(AllJsonsfromCids);
          console.log("response FINALE", AllJsonsfromCids);
          const cidFromUrl = ipfsLinksToFetch[0].split("/").pop();
          console.log("cidFromUrl", cidFromUrl);

          for (const ipfsLink of ipfsLinksToFetch) {
            const cidFromUrl = ipfsLink.split("/").pop();
            const ClearLink = await GetFileFromIpfs(cidFromUrl);
            console.log("ClearLink", ClearLink);

            setJsonData((prevJsonData) => [...prevJsonData, ClearLink]);
          }
          const res = [];
          const ipfsDatas = await Promise.all(
            ipfsLinksToFetch.map(async (link) => {
              try {
                const ipfsJson = await fetch(link);
                console.log("ipfsJson", ipfsJson);
                console.log("link", link);
                const json = await ipfsJson.json();
                console.log("json", json);
                res.push(json);
              } catch (e) {
                console.log("error during get from ipfs in InfoSection", e);
              }

              console.log(ipfsDatas);
              setCards(res);
            })
          );
        }
      } catch (err) {
        console.error("Errore nella transazione:", err);
        console.log("Error object:", JSON.stringify(err, null, 2));
        console.log("Proposal Ids:", proposalIds);
      }
    }

    fetchProposals();
  }, [provider]);

  console.log("jsonData LOIFEOIRJGHFIEOIFJEI", jsonData);
  const truncateText = (textData, maxLength) => {
    if (!textData) return ""; // Aggiunto questo controllo
    if (textData.length > maxLength) {
      return textData.substring(0, maxLength) + "...";
    }
    return textData;
  };

  const isMobile = useBreakpointValue({ base: true, sm: true, md: false });
  const renderCards = () => {
    
    const dataToUse = cards.length > 0 ? cards : jsonData;
  
 
    return cards.map((card, index) => {
      let parsedCard = card;
      
      // Controllo se 'card' è una stringa, nel qual caso effettuo il parsing
      if (typeof card === "string") {
        parsedCard = JSON.parse(card);
      }
  
      return (
        <Box
          key={parsedCard.id}
          bg="rgba(177, 0, 239, 0.1)"
          borderRadius="30px"
        >
          <Image
            src="empo.png"
            borderTopLeftRadius="30px"
            borderTopRightRadius="30px"
          />
          <Box
            pl={4}
            pr={4}
            border="2px solid "
            borderWidth="2px"
            borderColor="#1400FF"
            marginTop="-2px"
            borderBottomLeftRadius="30px"
            borderBottomRightRadius="30px"
          >
            <VStack align="stretch" mt={4}>
              <HStack justify="space-between" mt="-8px">
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {isMobile
                    ? truncateText(parsedCard.name + " " + parsedCard.surname, 9)
                    : parsedCard.name + " " + parsedCard.surname}
                </Text>
                <IconButton
                  aria-label="Heart"
                  icon={<FaHeart />}
                  colorScheme="transparent"
                  fontSize={{ base: "20px", md: "30px" }}
                />
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="white">
                  {truncateText(parsedCard.about1, 23)}
                </Text>
                <Text>(123)</Text>
              </HStack>
              <IconButton
                aria-label="Go to project"
                icon={<ArrowForwardIcon />}
                alignSelf="flex-end"
                colorScheme="transparent"
                mb={2}
                fontSize={{ base: "30px", md: "40px" }}
                onClick={() =>
                  (window.location.href =
                    "http://localhost:3000/profile/" +
                    addresses[index] +
                    "?proposalId=" +
                    proposalIds[index])
                }
              />
            </VStack>
          </Box>
        </Box>
      );
    });
  };
  
  
  return (
    <Box bg="black" py={4} width="100%" color="white">
      <Center p={10}>
        <Text fontSize="xl" color="white" maxW={"800px"}>
          Welcome to the future of grant distribution! Fair Grants System breaks
          the barriers of traditional talent discovery by implementing a
          decentralized and unbiased mechanism to select and finance worthy
          projects. Say goodbye to the red tape and let the talent shine!
        </Text>
      </Center>
      <Box mt={6} ml={10} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Explore New Talents
        </Text>
      </Box>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", sm: "repeat(3, 1fr)" }}
        gap={6}
        mt={3}
        mb={7}
        p={4}
      >
        {renderCards()}
      </Grid>
    </Box>
  );
};
