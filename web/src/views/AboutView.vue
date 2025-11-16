<template>
  <div id="container">
    <div class="about-page">
      <h1>关于博客聚合平台</h1>
      <cards name="站长（Zhongye）" link="https://zhongye1.github.io/Arknight-notes"
        avatar="https://avatars.githubusercontent.com/u/145737758?s=400&u=a77ba5dbc8f7c9fd54fe608100908cc6fddaee74&v=4"
        descr="南漂中，广州大学大三就读" siteshot="https://pic2.zhimg.com/v2-6269d74b4dafe14781d03790e5a86b21_r.jpg" />
      <div class="content-section">
        <h2>介绍</h2>
        <p>
          广州大学&&广东工业大学 收集的同学们的 Blogroll 博客聚合平台，旨在为大家提供一个便捷的技术资源分享和交流平台。
        </p>
        <p>

        </p>
      </div>
      <div class="content-section">
        <h2>加入该博客聚合站的站点：</h2>
        <ul>
          <li><a href="https://zhongye1.github.io/Arknight-notes" target="_blank">Arknight-notes</a> -
            站长记录一些笔记的站点</li>
          <li><a href="https://zhongye1.github.io" target="_blank">Zhongye</a> - 站长个人网站</li>
          <li><a href="https://www.fomal.cc/" target="_blank">Fomalhaut</a> - Fomalhaut🥝</li>
          <li><a href="https://eureka1029.github.io/" target="_blank">Eureka的小屋</a> - 水波</li>
          <li><a href="https://blog.miomoe.cn" target="_blank">miomoe</a> - 鼠子</li>
          <li><a href="https://blog.carry.fit/" target="_blank">Carry</a> - carry</li>
          <li><a href="https://doraemonblogs.github.io/" target="_blank">doraemon</a> - doraemonblogs</li>
          <li><a href="https://pic.yuyu.red/" target="_blank">宇宇</a> - yuyu</li>
          <li><a href="https://love.xingji.fun/" target="_blank">XingJiのBlog</a> - 迄今所有人生都大写着失败，但不妨碍我继续向前✨</li>
          <li><a href="https://guangzhou-university-site-193.github.io/GZHU-SITE/" target="_blank">GZHU-193</a> -
            广州大学193号工作站</li>
        </ul>
      </div>

      <!-- 补充的 cards 列表区：将 {% sitegroup %} 中的每个 {% site %} 转换为一个 <cards /> 组件实例 -->
      <!-- 组件 props 映射：name → 站点名称, link → url, avatar → avatar, descr → description, siteshot → screenshot -->
      <div class="cards-grid">
        <cards name="柊野" link="https://zhongye1.github.io"
          avatar="https://avatars.githubusercontent.com/u/145737758?s=400&u=a77ba5dbc8f7c9fd54fe608100908cc6fddaee74&v=4"
          descr="个人网站" siteshot="https://pic3.zhimg.com/v2-55c6231e4d3866f19a4fbbf18c10a5f6_b.jpg" />

        <cards name="Fomalhaut" link="https://www.fomal.cc/" avatar="https://source.fomal.cc/siteshot/www.fomal.cn.jpg"
          descr="Fomalhaut🥝" siteshot="https://source.fomal.cc/siteshot/www.fomal.cc.webp" />
        <cards name="Eureka的小屋" link="https://eureka1029.github.io/"
          avatar="https://eureka1029.github.io/img/eureka.jpg" descr="水波"
          siteshot="https://source.fomal.cc/siteshot/zfe.one.jpg" />
        <cards name="miomoe" link="https://blog.miomoe.cn" avatar="https://q1.qlogo.cn/g?b=qq&nk=1778273540&s=100"
          descr="鼠子" siteshot="https://pic4.zhimg.com/80/v2-d0522d3ea42af84d02f774794997e2b5_720w.webp" />
        <cards name="Carry" link="https://blog.carry.fit/"
          avatar="https://pica.zhimg.com/80/v2-18f519ce25edd6a6a98e967654809334_720w.webp" descr="carry"
          siteshot="https://picx.zhimg.com/80/v2-7e8cb22f8ffb0dacbde85b68df1e3fff_720w.webp" />
        <cards name="doraemon" link="https://doraemonblogs.github.io/"
          avatar="https://doraemonblogs.github.io/img/favicon.jpg" descr="doraemonblogs"
          siteshot="https://pic4.zhimg.com/80/v2-be92aca28520672f12aa6bdfd9ed31b5_720w.webp" />
        <cards name="宇宇" link="https://pic.yuyu.red/"
          avatar="https://free-img.400040.xyz/4/2024/08/31/66d3280d0c83b.jpg" descr="yuyu"
          siteshot="https://picx.zhimg.com/80/v2-3f19f71abf129cbfd3d1398531eb9411_720w.webp" />
        <cards name="XingJiのBlog" link="https://love.xingji.fun/"
          avatar="https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg" descr="迄今所有人生都大写着失败，但不妨碍我继续向前✨"
          siteshot="https://i.p-i.vip/47/20240920-66ed7b6730ca9.png" />
        <cards name="GZHU-193" link="https://guangzhou-university-site-193.github.io/GZHU-SITE/"
          avatar="https://pic1.zhimg.com/80/v2-593dd0a3b84d023b3827b97e81e0242a_720w.webp" descr="广州大学193号工作站"
          siteshot="https://picx.zhimg.com/v2-97d3c21993d620a296be9f86c15400cd_1440w.jpg" />
      </div>
    </div>
  </div>

</template>

<script>
import Cards from '../components/cards.vue';

export default {
  name: 'AboutView',
  components: {
    Cards
  }
}
</script>

<style scoped>
.about-page {
  width: auto;
  min-height: max-content;
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

/*cards 网格布局 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>