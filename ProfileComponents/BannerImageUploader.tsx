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
  Center,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const BannerImageUploader: React.FC = () => {
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
        style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleChange} />

        {imageBlob ? (
          <ChakraImage
            src={imageBlob}
            alt="Uploaded Image"
            width="100%"
            height="540px"
            position="relative"
            top="69px"
            objectFit="cover"
          />
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2em",

              width: "100%",
              height: "520px",
              margin: "0",
              top: "80px",
              position: "relative",
            }}>
            +
          </span>
        )}

        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Banner Image</ModalHeader>
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

export default BannerImageUploader;
