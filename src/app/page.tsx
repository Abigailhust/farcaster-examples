'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FarcasterProfile } from '../components/FarcasterProfile'
import { CastComposer } from '../components/CastComposer'
import { FeedDisplay } from '../components/FeedDisplay'
import { WalletActions } from '../components/WalletActions'

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'profile' | 'compose' | 'feed' | 'wallet'>('profile')

  // 等待 Privy 初始化完成
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // 未认证状态 - 显示登录界面
  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              欢迎使用 Farcaster Mini App
            </h1>
            <p className="text-gray-600">
              连接您的 Farcaster 账户开始使用
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={login}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              使用 Farcaster 登录
            </button>
            
            <div className="text-sm text-gray-500">
              或者连接您的钱包
            </div>
            
            <ConnectButton />
          </div>
          
          <div className="mt-8 text-xs text-gray-400">
            <p>通过登录，您同意我们的服务条款和隐私政策</p>
          </div>
        </div>
      </div>
    )
  }

  // 已认证状态 - 显示主应用界面
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 头部 */}
      <header className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Farcaster Mini App Demo
          </h1>
          <div className="flex items-center space-x-4">
            <ConnectButton />
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      {/* 导航标签 */}
      <nav className="bg-white rounded-2xl shadow-sm p-2 mb-6">
        <div className="flex space-x-1">
          {[
            { id: 'profile', label: '个人资料', icon: '👤' },
            { id: 'compose', label: '发布动态', icon: '✍️' },
            { id: 'feed', label: '信息流', icon: '📰' },
            { id: 'wallet', label: '钱包', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="bg-white rounded-2xl shadow-sm p-6">
        {activeTab === 'profile' && (
          <FarcasterProfile user={user} />
        )}
        
        {activeTab === 'compose' && (
          <CastComposer user={user} />
        )}
        
        {activeTab === 'feed' && (
          <FeedDisplay />
        )}
        
        {activeTab === 'wallet' && (
          <WalletActions address={address} isConnected={isConnected} />
        )}
      </main>

      {/* 底部信息 */}
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>Built with Farcaster Mini Apps SDK</p>
      </footer>
    </div>
  )
}