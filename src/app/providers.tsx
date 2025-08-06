'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, base, polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// 配置支持的区块链网络
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base, polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
)

// 配置钱包
const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Farcaster Mini App',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains,
})

// 创建 Wagmi 配置
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // 启用 Farcaster 登录
        loginMethods: ['farcaster', 'wallet', 'email'],
        appearance: {
          theme: 'light',
          accentColor: '#8B5CF6',
          logo: '/logo.png',
        },
        // 启用嵌入式钱包
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        // Farcaster 配置
        farcaster: {
          enabled: true,
        },
      }}
    >
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} theme="light">
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </PrivyProvider>
  )
}