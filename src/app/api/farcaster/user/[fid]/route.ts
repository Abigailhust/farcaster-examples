import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { fid: string } }
) {
  const { fid } = params

  if (!fid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 })
  }

  try {
    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      throw new Error('NEYNAR_API_KEY is not configured')
    }

    // 调用 Neynar API 获取用户信息
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api_key': neynarApiKey,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Neynar API error: ${response.status}`)
    }

    const data = await response.json()
    
    // 返回用户数据
    if (data.users && data.users.length > 0) {
      return NextResponse.json(data.users[0])
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}