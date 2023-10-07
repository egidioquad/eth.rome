import { Box, Button, HStack, Heading, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { EmailsSection } from "../components/EmailSection";
import { Header } from "../components/Header";
import PicBannerImg from "../components/PicBannerImg";
import { IpfsData } from "../utils/IpfsJsonData";
import { FaUser, FaXbox } from "react-icons/fa";
import { MouseEventHandler, useState } from "react";
import VoteButton from "../Web3Components/web3Buttons/VoteButton";

const cartPerson = () => {
  const [cards, setCards] = useState([]);
  const deleteFromCart: MouseEventHandler<SVGElement> = (event) => {
    console.log("Delete from cart?"); //alert is undefined
  };

  return (
    <>
      <Box position="fixed" zIndex="234323" top="0" width="100%">
        <Header />
      </Box>
      <VStack spacing="24px" align="start" width="100%" backgroundColor="black">
        <PicBannerImg />
        <Box
          padding={{ base: "20px", md: "50px", lg: "100px" }}
          top={{ base: "10px", md: "50%", lg: "0" }}
          position="relative"
          bg="black">
          <Heading as="h1" size="md" color="white">
            Your previous votes
          </Heading>
          <Text color="grey" fontSize="15">
            {IpfsData.wallet}
          </Text>
          <Text mt="20px" color="white">
            You can vote multiple projects on different rounds, with a single cart. Submit one
            transaction per chain for a seamless donation experience.
          </Text>
        </Box>
        <Box
          justifyContent="center"
          position="relative"
          borderRadius="20px"
          borderColor="purple"
          borderWidth="2px"
          backgroundColor="#B100EF1A"
          padding="100px"
          ml="100px"
          width="auto"
          height="auto">
          <Icon
            as={FaXbox}
            position="absolute"
            top="20px"
            right="20px"
            _hover={{
              filter: "invert(100%)", // Apply invert filter on hover
            }}
            onClick={deleteFromCart}
          />

          <HStack>
            <Icon as={FaUser} />
            <Text>Person Name</Text>
          </HStack>
        </Box>
        <Box height="600px"></Box>

        <Box alignSelf="center">
          <Button
            borderRadius="60px"
            bg="linear-gradient(93.48deg, #1400FF 0%, #B100EF 100%)"
            color="white"
            marginTop="20px"
            width="130px">
            Continue
          </Button>
        </Box>
      </VStack>

      <Box position="relative" mt="200px">
        <EmailsSection />
      </Box>
    </>
  );
};

export default cartPerson;

const BannerImg = () => {
  return (
    <Box
      w={{ base: "100%", md: "50%", lg: "25%" }} // Set responsive width
      h="auto" // Height will automatically adjust based on content
      pb="100%" // Maintain a fixed aspect ratio (1:1)
      position="relative" // Needed for maintaining aspect ratio
      bg="blue.200">
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <Image src="3.png" alt="placeholder" />
      </div>
    </Box>
  );
};
