import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)

  // 处理访客追踪 API 请求
  if (url.pathname.startsWith('/api/')) {
    return handleVisitorAPI(event.request)
  }

  let options = {}

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    
    // 将 manifestJSON 传递给 getAssetFromKV
    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");

    return response;

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) { }
    }

    // 如果找不到资源，则返回 index.html 以支持 SPA 路由
    try {
      const indexPath = `${new URL(event.request.url).origin}/index.html`
      const indexResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(indexPath, req),
      })

      return new Response(indexResponse.body, { ...indexResponse, status: 200 })
    } catch (e) {
      return new Response(e.message || e.toString(), { status: 500 })
    }
  }
}

// 处理访客追踪 API 请求
async function handleVisitorAPI(request) {
  try {
    console.log('Handling visitor API request:', request.method)

    // 处理获取访客数据的请求
    if (request.method === 'GET') {
      return handleGetVisitors(request)
    }

    // 处理添加访客数据的请求
    if (request.method === 'POST') {
      return handleAddVisitor(request)
    }

    // 默认返回404
    return new Response('Method Not Allowed', { status: 405 })
  } catch (error) {
    console.error('Error in handleVisitorAPI:', error)
    return new Response(JSON.stringify({ error: 'Failed to handle visitor API request', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 获取所有访客数据
async function handleGetVisitors(request) {
  try {
    console.log('Getting visitors from KV')

    // 从 KV 中获取所有访客数据
    const visitors = []
    const keys = await vis_IP_track.list()

    console.log('KV keys:', keys)

    for (const key of keys.keys) {
      const visitorData = await vis_IP_track.get(key.name)
      if (visitorData) {
        visitors.push(JSON.parse(visitorData))
      }
    }

    console.log('Returning visitors:', visitors.length)

    return new Response(JSON.stringify(visitors), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in handleGetVisitors:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch visitors', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 添加新的访客数据
async function handleAddVisitor(request) {
  try {
    console.log('Adding new visitor')

    // 获取访客IP地址
    const clientIP = request.headers.get('cf-connecting-ip') || '0.0.0.0'
    console.log('Client IP:', clientIP)

    // 获取地理位置信息
    const geoData = {
      country: request.cf ? request.cf.country : 'Unknown',
      region: request.cf ? request.cf.region : 'Unknown',
      city: request.cf ? request.cf.city : 'Unknown',
      latitude: request.cf ? request.cf.latitude : 0,
      longitude: request.cf ? request.cf.longitude : 0,
    }

    console.log('Geo data:', geoData)

    // 创建访客记录
    const visitorRecord = {
      ip: clientIP,
      location: geoData,
      timestamp: new Date().toISOString()
    }

    // 生成唯一的键名（使用IP+时间戳）
    const key = `visitor_${clientIP}_${Date.now()}`
    console.log('Generated key:', key)

    // 存储到 KV
    await vis_IP_track.put(key, JSON.stringify(visitorRecord))
    console.log('Visitor data stored successfully')

    return new Response(JSON.stringify({ success: true, data: visitorRecord }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in handleAddVisitor:', error)
    return new Response(JSON.stringify({ error: 'Failed to store visitor data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}