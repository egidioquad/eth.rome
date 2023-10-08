import { Flex, Text, Button } from "@chakra-ui/react";
export const JoinUsSection = () => {
  return (
    <Flex
      bg="#E6A0FF"
      flexDirection="column"
      alignItems="left"
      justifyContent="center"
      position="relative"
      width="100%"
      height="100%"
      top="0px"
      pl={20}
      pb={10}
      pt={5}>
      <Text fontSize="4xl" fontWeight="semibold" mt="20px">
        Join Us
      </Text>
      <Text fontSize="xl" fontWeight="semibold" mt={4} maxW="590px">
        Ready to embrace the future of fair grant attributions? Become a part of our thriving
        community of talented individuals and organizations.
      </Text>
      <Flex mb={6} mt={6}>
        <Button
          mr={4}
          fontSize="12px"
          borderRadius={20}
          textColor={"white"}
          bg="#1400FF"
          _hover={{ bg: "#131313" }}
          onClick={() => (window.location.href = "http://localhost:3000/createProfile")}>
          GET STARTED
        </Button>
        <Button
          borderRadius={20}
          fontSize="12px"
          textColor={"white"}
          bg="#B100EF9E"
          _hover={{ bg: "#131313" }}>
          LEARN MORE
        </Button>
      </Flex>
    </Flex>
  );
};
