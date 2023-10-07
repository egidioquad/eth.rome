import { Box, Grid, Text, Image as ChakraImage, Flex, Center, Hide } from "@chakra-ui/react";
export const FourGrid = () => {
  return (
    <Flex
      width="100%"
      minHeight="100vh" // Set minHeight to ensure content stays within the viewport
      backgroundColor="black"
      color="white"
      fontSize="40px"
      position="relative"
      top="0px"
      mb={-10}
      justifyContent="center" // Horizontally center content
      //alignItems="center" // Vertically center content
    >
      <Box
        p="40px"
        //left no pad
      >
        <Grid
          // left={{ base: "30px", sm: "40px", md: "50px", xl: "100px" }}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          backgroundColor="black"
          position="relative"
          top="50px"
          mb="30px"
          maxWidth={{ base: "100%", md: "90%" }}
          width="100%"
          gap={5}>
          <Box>
            <Text
              // mt={10}
              fontFamily="'Inter', sans-serif"
              fontSize={{ base: "30px", lg: "40px" }}
              fontWeight="semibold"
              color="white"
              width={{ base: "400px", lg: "500px" }}>
              Decentralized System for Equal and Fair Evaluation
            </Text>
            <Text
              width={{ base: "400px", lg: "500px" }}
              fontFamily="'Inter', sans-serif"
              fontSize="30px"
              mt="20px"
              lineHeight="1.2">
              Imagine a world where grants are attributed to deserving individuals without bias and
              red tape. Our decentralized system ensures fairness and transparency.
            </Text>
          </Box>
          <Box>
            <ChakraImage
              mt={{ base: "30px", md: "0" }}
              src="2.png"
              alt="top right"
              maxW="500px"
              width={{ base: "400px", md: "450", lg: "500px" }}
              ml={{ base: "0px ", md: "10px" }}
            />
          </Box>
          <Hide below="md">
            <ChakraImage
              src="1.png"
              alt="bottom left"
              maxW="500px"
              width={{ base: "400px", md: "450", lg: "500px" }}
            />
          </Hide>
          <Box ml={{ base: "0px ", md: "10px" }}>
            <Text
              // ml="10px "
              mt={{ base: "30px", md: "0" }}
              fontSize={{ base: "30px", lg: "40px" }}
              width={{ base: "400px", lg: "500px" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="bold">
              Empowering Talented Minds to Flourish and Succeed
            </Text>
            <Text
              // ml="10px "
              fontFamily="'Inter', sans-serif"
              mt={{ base: "30px", md: "4" }}
              width={{ base: "400px", lg: "500px" }}
              fontSize="30px"
              lineHeight="1.2">
              By supporting gifted individuals from diverse backgrounds, we pave the way for a
              brighter future. Together, we’re leveling the playing field.
            </Text>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
};
