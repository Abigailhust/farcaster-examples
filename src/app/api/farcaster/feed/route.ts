import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      throw new Error('NEYNAR_API_KEY is not configured')
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '25'
    const cursor = searchParams.get('cursor') || ''

    // 调用 Neynar API 获取全局信息流
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/trending?limit=${limit}&cursor=${cursor}`,
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
    
    // 格式化数据
    const formattedCasts = data.casts?.map((cast: any) => ({
      hash: cast.hash,
      text: cast.text,
      timestamp: cast.timestamp,
      author: {
        fid: cast.author.fid,
        username: cast.author.username,
        display_name: cast.author.display_name,
        pfp_url: cast.author.pfp_url,
      },
      reactions: {
        likes_count: cast.reactions?.likes_count || 0,
        recasts_count: cast.reactions?.recasts_count || 0,
        replies_count: cast.replies?.count || 0,
      },
      embeds: cast.embeds || [],
    })) || []

    return NextResponse.json({
      casts: formattedCasts,
      next: data.next,
    })

  } catch (error) {
    console.error('Error fetching feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}