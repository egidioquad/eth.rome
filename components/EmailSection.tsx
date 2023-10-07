import { Box, Flex, Text, Button, Input, useBreakpointValue } from "@chakra-ui/react";

export const EmailsSection = () => {
  const responsiveWidth = useBreakpointValue({
    xl: "900px",
    base: "400px",
    sm: "600px",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    console.log(email); // Do something with the email
  };
  return (
    <Box
      width="100%"
      height="250px" // fix something here
      backgroundColor="#131313">
      <Box
        position="absolute"
        left="20px"
        sx={{
          width: responsiveWidth,
          fontSize: ["md", "xl"],
          padding: "4",
          // borderRadius: "md",
        }}>
        <Text
          fontSize="2xl"
          width="500px"
          fontWeight="bold"
          color="white"
          position="relative"
          marginTop="20px">
          Subscribe to our Newsletter!
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex alignItems="center" maxW={{ base: "400px", md: "100%" }}>
            <Input
              name="email"
              placeholder="Enter your email..."
              sx={{ "::placeholder": { color: "white" } }}
              variant="outline"
              textAlign="left"
              mb={0}
              borderRadius="60px 0px 0px 60px"
              // borderImageSlice="1"
              //width="700px"
              height="54px"
              bg="rgba(217, 217, 217, 0.35)"
              position="relative"
              marginTop="20px"
              borderColor="purple"
            />
            <Button
              // ml={4}
              type="submit"
              width="200px"
              height="54px"
              borderRadius="0 60px 60px 0px"
              bg="linear-gradient(93.48deg, #1400FF 0%, #B100EF 100%)"
              color="white"
              marginTop="20px"
              _hover={{ bg: "purple" }}>
              SUBSCRIBE
            </Button>
          </Flex>
        </form>
        <Text color="white" marginTop="20px">
          Copyright © 2023 GrantHub
        </Text>
      </Box>
    </Box>
  );
};
