'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface FarcasterProfileProps {
  user: any // Privy user object
}

export function FarcasterProfile({ user }: FarcasterProfileProps) {
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.farcaster?.fid) {
      fetchProfileData(user.farcaster.fid)
    }
  }, [user])

  const fetchProfileData = async (fid: number) => {
    try {
      setLoading(true)
      // 使用 Neynar API 获取用户资料
      const response = await fetch(`/api/farcaster/user/${fid}`)
      if (!response.ok) {
        throw new Error('Failed to fetch profile data')
      }
      const data = await response.json()
      setProfileData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">❌ 加载失败</div>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  const farcasterData = user?.farcaster
  const displayName = farcasterData?.displayName || profileData?.display_name || '未知用户'
  const username = farcasterData?.username || profileData?.username || 'unknown'
  const bio = profileData?.profile?.bio?.text || '这个人很神秘，什么都没写...'
  const followerCount = profileData?.follower_count || 0
  const followingCount = profileData?.following_count || 0
  const pfpUrl = farcasterData?.pfp || profileData?.pfp_url

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">个人资料</h2>
      
      {/* 用户头像和基本信息 */}
      <div className="flex items-start space-x-6">
        <div className="relative">
          {pfpUrl ? (
            <Image
              src={pfpUrl}
              alt={displayName}
              width={100}
              height={100}
              className="rounded-full border-4 border-purple-100"
            />
          ) : (
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
          <p className="text-purple-600 font-medium">@{username}</p>
          <p className="text-gray-600 mt-2 leading-relaxed">{bio}</p>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{user.farcaster?.fid || 'N/A'}</div>
          <div className="text-sm text-gray-600">FID</div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{followerCount}</div>
          <div className="text-sm text-gray-600">关注者</div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{followingCount}</div>
          <div className="text-sm text-gray-600">关注中</div>
        </div>
        
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{profileData?.cast_count || 0}</div>
          <div className="text-sm text-gray-600">动态数</div>
        </div>
      </div>

      {/* 账户信息 */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">账户信息</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">用户 ID:</span>
            <span className="font-mono text-gray-900">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Farcaster FID:</span>
            <span className="font-mono text-gray-900">{user.farcaster?.fid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">创建时间:</span>
            <span className="text-gray-900">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-3">
        <button
          onClick={() => window.open(`https://warpcast.com/${username}`, '_blank')}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          在 Warpcast 中查看
        </button>
        <button
          onClick={() => fetchProfileData(user.farcaster?.fid)}
          className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
        >
          刷新资料
        </button>
      </div>
    </div>
  )
}