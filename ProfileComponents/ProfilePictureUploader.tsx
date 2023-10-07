import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image as ChakraImage,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const ProfilePictureUploader: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageBlob, setImageBlob] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImageBlob(blobUrl);
    }
  };

  return (
    <Box>
      <div
        onDoubleClick={() => setShowModal(true)}
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "100%",
        }}>
        <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleChange} />

        {imageBlob ? (
          <ChakraImage
            objectFit="cover"
            src={imageBlob}
            alt="Uploaded Image"
            width="400px"
            borderRadius="100%"
          />
        ) : (
          <Box
            objectFit="cover"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="100000px"
            fontSize="2em"
            border="2px solid white"
            width="100%" // Set responsive width
            height="100%" // Height will adjust based on content
            //  pb="100%" // Maintain a fixed aspect ratio (1:1)
            position="absolute" // Needed for maintaining aspect ratio
            top="0">
            +
          </Box>
        )}

        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Profile Image</ModalHeader>
              <ModalBody>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    inputRef.current?.click();
                  }}
                  mb={4}>
                  Upload from PC
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </Box>
  );
};

export default ProfilePictureUploader;
