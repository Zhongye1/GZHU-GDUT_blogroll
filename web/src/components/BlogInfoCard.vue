<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a :href="props.htmlUrl" target="_blank" rel="noopener noreferrer" class="link-card" :key="props.htmlUrl">
    <!-- 标题 -->
    <h3 class="link-title">
      {{ props.title }}
    </h3>

    <!-- 链接：图标 + URL -->
    <div class="link-url">
      <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M13.414 4.222a4.5 4.5 0 1 1 6.364 6.364l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005a2.5 2.5 0 1 0-3.536-3.536l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005zm-6.187 6.187a.5.5 0 0 1 .638-.058l.07.058.706.707a.5.5 0 0 1 .058.638l-.058.07-3.005 3.004a2.5 2.5 0 0 0 3.405 3.658l.13-.122 3.006-3.005a.5.5 0 0 1 .638-.058l.069.058.707.707a.5.5 0 0 1 .058.638l-.058.069-3.005 3.005a4.5 4.5 0 0 1-6.524-6.196l.16-.168 3.005-3.005zm8.132-3.182a.25.25 0 0 1 .353 0l1.061 1.06a.25.25 0 0 1 0 .354l-8.132 8.132a.25.25 0 0 1-.353 0l-1.061-1.06a.25.25 0 0 1 0-.354l8.132-8.132z" />
      </svg>
      <span class="url-text">{{ props.htmlUrl }}</span>
    </div>
  </a>
</template>

<style scoped>
/* ========== 卡片容器 ========== */
.link-card {
  display: block;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(18, 18, 18, 0.08);
  color: #2c323c;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
  cursor: pointer;
}

.link-card:hover {
  box-shadow: 3px 3px rgba(69, 171, 255, 0.548);
  color: #3273dc;
}

/* ========== 标题 ========== */
.link-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  word-break: break-word;
  background: linear-gradient(to right, #84b3ff, #84b3ff) no-repeat bottom left / 0% 2px;
  transition: background-size 0.3s ease;
}

.link-card:hover .link-title {
  background-size: 100% 2px;
}

/* ========== 链接行 ========== */
.link-url {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
}

.link-icon {
  flex-shrink: 0;
  color: #999;
  transition: color 0.2s;
}

.link-card:hover .link-icon {
  color: #3273dc;
}

.url-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
}

/* ========== 响应式 ========== */
@media (max-width: 640px) {
  .link-card {
    padding: 0.9rem 1rem;
    margin-bottom: 0.8rem;
  }

  .link-title {
    font-size: 1.15rem;
  }

  .link-url {
    font-size: 0.8125rem;
  }
}
</style>