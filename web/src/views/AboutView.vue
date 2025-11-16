<template>
  <div class="about-page">
    <h1>关于博客聚合平台</h1>
    
    <div class="content-section">
      <h2>项目介绍</h2>
      <p>
        这是一个博客聚合网站，收集并展示来自不同作者和技术专家的博客文章。
        我们的目的是建立一个技术分享平台，让有价值的内容更容易被发现和传播。
      </p>
      <p>
        平台主要聚焦于技术领域，包括但不限于编程、软件开发、系统架构、人工智能等方向。
        所有内容均来源于各个博主的公开博客，我们仅做聚合展示，版权归原作者所有。
      </p>
    </div>

    <div class="content-section">
      <h2>功能特点</h2>
      <ul>
        <li>聚合多个博客源，一站式阅读</li>
        <li>智能分页，流畅浏览体验</li>
        <li>分类整理，快速找到感兴趣的内容</li>
        <li>定期更新，获取最新技术资讯</li>
        <li>响应式设计，适配各种设备</li>
        <li>简洁友好的界面设计</li>
      </ul>
    </div>

    <div class="content-section">
      <h2>技术架构</h2>
      <p>
        本网站使用现代前端技术构建：
      </p>
      <ul>
        <li>Vue 3 Composition API</li>
        <li>Vite 构建工具</li>
        <li>Vue Router 实现页面路由</li>
        <li>响应式设计，适配各种设备</li>
        <li>使用开源组件提高开发效率</li>
      </ul>
    </div>

    <div class="content-section">
      <h2>如何贡献</h2>
      <p>
        如果您希望将自己的博客加入我们的聚合列表，请通过 GitHub 提交 Pull Request，
        或者联系我们的维护团队。
      </p>
      <p>
        同样欢迎对项目提出改进建议，或者帮助我们修复 bug 和添加新功能。
        请访问我们的 GitHub 仓库了解更多信息。
      </p>
    </div>
    
    <div class="content-section">
      <h2>免责声明</h2>
      <p>
        本网站仅为内容聚合平台，所有文章观点仅代表原作者个人观点，
        与本站无关。如有任何问题，请联系原作者处理。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 70px auto 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
}

.content-section {
  margin-bottom: 30px;
}

.content-section h2 {
  color: #444950;
  border-bottom: 2px solid #84b3ff;
  padding-bottom: 5px;
}

.content-section p {
  line-height: 1.6;
  color: #2c323c;
}

.content-section ul {
  padding-left: 20px;
}

.content-section li {
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>