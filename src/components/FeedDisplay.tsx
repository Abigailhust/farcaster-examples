'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Cast {
  hash: string
  text: string
  timestamp: string
  author: {
    fid: number
    username: string
    display_name: string
    pfp_url: string
  }
  reactions: {
    likes_count: number
    recasts_count: number
    replies_count: number
  }
  embeds?: any[]
}

export function FeedDisplay() {
  const [casts, setCasts] = useState<Cast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/farcaster/feed')
      if (!response.ok) {
        throw new Error('Failed to fetch feed')
      }
      
      const data = await response.json()
      setCasts(data.casts || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const refreshFeed = async () => {
    setRefreshing(true)
    await fetchFeed()
    setRefreshing(false)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`
    return date.toLocaleDateString('zh-CN')
  }

  if (loading && !refreshing) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">信息流</h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">信息流</h2>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4 text-2xl">❌</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchFeed}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">信息流</h2>
        <button
          onClick={refreshFeed}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
        >
          <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
          <span>{refreshing ? '刷新中...' : '刷新'}</span>
        </button>
      </div>

      {casts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-4xl">📰</div>
          <p className="text-gray-600">暂无动态</p>
        </div>
      ) : (
        <div className="space-y-4">
          {casts.map((cast) => (
            <div key={cast.hash} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              {/* 用户信息 */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="relative">
                  {cast.author.pfp_url ? (
                    <Image
                      src={cast.author.pfp_url}
                      alt={cast.author.display_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      👤
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">
                      {cast.author.display_name}
                    </h4>
                    <span className="text-purple-600 text-sm">
                      @{cast.author.username}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatTimestamp(cast.timestamp)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 动态内容 */}
              <div className="mb-4">
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {cast.text}
                </p>
              </div>

              {/* 嵌入内容 */}
              {cast.embeds && cast.embeds.length > 0 && (
                <div className="mb-4">
                  {cast.embeds.map((embed, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      {embed.url && (
                        <a
                          href={embed.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-sm underline"
                        >
                          {embed.url}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 互动按钮 */}
              <div className="flex items-center space-x-6 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
                  <span>💬</span>
                  <span className="text-sm">{cast.reactions.replies_count}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                  <span>🔄</span>
                  <span className="text-sm">{cast.reactions.recasts_count}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-red-600 transition-colors">
                  <span>❤️</span>
                  <span className="text-sm">{cast.reactions.likes_count}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <span>📤</span>
                  <span className="text-sm">分享</span>
                </button>
              </div>

              {/* 查看详情链接 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`https://warpcast.com/${cast.author.username}/${cast.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 text-sm underline"
                >
                  在 Warpcast 中查看
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 加载更多按钮 */}
      {casts.length > 0 && (
        <div className="text-center pt-6">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors">
            加载更多
          </button>
        </div>
      )}
    </div>
  )
}