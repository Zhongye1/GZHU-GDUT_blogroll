import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env) {
    try {
      const pathname = new URL(request.url).pathname;
      
      // 对于 API 请求，转发到原始 Worker 处理
      if (pathname.startsWith('/api/')) {
        // 这里应该实现访客追踪逻辑
        return new Response(JSON.stringify({ message: 'API endpoint' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      }

      // 对于静态资源，从 KV 获取
      const asset = await getAssetFromKV(
        {
          request,
          waitUntil(promise) {
            // 不需要等待
          },
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: {},
        }
      );
      
      return asset;
    } catch (e) {
      // 出错时返回简单的响应
      return new Response('Not Found', { status: 404 });
    }
  },
};