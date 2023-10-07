import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// Even if you're app doesn't use mainnet ETH, you still need it in this array for ENS
export const chains = [mainnet, sepolia]

const { publicClient } = configureChains(chains, [publicProvider()])

const { connectors } = getDefaultWallets({
  // Get your own WalletConnect ID: https://cloud.walletconnect.com/sign-in
  projectId: 'f97c8ad6ac6b9225f35de54f089c3271',
  appName: 'grant-test',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})