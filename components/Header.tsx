import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  Link,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { FaCartArrowDown, FaCartPlus, FaPortrait, FaSearch, FaUser } from "react-icons/fa";

export const Header = () => {
  const router = useRouter();

  return (
    <Box position="fixed" zIndex="234323" top="0" width="100%">
      <Flex
        as="header"
        backgroundColor="black"
        color="white"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        width="100%"
        borderBottom="2px solid transparent"
        borderBottomColor="purple"
        height="80px"
        boxShadow="0px 4px 4px rgba(128, 0, 128, 0.25)"
        //boxShadow="0px rgba(128, 0, 128, 0.25), 0px 0px 10px rgba(128, 0, 128, 0.25)"
        zIndex="2323231">
        <Flex>
          <Menu>
            <Text
              ml={6}
              onClick={() => (window.location.href = "http://localhost:3000")}
              fontSize="xl"
              fontWeight="bold"
              cursor="pointer"
              _hover={{ color: "purple" }}>
              GRANTHUB
            </Text>

            {/* <MenuButton
            display={{ base: "none", sm: "block" }}
            as={Box}
            cursor="pointer"
            ml={6}
            mr={6}
            _hover={{ color: "purple" }}>
            Categories <ChevronDownIcon />
          </MenuButton>
          <MenuList textColor={"black"}>
            <MenuItem>Category 1</MenuItem>
            <MenuItem>Category 2</MenuItem>
            <MenuItem>Category 3</MenuItem>
          </MenuList> */}
          </Menu>
          <Text
            as={Box}
            cursor="pointer"
            ml={6}
            mr={6}
            _hover={{ color: "purple" }}
            onClick={() => (window.location.href = "http://localhost:3000/explore")}>
            Explore
          </Text>
          <Box mr={6} ml={6} _hover={{ color: "purple" }} display={{ base: "none", md: "block" }}>
            <Text cursor="pointer">About</Text>
          </Box>
          <Box
            mr={6}
            ml={6}
            _hover={{ color: "purple" }}
            display={{ base: "none", md: "block" }}
            onClick={() => (window.location.href = "http://localhost:3000/createProfile")}>
            <Text cursor="pointer">Create Proposal</Text>
          </Box>
        </Flex>

        <Flex alignItems="center" mr={{ base: "120", lg: "180" }}>
          <Link onClick={() => router.push("/")}></Link>
          <Icon
            fontSize="lg"
            aria-label="Cart"
            as={FaUser}
            mr={8}
            display={{ base: "none", md: "block" }}
            _hover={{ color: "green.300" }}
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/profile/0x9e224DF7A5Bbcf1b35ed14F22efc290055F09D66")
            }
          />
          {/* <Text cursor="pointer" colorScheme="purple" _hover={{ color: "purple" }}>
          Sign In
        </Text> */}
        </Flex>
      </Flex>
    </Box>
  );
};
