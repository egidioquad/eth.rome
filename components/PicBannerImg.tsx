import { Box } from "@chakra-ui/react";
import React from "react";
import BannerImageUploader from "../ProfileComponents/BannerImageUploader";
import ProfilePictureUploader from "../ProfileComponents/ProfilePictureUploader";

function PicBannerImg() {
  return (
    <Box width="100%">
      <Box
        width="100%"
        height={{ base: "300px", sm: "400px", md: "500px", lg: "600px", xl: "600px" }}
        backgroundColor="rgba(217, 217, 217, 0.35)">
        <BannerImageUploader />
      </Box>

      <Box
        width={{ base: "150px", sm: "200px", md: "250px", lg: "300px" }}
        height={{ base: "150px", sm: "200px", md: "250px", lg: "300px" }}
        border="3px solid #B100EF"
        position="absolute"
        borderRadius="100%"
        top={{ base: "199px", sm: "240px", md: "300px", lg: "360px", xl: "360px" }}
        zIndex="2"
        left={{ base: "30px	", sm: "50px", md: "70px", lg: "100px", xl: "100px" }}
        backgroundColor="#D9D9D9">
        <ProfilePictureUploader />
      </Box>
    </Box>
  );
}

export default PicBannerImg;
