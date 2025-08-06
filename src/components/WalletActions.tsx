'use client'

import { useState } from 'react'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletActionsProps {
  address?: `0x${string}`
  isConnected: boolean
}

export function WalletActions({ address, isConnected }: WalletActionsProps) {
  const [sendAmount, setSendAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { data: balance } = useBalance({
    address: address,
  })

  const { chain } = useNetwork()

  const handleSendTransaction = async () => {
    if (!address || !sendAmount || !recipientAddress) {
      setError('请填写完整信息')
      return
    }

    try {
      setIsSending(true)
      setError(null)

      // 这里可以添加实际的转账逻辑
      // 使用 wagmi 的 useSendTransaction hook
      
      // 模拟交易
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setTxHash('0x1234567890abcdef...')
      setSendAmount('')
      setRecipientAddress('')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '交易失败')
    } finally {
      setIsSending(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">钱包</h2>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6 text-6xl">💰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            连接钱包开始使用
          </h3>
          <p className="text-gray-600 mb-8">
            连接您的钱包以查看余额和进行交易
          </p>
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">钱包</h2>
        <ConnectButton />
      </div>

      {/* 钱包信息 */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2">钱包余额</h3>
            <div className="text-3xl font-bold mb-1">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
            </div>
            <div className="text-purple-100 text-sm">
              网络: {chain?.name || 'Unknown'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-purple-100 text-sm mb-1">钱包地址</div>
            <div className="font-mono text-sm bg-white/20 rounded-lg px-3 py-1">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </div>
          </div>
        </div>
      </div>

      {/* 交易成功提示 */}
      {txHash && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-green-600 text-xl">✅</div>
            <div>
              <h4 className="font-medium text-green-900">交易成功！</h4>
              <p className="text-green-700 text-sm mt-1">
                交易已提交到区块链网络
              </p>
              <a
                href={`${chain?.blockExplorers?.default?.url}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm underline mt-2 inline-block"
              >
                在区块浏览器中查看
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-red-600 text-xl">❌</div>
            <div>
              <h4 className="font-medium text-red-900">交易失败</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* 发送交易 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">发送交易</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              接收地址
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              发送金额 ({balance?.symbol || 'ETH'})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.0001"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={() => setSendAmount(balance?.formatted || '0')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                最大
              </button>
            </div>
          </div>
          
          <button
            onClick={handleSendTransaction}
            disabled={isSending || !sendAmount || !recipientAddress}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>发送中...</span>
              </>
            ) : (
              <>
                <span>💸</span>
                <span>发送交易</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 px-6 rounded-xl transition-colors flex flex-col items-center space-y-2">
          <span className="text-2xl">🔄</span>
          <span>兑换代币</span>
        </button>
        
        <button className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-4 px-6 rounded-xl transition-colors flex flex-col items-center space-y-2">
          <span className="text-2xl">🎨</span>
          <span>铸造 NFT</span>
        </button>
      </div>

      {/* 钱包信息 */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">钱包信息</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">钱包地址:</span>
            <span className="font-mono text-gray-900">
              {address ? `${address.slice(0, 10)}...${address.slice(-8)}` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">网络:</span>
            <span className="text-gray-900">{chain?.name || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">链 ID:</span>
            <span className="text-gray-900">{chain?.id || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* 注意事项 */}
      <div className="bg-yellow-50 rounded-xl p-4">
        <h4 className="font-medium text-yellow-900 mb-2">⚠️ 注意事项</h4>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• 请仔细核对接收地址，转账无法撤销</li>
          <li>• 确保网络选择正确</li>
          <li>• 保留足够的 Gas 费用</li>
          <li>• 大额转账建议先小额测试</li>
        </ul>
      </div>
    </div>
  )
}