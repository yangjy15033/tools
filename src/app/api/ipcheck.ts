// 文件: app/api/hello/route.ts (或 route.js)

import { NextResponse } from 'next/server'


// POST 方法
export async function POST(request: Request) {
  const data = await request.json()
  return NextResponse.json({ received: data })
}
