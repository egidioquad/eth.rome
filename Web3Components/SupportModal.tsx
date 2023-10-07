import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

function SupportModal({ isOpen, onRequestClose, onSupport }) {
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} size="md" isCentered={true}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="#131313"
        color="white"
        maxW="300px" // Set the maximum width (adjust as needed)
      >
        <ModalHeader alignSelf="center">Voting</ModalHeader>
        <ModalCloseButton
          as={FaTimes}
          color="white"
          onClick={onRequestClose}
          size="sm"
          position="absolute"
          top="1rem"
          right="1rem"
        />
        <ModalBody>
          <VStack alignItems="left" mt="20px" mb="20px">
            <Button
              color="white"
              _hover={{ backgroundColor: "purple.800" }}
              backgroundColor="purple"
              onClick={() => onSupport(0)}
              borderRadius="10px">
              Support
            </Button>
            {/* <Button
              onClick={() => onSupport(0)}
  color="white"
              _hover={{ backgroundColor: "purple.800" }}
              backgroundColor="purple"              borderRadius="10px">
              Oppose
            </Button> */}
            <Button
              onClick={() => onSupport(1)}
              color="white"
              _hover={{ backgroundColor: "purple.800" }}
              backgroundColor="purple.500"
              borderRadius="10px">
              Abstain
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
//  <ModalFooter></ModalFooter>
export default SupportModal;
