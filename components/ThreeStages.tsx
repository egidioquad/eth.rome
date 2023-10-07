import { VStack, Box, Text, Flex } from "@chakra-ui/react";

const ThreeStages = () => {
  const stages = [
    {
      id: 1,
      title: "1",
      description:
        "Ready to soar? Dive into our application stage where members eagerly show their interest and talents.",
    },
    {
      id: 2,
      title: "2",
      description:
        "Hold onto your hats, we’re entering the selection stage! Let the fairest mechanism choose winners with no bias.",
    },
    {
      id: 3,
      title: "3",
      description:
        "Get ready to break out the confetti! Witness seamless distribution of funds to our well-deserved winners.",
    },
  ];

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mt={10}
      position="relative"
      width="100%"
      top="0px"
      background="black"
      justifyContent="center">
      <Text textAlign="center" mt={20} fontSize="40px" fontWeight="bold" color="white">
        The Three Stages
      </Text>

      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        p="40px"
        mt={0}
        justifyContent="space-between"
        width="100%"
        paddingRight="60px">
        {stages.map((stage) => (
          <VStack key={stage.id} spacing={0} alignItems="center">
            <Box
              fontSize={{ base: "60px", md: "100px" }}
              p={4}
              color="black"
              style={{
                WebkitTextFillColor: "black",
                WebkitTextStrokeWidth: "2px",
                WebkitTextStrokeColor: "white",
              }}>
              {stage.title}
            </Box>

            <Text
              fontFamily="'Inter', sans-serif"
              textAlign="left"
              width="333px"
              fontSize="30px"
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

export default ThreeStages;
