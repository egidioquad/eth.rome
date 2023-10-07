import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";

export const FAQSection = () => {
  const stages = [
    {
      id: 1,
      title: "How secure is the platform?",
      description:
        "Rest easy, brave innovators! Our platform is built on impenetrable blockchain tech, guaranteeing optimal security and unwavering trust.",
    },
    {
      id: 2,
      title: "Who’s eligible for grants?",
      description:
        "Any visionary mind with an insatiable appetite for progress and a cutting-edge project is welcome to embark on this grand adventure!",
    },
    {
      id: 3,
      title: "What about application fees?",
      description:
        "Toss those fees to oblivion! Our platform is a shining beacon of accessibility, welcoming all creators to apply without fearing exorbitant costs!",
    },
  ];

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      // mt={10}
      position="relative"
      width="100%"
      top="0px"
      background="black"
      justifyContent="center">
      <Text textAlign="center" mt={20} fontSize="44px" fontWeight="semibold" color="white">
        Curious Minds Love To Know
      </Text>

      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        p="40px"
        mt={0}
        justifyContent="space-between"
        width="100%"
        paddingRight="60px"
        mb={100}>
        {stages.map((stage) => (
          <VStack key={stage.id} spacing={1} alignItems="center" mb={30}>
            <Box
              maxW="330px"
              fontSize={{ base: "40px", md: "40px" }}
              p={4}
              color="white"
              fontStyle="italic">
              {stage.title}
            </Box>

            <Text
              p={4}
              fontFamily="'Inter', sans-serif"
              textAlign="left"
              width="333px"
              fontSize="27px"
              lineHeight="1.2"
              color="white">
              {stage.description}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};

/* return (
    <Flex
      flexDirection="column"
      alignItems="center"
      position="relative"
      width="100%"
      height="100vh"
      top="0px"
      backgroundColor="black"
      color="white">
      <Text fontSize="50px" fontWeight="bold" mb={8}>
        Curious Minds Love to Know
      </Text>
      <HStack spacing={8} alignItems="flex-start" width="100%">
        {/* Prima Sezione }
        <Box width="33%">
          <Text fontSize="30px" fontWeight="bold">
            How secure is the platform?
          </Text>
          <Text mt={4} width="300px" fontSize="20px">
            Rest easy, brave innovators! Our platform is built on impenetrable blockchain tech,
            guaranteeing optimal security and unwavering trust.
          </Text>
        </Box>

        {/* Seconda Sezione }
        <Box width="33%">
          <Text fontSize="30px" fontWeight="bold">
            Who’s eligible for grants?
          </Text>
          <Text mt={4} width="300px" fontSize="20px">
            Any visionary mind with an insatiable appetite for progress and a cutting-edge project
            is welcome to embark on this grand adventure!
          </Text>
        </Box>

        {/* Terza Sezione /}
        <Box width="33%">
          <Text fontSize="30px" fontWeight="bold">
            What about application fees?
          </Text>
          <Text mt={4} width="300px" fontSize="20px">
            Toss those fees to oblivion! Our platform is a shining beacon of accessibility,
            welcoming all creators to apply without fearing exorbitant costs!
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
};
*/
