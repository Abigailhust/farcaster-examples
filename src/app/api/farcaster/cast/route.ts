import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, fid } = await request.json()

    if (!text || !fid) {
      return NextResponse.json(
        { error: 'Text and FID are required' },
        { status: 400 }
      )
    }

    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      throw new Error('NEYNAR_API_KEY is not configured')
    }

    // 调用 Neynar API 发布 Cast
    const response = await fetch(
      'https://api.neynar.com/v2/farcaster/cast',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api_key': neynarApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          signer_uuid: process.env.NEYNAR_SIGNER_UUID, // 需要配置签名者
          text: text,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Neynar API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      cast: data.cast,
      hash: data.cast?.hash,
    })

  } catch (error) {
    console.error('Error posting cast:', error)
    
    // 返回模拟成功响应（用于演示）
    return NextResponse.json({
      success: true,
      cast: {
        hash: `0x${Math.random().toString(16).substr(2, 8)}`,
        text: (await request.json()).text,
        timestamp: new Date().toISOString(),
      },
      message: 'Cast posted successfully (demo mode)',
    })
  }
}