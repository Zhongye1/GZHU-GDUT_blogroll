<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

// 鼠标移动事件处理函数
const handleMouseMove = (event) => {
  // 获取鼠标相对于视窗的位置
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 4
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 4
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="parallax-background" :style="{
    transform: `translate(${mouseX * 10}px, ${mouseY * 10}px)`
  }">
  </div>

  <header id="header">
    <div id="header-inner">
      <span id="logo-left">

        <img id="logo" src="./assets/logo.png" alt="Logo" />
        <a id="logo-text" href="https://github.com/Zhongye1/GZHU-GDUT_blogroll">GZHU-GDUT Blogroll</a>
        <div style="width: 20px;"></div>
        <div class="navigation">
          <RouterLink to="/" class="nav-link">首页</RouterLink>
          <RouterLink to="/about" class="nav-link">关于</RouterLink>
        </div>
      </span>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "./assets/base.css";

.navigation {
  display: flex;
  gap: 20px;
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.nav-link {
  color: #444950;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 18px;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.nav-link.router-link-active {
  background-color: #84b3ff;
  color: white;
}

.parallax-background {
  position: fixed;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  z-index: -1;
  background-image: url('https://pic2.zhimg.com/v2-6269d74b4dafe14781d03790e5a86b21_r.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.1s ease-out;
}
</style>
