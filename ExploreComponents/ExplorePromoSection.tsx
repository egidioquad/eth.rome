import { Box, Center, Text, Image as ChakraImage, HStack } from "@chakra-ui/react";

export const ExplorePromoSection = () => {
  return (
    <Box bg="black" color="white" width="100%" height="auto">
      <Center>
        <ChakraImage src="empo.png" w="100%" />
        {/* <HStack spacing="24px">
          <ChakraImage
            src="4.png"
            alt="Left image"
            boxSize="1000px"
          />
          <Text fontSize="80" fontWeight="bold" position="relative" top="0px">
            Empowering Talent Beyond Boundaries
          </Text>
          <ChakraImage
            src="5.png"
            alt="Right image"
            boxSize="1000px"
          />
        </HStack> */}
      </Center>
      {/* <Center mt={4}>
        <Text fontSize="xl" position="relative" top="500px">
          Additional Text Here
        </Text>
      </Center> */}
    </Box>
  );
};
