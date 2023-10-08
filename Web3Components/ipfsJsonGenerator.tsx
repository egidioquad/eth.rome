import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Grid,
  Input,
  Textarea,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  Box,
  Image as ChakraImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  FormControl,
  FormLabel,
  ModalCloseButton,
} from "@chakra-ui/react";

import { UploadFileToIpfs, UploadJsonToIPFS } from "../utils/ipfsfunctions";

import Propose from "./web3Buttons/Propose";
import { MetaMaskContext } from "../pages/_app";
import { useContext } from "react";
import { FaImage } from "react-icons/fa";
import PicBannerImg from "../components/PicBannerImg";

// Inside your functional component

interface ProposalData {
  name: string;
  surname: string;
  username: string;
  email: string;
  wallet: string;
  about1: string;
  about2: string;
  website: string;
  linkedin: string;
  X: string;
  imgCid1: string;
  imgCid2: string;
  imgCid3: string;
  imgCid4: string;
}

const IPFSJsonGenerator: React.FC = () => {
  const provider = useContext(MetaMaskContext).provider;
  const [cid, setCid] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageBlob, setImageBlob] = useState<string | null>(null);
  const [imageBlobBanner, setImageBlobBanner] = useState<string | null>(null);
  const { account } = useContext(MetaMaskContext);

  const bannerRef = useRef<HTMLInputElement | null>(null);
  const pfpRef = useRef<HTMLInputElement | null>(null);

  const abt1Ref = useRef<HTMLInputElement | null>(null);
  const abt2Ref = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
  };
  const [grantAmount, setGrantAmount] = useState("");

  const [proposalData, setProposalData] = useState<ProposalData>({
    name: "",
    surname: "",
    username: "",
    email: "",
    wallet: account,
    about1: "",
    about2: "",
    website: "",
    linkedin: "",
    X: "",
    imgCid1: "", //abtu1
    imgCid2: "", // abt u 2
    imgCid3: "", // pfp
    imgCid4: "", //banner
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposalData({
      ...proposalData,
      [name]: value,
    });
  };

  const generateJson = async () => {
    const jsonData = JSON.stringify(proposalData, null, 2);

    console.log("json data", jsonData);
    console.log(isOpen);
    // Upload JSON to IPFS using UploadJsonToIPFS
    const cid = await UploadJsonToIPFS(proposalData);
    console.log("CID:", cid);
    setCid(cid);
  };

  if (!provider) {
    // Handle this case: display an error, return null, etc.
    return <div>Error: MetaMask provider is not available</div>;
  }

  const handleChangeWrapper = (name: string, value: string) => {
    handleChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleImg = async (file: File, int: number) => {
    console.log("uploading");
    let cidImg = await UploadFileToIpfs(file);

    handleChangeWrapper(`imgCid${int}`, cidImg);
    console.log("int", int);
    if (int === 4) {
      const ipfsGatewayUrl = `https://ipfs.io/ipfs/${cidImg}`;
      setImageBlobBanner(ipfsGatewayUrl);
      console.log("imgBlobpbanner", imageBlob);
    } else if (int === 3) {
      const ipfsGatewayUrlpfp = `https://ipfs.io/ipfs/${cidImg}`;
      await setImageBlob(ipfsGatewayUrlpfp);
      console.log("imgBlobpfp", imageBlob);
    }

    return cidImg;
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, int: number) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("int inputchange", int);
      //setSelectedFile(file); // Set the selected file in state
      handleImg(file, int); // Call your handleImg function with the selected file
    }
  };

  const handleGrantAmountChange = (e) => {
    setGrantAmount(e.target.value);
  };

  const multiplyBy10ToThe18 = () => {
    // Parse the current value as a number and multiply by 10^18
    const newValue = parseFloat(grantAmount) * Math.pow(10, 18);
    setGrantAmount(newValue.toString());
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      alignItems="start"
      color="white"
      gap="10px"
      bg="black">
      {/* ----------- BANNER PIC UPLOADER*/}
      <Box
        width="100%"
        height={{ base: "300px", sm: "400px", md: "500px", lg: "600px", xl: "600px" }}
        backgroundColor="rgba(217, 217, 217, 0.35)">
        <div
          onDoubleClick={(e) => {
            bannerRef.current?.click();
          }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={bannerRef}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                await handleImg(file, 4);
              }
            }}
          />

          {imageBlobBanner ? (
            <ChakraImage
              src={imageBlobBanner}
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
      {/* ----------- PFP PIC UPLOADER*/}
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
          onDoubleClick={(e) => {
            pfpRef.current?.click();
          }}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
          }}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={pfpRef}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                await handleImg(file, 3);
              }
            }}
          />

          {imageBlob ? (
            <ChakraImage objectFit="cover" src={imageBlob} width="400px" borderRadius="100%" />
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

      {/* ------- */}

      <Box p={{ base: "50", md: "100" }} w="100%">
        <Text fontSize="4xl" fontWeight="bold" mb={6}>
          Create Your Profile
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6} width="100%">
          <div>
            <Text mb={2}>Nome</Text>
            <Input
              type="text"
              name="name"
              placeholder="Mario"
              onChange={handleChange}
              borderRadius="50px"
              borderColor="#B100EF"
              backgroundColor="rgba(217, 217, 217, 0.35)"
            />
          </div>
          <div>
            <Text mb={2}>Cognome</Text>
            <Input
              type="text"
              name="surname"
              placeholder="Rossi"
              onChange={handleChange}
              borderRadius="50px"
              backgroundColor="rgba(217, 217, 217, 0.35)"
              borderColor="#B100EF"
            />
          </div>
          <div>
            <Text mb={2}>Username</Text>
            <Input
              type="text"
              name="username"
              placeholder="MarioR"
              onChange={handleChange}
              borderRadius="50px"
              backgroundColor="rgba(217, 217, 217, 0.35)"
              borderColor="#B100EF"
            />
          </div>
          <div>
            <Text mb={2}>Email</Text>
            <Input
              type="email"
              name="email"
              placeholder="mario.rossi@example.com"
              onChange={handleChange}
              borderRadius="50px"
              backgroundColor="rgba(217, 217, 217, 0.35)"
              borderColor="#B100EF"
            />
          </div>
        </Grid>
        <Text mb={2} mt={4}>
          About You
        </Text>
        <Box style={{ position: "relative" }} width="100%">
          <Textarea
            name="about1"
            placeholder="Present yourself..."
            rows={3}
            onChange={handleChange}
            borderRadius="30px"
            backgroundColor="rgba(217, 217, 217, 0.35)"
            borderColor="#B100EF"
            style={{
              paddingLeft: "20px", // Adjust the left padding to move the placeholder to the right
              paddingTop: "20px", // Adjust the left padding to move the placeholder to the right
            }}
          />
          <FaImage
            // Replace 'FaIcon' with the actual icon component you're using
            style={{
              position: "absolute",
              bottom: "10px",
              right: "30px",
              cursor: "pointer",
              fontSize: "24px",
            }}
            onClick={(e) => {
              abt1Ref.current?.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={abt1Ref}
            onChange={(e) => handleFileInputChange(e, 1)}
          />
        </Box>
        <Text mb={2} mt={4}>
          About your project
        </Text>
        <Box style={{ position: "relative" }} width="100%">
          <Textarea
            name="about2"
            placeholder="Talk about your project..."
            rows={6}
            onChange={handleChange}
            borderRadius="35px"
            backgroundColor="rgba(217, 217, 217, 0.35)"
            borderColor="#B100EF"
            style={{
              paddingLeft: "20px", // Adjust the left padding to move the placeholder to the right
              paddingTop: "20px", // Adjust the left padding to move the placeholder to the right
            }}
          />
          <FaImage
            // Replace 'FaIcon' with the actual icon component you're using
            style={{
              position: "absolute",
              bottom: "10px",
              right: "30px",
              cursor: "pointer",
              fontSize: "24px",
            }}
            onClick={(e) => {
              abt2Ref.current?.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={abt2Ref}
            onChange={(e) => handleFileInputChange(e, 2)}
          />
        </Box>
        <Text mb={2} mt={4}>
          Website
        </Text>
        <Input
          type="text"
          name="website"
          placeholder="https://example.com"
          onChange={handleChange}
          borderRadius="50px"
          backgroundColor="rgba(217, 217, 217, 0.35)"
          borderColor="#B100EF"
        />
        <Text mb={2} mt={4}>
          Linkedin
        </Text>
        <Input
          type="text"
          name="linkedin"
          placeholder="https://linkedin.com/in/..."
          onChange={handleChange}
          borderRadius="50px"
          backgroundColor="rgba(217, 217, 217, 0.35)"
          borderColor="#B100EF"
        />
        <Text mb={2} mt={4}>
          X
        </Text>
        <Input
          type="text"
          name="X"
          placeholder="X info..."
          onChange={handleChange}
          borderRadius="50px"
          backgroundColor="rgba(217, 217, 217, 0.35)"
          borderColor="#B100EF"
        />
        <HStack>
         
            <Button
              alignSelf="left"
              mt={4}
              borderRadius="50px"
              color="white"
              fontSize="sm"
              fontFamily="'Inter', sans-serif"
              bg="linear-gradient(97.41deg, #1400FF 0%, #B100EF 100%)"
              _hover={{ borderColor: "#867df5" }}
              onClick={() => {
                generateJson();
                setIsOpen(true);
              }}>
              SAVE PROFILE
            </Button>
          )}
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#131313"
          mt="300"
          textColor="white"
          borderRadius="16px"
          border="1px solid"
          borderColor="#1400FF"
          boxShadow="md 2 2 100px #1400FF">
          <ModalHeader>Confirm Proposal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Grant Amount (wei)</FormLabel>
              <HStack>
                <Input
                  borderColor="#1400FF"
                  borderRadius="16px"
                  _hover={{ borderColor: "#867df5" }}
                  type="number"
                  placeholder="Enter the amount you want to receive"
                  value={grantAmount} // Bind the input value to the state
                  onChange={handleGrantAmountChange} // Call the handle function on change
                />
                <Button
                  onClick={multiplyBy10ToThe18}
                  bg="transparent"
                  _hover={{ borderColor: "#867df5" }}
                  color="white"
                  border="1px solid"
                  borderColor="#1400FF"
                  borderRadius="16px">
                  x10^18
                </Button>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Propose
              CID={cid}
              grantAmount={Number(grantAmount)}
              onClick={() => {
                // Close the modal here
                setIsOpen(false);
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default IPFSJsonGenerator;
