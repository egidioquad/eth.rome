import { Box, Text, VStack, Heading, Button, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { MetaMaskContext } from '../_app';
import ProfilePage from '../../ProfileComponents/ProfilePage';

const ContractInfo: React.FC = () => {
  const router = useRouter();
  const { paths } = router.query;
  const { provider } = useContext(MetaMaskContext);

  return (
    <Box width="100%" height="100vh" backgroundColor="#111111">
  <ProfilePage provider={provider} WalletAddress={paths && (paths as string[])[0]} chainId={11155111} />
    </Box>
  );
};

export default ContractInfo;
