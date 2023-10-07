import React from "react";
import { Header } from "../components/Header";
import PicBannerImg from "../components/PicBannerImg";
import IPFSJsonGenerator from "../Web3Components/ipfsJsonGenerator";
import { Box, VStack } from "@chakra-ui/react";

const createProfile = () => {
  return (
    <>
      <Box position="fixed" zIndex="234323" top="0" width="100%">
        <Header />
      </Box>
      <VStack align="start" mb="-30px">
        {/* <Box width="100%">
          <PicBannerImg />
        </Box> */}
        <Box bg="black" width="100%">
          <IPFSJsonGenerator />
        </Box>
      </VStack>
    </>
  );
};

export default createProfile;

/* export const UploadImageToIPFS = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const result = await ipfs.add(Buffer.from(fileBuffer));
  console.log('File uploaded:', result);
  return result.path;

}; */
