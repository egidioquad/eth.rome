import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  position,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const ImageUploader: React.FC = () => {
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
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleChange} />

        {imageBlob ? (
          <img src={imageBlob} alt="Uploaded Image" width="600px" />
        ) : (
          <span
            style={{
              display: "flex",
              fontSize: "2em",
              width: "100%",
              height: "100%",

              paddingTop: "125px",
              paddingBottom: "125px",
              paddingLeft: "170px",
              paddingRight: "170px",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}>
            +
          </span>
        )}

        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Image</ModalHeader>
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

export default ImageUploader;
