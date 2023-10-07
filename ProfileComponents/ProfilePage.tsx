import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Text,
  VStack,
  Heading,
  Grid,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  Flex,
  Image as ChakraImage,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  HStack,
  Icon,
  Hide,
} from "@chakra-ui/react";

import {
  FaUser,
  FaEnvelope,
  FaWallet,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaQuestion,
  FaHashtag,
  FaUserCircle,
  FaXRay,
  FaXbox,
} from "react-icons/fa";

import { Header } from "../components/Header"; // Importa il tuo componente header
import { FourGrid } from "../components/FourGrid"; // Importa il tuo componente FourGrid
import IPFSJsonGenerator from "../Web3Components/ipfsJsonGenerator";
import { IpfsData } from "../utils/IpfsJsonData";
import { UploadImageToIPFS } from "../utils/ipfsfunctions";
import { useDropzone } from "react-dropzone";
import ImageUploader from "./ImageUploader";
import ProfilePictureUploader from "./ProfilePictureUploader";
import BannerImageUploader from "./BannerImageUploader";
import PicBannerImg from "../components/PicBannerImg";
import { EmailsSection } from "../components/EmailSection";
import VoteButton from "../Web3Components/web3Buttons/VoteButton";

const ProfilePage: React.FC<{ provider: any; WalletAddress: string; chainId: number }> = ({
  provider,
  WalletAddress,
  chainId,
}) => {
  const [proposalId, setProposalId] = useState("");
  useEffect(() => {
    const urlP = new URLSearchParams(window.location.search);
    const myParam = urlP.get("proposalId");
    console.log("PIPPO", myParam);
    setProposalId(myParam);
  }, []);
  const [file, setFile] = useState<any | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  //  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const [ipfsRes, setipfsRes] = useState(IpfsData);

  const acceptTypes = "image/jpeg, image/png";

  console.log("IpfsData" + JSON.stringify(ipfsRes));
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptTypes,
    onDrop: async (acceptedFiles) => {
      try {
        const file = acceptedFiles[0];
        const ipfsHash = await UploadImageToIPFS(file);
        setIpfsHash(ipfsHash);
        setFile(file);
      } catch (error) {
        console.error("Error in onDrop:", error);
      }
    },
  });

  console.log("WalletAddress" + WalletAddress);
  console.log("chainId" + chainId);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch(
        "https://gateway.pinata.cloud/ipfs/QmaLi97ZbybH99w6T8FDnG3bzpNLVowAvmzL7GRaz7Wu7i"
      );
      // convert the data to json
      const json = await data.json();
      console.log("json", json);
      // set state with the result
      setipfsRes(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      <Box position="fixed" zIndex="234323" top="0" width="100%">
        <Header />
      </Box>
      {/* BANNER IMAGE */}
      <Box
        width="100%"
        height={{ base: "300px", sm: "400px", md: "500px", lg: "600px", xl: "600px" }}
        backgroundColor="rgba(217, 217, 217, 0.35)">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {ipfsRes.imgCid4 ? (
            <ChakraImage
              src={ipfsRes.imgCid4}
              alt="Uploaded Image"
              width="100%"
              height="540px"
              position="relative"
              top="69px"
              objectFit="cover"
            />
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2em",

                width: "100%",
                height: "520px",
                margin: "0",
                top: "80px",
                position: "relative",
              }}>
              +
            </span>
          )}
        </div>
      </Box>

      <Box
        width={{ base: "150px", sm: "200px", md: "250px", lg: "300px" }}
        height={{ base: "150px", sm: "200px", md: "250px", lg: "300px" }}
        border="3px solid #B100EF"
        position="absolute"
        borderRadius="100%"
        top={{ base: "199px", sm: "240px", md: "300px", lg: "360px", xl: "360px" }}
        zIndex="2"
        left={{ base: "30px	", sm: "50px", md: "70px", lg: "100px", xl: "100px" }}
        backgroundColor="#D9D9D9">
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
          }}>
          {ipfsRes.imgCid3 ? (
            <ChakraImage
              objectFit="cover"
              src={ipfsRes.imgCid3}
              alt="Uploaded Image"
              width="400px"
              borderRadius="100%"
            />
          ) : (
            <Box
              objectFit="cover"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="100000px"
              fontSize="2em"
              border="2px solid white"
              width="100%" // Set responsive width
              height="100%" // Height will adjust based on content
              //  pb="100%" // Maintain a fixed aspect ratio (1:1)
              position="absolute" // Needed for maintaining aspect ratio
              top="0">
              +
            </Box>
          )}
        </div>
      </Box>

      {/* gsgs */}
      <VStack spacing="24px" align="start" mb="-30px">
        <Button
          alignSelf="flex-start"
          mt={0}
          borderRadius="50px"
          color="white"
          fontSize="sm"
          fontFamily="'Inter', sans-serif"
          bg="linear-gradient(97.41deg, #1400FF 0%, #B100EF 100%)"
          position="absolute"
          left="70%"
          zIndex="2"
          top={{ base: "300px", sm: "400px", md: "500px", lg: "600px" }}
          mr={40}
          onClick={() => (window.location.href = "http://localhost:3000/createProfile")}>
          Customize
        </Button>
        <Grid
          //mt="-20px"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          width="100%">
          <VStack
            spacing={0}
            position="relative"
            display="flex"
            width="100%"
            height="810px"
            top="-20px"
            backgroundColor="black"
            color="white"
            alignItems="left"
            paddingLeft={{ base: "20px", sm: "40px", md: "60px", lg: "100px", xl: "100px" }}
            paddingTop="70px">
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "lg", sm: "3xl", md: "4xl", lg: "4xl", xl: "4xl" }}
              fontFamily="'Inter', sans-serif">
              <div>{ipfsRes.name + " " + ipfsRes.surname}</div>
            </Text>

            {/*  <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaUser} />
              <div>{"Username: " + IpfsData.username}</div>
            </Text> */}
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaWallet} />
              <div>{ipfsRes.wallet}</div>
            </Text>
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaGithub} />
              <div>{ipfsRes.Github}</div>
            </Text>
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaXbox} />
              <div>{ipfsRes.X}</div>
            </Text>
            {/*    <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaEnvelope} />
              <div>{"Email: " + IpfsData.email}</div>
            </Text> */}
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaGlobe} />
              <div>{ipfsRes.website}</div>
            </Text>
            {/*   <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaLinkedin} />
              <div>{"LinkedIn: " + IpfsData.linkedin}</div>
            </Text> */}
            <Text
              as={HStack}
              padding="10px"
              fontSize={{ base: "sm", sm: "md", md: "lg", lg: "lg", xl: "lg" }}
              fontFamily="'Inter', sans-serif">
              <Icon as={FaHashtag} />
              <div>{"Other Links: " + ipfsRes.other_links}</div>
            </Text>
          </VStack>
          <VStack
            mb={{ base: "28px" }}
            position="relative"
            backgroundColor="black"
            color="white"
            top="-20px"
            alignItems="left"
            paddingTop={{ base: "-170px", md: "80px" }}
            mt={{ base: "-340px", md: "0" }}
            paddingLeft={{ base: "30px", sm: "50px", md: "10px", lg: "0" }}
            sx={{ height: "auto" }}>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="64px"
              lineHeight="77px"
              color="#FFFFFF">
              $443.54
            </Text>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="28px"
              color="#FFFFFF">
              funds raised in the current round
            </Text>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="64px"
              lineHeight="77px"
              color="#FFFFFF">
              124
            </Text>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="28px"
              color="#FFFFFF">
              contributors
            </Text>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="64px"
              lineHeight="77px"
              color="#FFFFFF">
              2 days
            </Text>
            <Text
              fontFamily="'Inter'"
              fontStyle="normal"
              fontWeight="400"
              fontSize="28px"
              color="#FFFFFF">
              left
            </Text>
          </VStack>
        </Grid>

        <Box mt={{ base: "-200px" }} width="100%">
          <Heading as="h3" size="md" color="white">
            About You
          </Heading>
          <Flex
            width="100%"
            backgroundColor="black"
            color="white"
            fontSize="40px"
            position="relative"
            top="0">
            <Grid
              templateColumns={{
                base: "1fr", // Single column layout on small screens
                lg: "repeat(2, 1fr)", // Two columns on large screens
              }}
              backgroundColor="black"
              position="relative"
              top="-97px"
              width="100%"
              paddingTop="200px"
              padding="20px"
              fontSize="3xl"
              gap="20px">
              {/* Prima griglia: Testo */}
              <Box>
                <Text width="100%" align="center" justifyItems="center" mt="20px">
                  <Text>{ipfsRes.about1}</Text>
                </Text>
              </Box>
              {/* Seconda griglia: Immagine con borderRadius in alto a destra */}
              <Box borderTopRightRadius="100px" width="100%">
                {ipfsRes.imgCid1 ? (
                  <Image src="ipfsRes.imgCid1" />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      fontSize: "2em",
                      width: "100%",
                      height: "100%",

                      paddingTop: "125px",
                      paddingBottom: "125px",
                      paddingLeft: "170px",
                      paddingRight: "170px",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}>
                    +
                  </span>
                )}
              </Box>
              {/* Terza griglia: Immagine con borderRadius in basso a sinistra */}
              <Box order={{ base: 2, lg: 1 }}>
                {ipfsRes.imgCid2 ? (
                  <Image src="ipfsRes.imgCid2" />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      fontSize: "2em",
                      width: "100%",
                      height: "100%",

                      paddingTop: "125px",
                      paddingBottom: "125px",
                      paddingLeft: "170px",
                      paddingRight: "170px",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}>
                    +
                  </span>
                )}
              </Box>
              {/* Quarta griglia: Testo */}
              <Box
                width="100%"
                fontSize="3xl"
                bg="black"
                alignItems="center"
                position="relative"
                display="flex"
                order={{ base: 1, lg: 2 }}
                justifyItems="center">
                <Text>{ipfsRes.about2}</Text>
              </Box>
            </Grid>
          </Flex>
        </Box>

        <VStack
          align="stretch"
          width="100%"
          backgroundColor="black"
          color="white"
          position="relative"
          top="-30px">
          <Heading as="h3" size="2xl" pl="30px">
            Top Voters
          </Heading>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={9}
            width="100%"
            backgroundColor="black"
            p={10}>
            {["Voter 1", "Voter 2", "Voter 3", "Voter 4"].map((voter, index) => (
              <Box
                // padding="20px"
                key={index}
                borderRadius="20px"
                borderColor="#1400FF"
                borderWidth="2px"
                backgroundColor="#B100EF1A"
                width="100%"
                height="auto"
                alignContent="center"
                justifyItems="center">
                <VStack margin="20px">
                  <Avatar size="xl" name={voter} margin="20px" />
                  <Text>Name Surname</Text>
                  <Text fontSize="sm">Role in DAO</Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </VStack>
      <Box bg="black" align="center" pt="20" justifyContent="center" h="200">
        <VoteButton proposalId={proposalId} />
      </Box>
      <EmailsSection />
    </>
  );
};

export default ProfilePage;
