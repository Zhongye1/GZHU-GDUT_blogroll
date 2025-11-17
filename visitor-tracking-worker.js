// 访客位置追踪 Worker

// 监听 fetch 事件
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 处理获取访客数据的请求
  if (url.pathname === '/api/visitors' && request.method === 'GET') {
    return handleGetVisitors(request)
  }
  
  // 处理添加访客数据的请求
  if (url.pathname === '/api/visitors' && request.method === 'POST') {
    return handleAddVisitor(request)
  }
  
  // 默认返回404
  return new Response('Not Found', { status: 404 })
}

// 获取所有访客数据
async function handleGetVisitors(request) {
  try {
    // 从 KV 中获取所有访客数据
    const visitors = []
    const keys = await VISITOR_DATA.list()
    
    for (const key of keys.keys) {
      const visitorData = await VISITOR_DATA.get(key.name)
      if (visitorData) {
        visitors.push(JSON.parse(visitorData))
      }
    }
    
    return new Response(JSON.stringify(visitors), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch visitors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 添加新的访客数据
async function handleAddVisitor(request) {
  try {
    // 获取访客IP地址
    const clientIP = request.headers.get('cf-connecting-ip') || '0.0.0.0'
    
    // 获取地理位置信息
    const geoData = {
      country: request.cf.country || 'Unknown',
      region: request.cf.region || 'Unknown',
      city: request.cf.city || 'Unknown',
      latitude: request.cf.latitude || 0,
      longitude: request.cf.longitude || 0,
    }
    
    // 创建访客记录
    const visitorRecord = {
      ip: clientIP,
      location: geoData,
      timestamp: new Date().toISOString()
    }
    
    // 生成唯一的键名（使用IP+时间戳）
    const key = `visitor_${clientIP}_${Date.now()}`
    
    // 存储到 KV
    await VISITOR_DATA.put(key, JSON.stringify(visitorRecord))
    
    return new Response(JSON.stringify({ success: true, data: visitorRecord }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to store visitor data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}