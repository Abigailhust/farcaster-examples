'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'

interface CastComposerProps {
  user: any // Privy user object
}

export function CastComposer({ user }: CastComposerProps) {
  const [castText, setCastText] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [lastCast, setLastCast] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { sendTransaction } = usePrivy()

  const maxLength = 320 // Farcaster 最大字符限制

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!castText.trim()) {
      setError('请输入内容')
      return
    }

    if (castText.length > maxLength) {
      setError(`内容过长，最多 ${maxLength} 个字符`)
      return
    }

    try {
      setIsPosting(true)
      setError(null)

      // 调用 API 发布 Cast
      const response = await fetch('/api/farcaster/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: castText,
          fid: user.farcaster?.fid,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post cast')
      }

      const result = await response.json()
      setLastCast(result)
      setCastText('')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '发布失败，请重试')
    } finally {
      setIsPosting(false)
    }
  }

  const insertEmoji = (emoji: string) => {
    setCastText(prev => prev + emoji)
  }

  const commonEmojis = ['🚀', '💜', '🔥', '✨', '🎉', '👀', '💯', '🌟', '⚡', '🎯']

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">发布动态</h2>

      {/* 成功提示 */}
      {lastCast && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-green-600 text-xl">✅</div>
            <div>
              <h4 className="font-medium text-green-900">发布成功！</h4>
              <p className="text-green-700 text-sm mt-1">
                您的动态已成功发布到 Farcaster
              </p>
              {lastCast.hash && (
                <a
                  href={`https://warpcast.com/${user.farcaster?.username}/${lastCast.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 text-sm underline mt-2 inline-block"
                >
                  在 Warpcast 中查看
                </a>
              )}
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
              <h4 className="font-medium text-red-900">发布失败</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* 发布表单 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={castText}
            onChange={(e) => setCastText(e.target.value)}
            placeholder="分享您的想法..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
            maxLength={maxLength}
          />
          
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className={`${castText.length > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'}`}>
              {castText.length} / {maxLength}
            </span>
            <div className="text-gray-500">
              剩余 {maxLength - castText.length} 字符
            </div>
          </div>
        </div>

        {/* 表情符号快捷选择 */}
        <div>
          <div className="text-sm text-gray-600 mb-2">快速添加表情：</div>
          <div className="flex flex-wrap gap-2">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 发布选项 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-3">发布选项</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                defaultChecked
              />
              <span className="text-sm text-gray-700">同时发布到我的 Farcaster 主页</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">允许其他用户转发</span>
            </label>
          </div>
        </div>

        {/* 发布按钮 */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isPosting || !castText.trim() || castText.length > maxLength}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>发布中...</span>
              </>
            ) : (
              <>
                <span>📤</span>
                <span>发布动态</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setCastText('')
              setError(null)
              setLastCast(null)
            }}
            className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl transition-colors"
          >
            清空
          </button>
        </div>
      </form>

      {/* 发布提示 */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 发布小贴士</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• 内容最多 {maxLength} 个字符</li>
          <li>• 支持 @用户名 提及其他用户</li>
          <li>• 可以添加链接和表情符号</li>
          <li>• 发布后无法编辑，请仔细检查</li>
        </ul>
      </div>
    </div>
  )
}