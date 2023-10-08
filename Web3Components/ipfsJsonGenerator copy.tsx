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
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import { UploadFileToIpfs, UploadJsonToIPFS } from "../utils/ipfsfunctions";
  import Propose from "./web3Buttons/Propose";
  import { MetaMaskContext } from "../pages/_app";
  import { useContext } from "react";
  import { FaImage } from "react-icons/fa";

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
  }

  const IPFSJsonGenerator: React.FC = () => {
    const provider = useContext(MetaMaskContext).provider;
    const [cid, setCid] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [proposalData, setProposalData] = useState<ProposalData>({
      name: "",
      surname: "",
      username: "",
      email: "",
      wallet: "",
      about1: "",
      about2: "",
      website: "",
      linkedin: "",
      X: "",
      imgCid1: "",
      imgCid2: "",
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
        setSelectedFile(file); // Set the selected file in state
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
        Wallet
      </Text>
      <Input
        type="text"
        name="wallet"
        placeholder="0x..."
        onChange={handleChange}
        borderRadius="50px"
        backgroundColor="rgba(217, 217, 217, 0.35)"
        borderColor="#B100EF"
      />

      <Text mb={2} mt={4}>
        About You #1
      </Text>
      <Box style={{ position: "relative" }} width="100%">
        <Textarea
          name="about1"
          placeholder="About you..."
          rows={6}
          onChange={handleChange}
          borderRadius="50px"
          backgroundColor="rgba(217, 217, 217, 0.35)"
          borderColor="#B100EF"
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
        About You #2
      </Text>
      <Box style={{ position: "relative" }} width="100%">
        <Textarea
          name="about2"
          placeholder="About you..."
          rows={6}
          onChange={handleChange}
          borderRadius="50px"
          backgroundColor="rgba(217, 217, 217, 0.35)"
          borderColor="#B100EF"
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
        borderColor="rgba(217, 217, 217, 0.35)"
        backgroundColor="rgba(217, 217, 217, 0.35)"
      />

      <Button
        alignSelf="center"
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
