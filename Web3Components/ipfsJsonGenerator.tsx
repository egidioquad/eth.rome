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
  //const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<string | null>(null);
  const [imageBlobBanner, setImageBlobBanner] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { account } = useContext(MetaMaskContext);

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

    console.log(jsonData);
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
    const cidImg = await UploadFileToIpfs(file);
    handleChangeWrapper(`imgCid${int}`, cidImg);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, int: number) => {
    const file = e.target.files?.[0];
    if (file) {
      //setSelectedFile(file); // Set the selected file in state
      handleImg(file, int); // Call your handleImg function with the selected file
    }
  };

  const openFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      alignItems="start"
      p={{ base: "50", md: "100" }}
      color="white"
      gap="10px"
      bg="black">
      {/* ----------- BANNER PIC UPLOADER*/}
      <Box
        width="100%"
        height={{ base: "300px", sm: "400px", md: "500px", lg: "600px", xl: "600px" }}
        backgroundColor="rgba(217, 217, 217, 0.35)">
        <div
          onDoubleClick={openFileInput}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const cidImg = handleImg(file, 4);
                const ipfsGatewayUrl = `https://ipfs.io/ipfs/${cidImg}`;
                setImageBlobBanner(ipfsGatewayUrl);
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
          onDoubleClick={openFileInput}
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
            ref={inputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const cidImg = handleImg(file, 3);
                const ipfsGatewayUrl = `https://ipfs.io/ipfs/${cidImg}`;
                setImageBlob(ipfsGatewayUrl);
              }
            }}
          />

          {imageBlob ? (
            <ChakraImage
              objectFit="cover"
              src={imageBlob}
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

      {/* ------- */}

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
            paddingLeft: '20px',  // Adjust the left padding to move the placeholder to the right
            paddingTop: '20px',  // Adjust the left padding to move the placeholder to the right
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
          onClick={openFileInput}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
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
            paddingLeft: '20px',  // Adjust the left padding to move the placeholder to the right
            paddingTop: '20px',  // Adjust the left padding to move the placeholder to the right
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
          onClick={openFileInput}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
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
          onClick={generateJson}>
          SAVE PROFILE
        </Button>
        <Propose CID={cid} />
      </HStack>
    </Flex>
  );
};

export default IPFSJsonGenerator;

/* const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      const logoUri = await UploadImageToIPFS(file);
      setLogoUrl(logoUri);

      // Retrieve image from IPFS
      fetch(https://ipfs.infura.io:5001/api)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setImageSrc(objectURL);
        })
        .catch((error) => {
          console.error("Failed to fetch image from IPFS:", error);
        });

      setUploadingImage(false);
    }
  };
 */
