import { Box, Center, Text, Image, Stack, VStack, HStack } from "@chakra-ui/react";

export const PromoSection = () => {
  return (
    <Box
      bg="black"
      color="white"
      py={16}
      width="100%"
      marginTop="20"
      height={{ base: "0px", sm: "700px", md: "800px", lg: "1000px", xl: "1200px" }}
      mb={{ base: "-100px" }}
      minHeight="500px"
      alignItems="center">
      <Center mt={{ sm: "4", md: "-20", lg: "-100", xl: "-140" }}>
        <Image src="3.png" alt="3" position="relative" top="-20" />
      </Center>
    </Box>
  );
};

/* 
						<Text
              //top="-500px"
              fontSize="110"
              fontWeight="900"
              lineHeight="normal"
              position="relative"
              fontFamily="'MADE TOMMY', sans-serif">
              GRANTHUB
            </Text>

            <Text
              zIndex="23456"
              fontFamily="'MADE TOMMY', sans-serif"
              fontSize="30"
              position="absolute"
              top="620px"
              fontWeight="400"
              lineHeight="normal">
              Empowering talent through grants
            </Text> 
*/
