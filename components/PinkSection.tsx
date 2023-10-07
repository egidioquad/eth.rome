import { Flex, Text, Image, Box } from "@chakra-ui/react";
export const PinkSection = () => {
  return (
    <Flex
      bg="#E6A0FF"
      width="100%"
      height={{ base: "300px", sm: "300px", md: "384px", lg: "380px", xl: "390px" }}
      position="relative"
      flexDirection="column">
      <Box>
        <Text
          position="relative"
          top="60px"
          left={{ base: "30px", sm: "40px", md: "50px", xl: "100px" }}
          fontFamily="'MADE TOMMY', sans-serif"
          fontWeight="light"
          fontSize={{ base: "16", sm: "20", md: "25", xl: "32" }}
          lineHeight="39.68px"
          width="50vh"
          color="black">
          Fair Grants Revolution
        </Text>
        <Text
          top="55px"
          left={{ base: "30px", sm: "40px", md: "50px", xl: "100px" }}
          position="relative"
          bottom="0"
          width={{ sm: "500px", md: "700px", xl: "800px" }}
          color="black"
          fontFamily="'MADE TOMMY', sans-serif"
          fontWeight="1000"
          fontSize={{ base: "32", sm: "40", md: "50", xl: "64" }}
          lineHeight={{ sm: "40px", md: "50px", xl: "80px" }}>
          Redefining grant opportunities for all talented individuals.
        </Text>
      </Box>
    </Flex>
  );
};
//  <Image src="5.png" alt="stella" />
