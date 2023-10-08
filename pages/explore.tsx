import React from "react";
import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { ExplorePromoSection } from "../ExploreComponents/ExplorePromoSection";
import { EmailsSection } from "../components/EmailSection";
import { InfoSection } from "../ExploreComponents/InfoSection";
const Explore = () => {
  return (
    <>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Header />
        <ExplorePromoSection />
        <InfoSection />
        <EmailsSection />
      </Flex>
    </>
  );
};

export default Explore;
