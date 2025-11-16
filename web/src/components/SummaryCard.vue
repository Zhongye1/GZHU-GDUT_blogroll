<script setup>
import { ref, watch } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  props: {
    type: Object,
    required: true
  }
})

// 美化日期：2025-11-05 → Nov 16, 2025
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '未知时间') return '未知时间'

  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// 只净化 summary
const cleanSummary = ref('')

// 净化函数（仅作用于 summary）
const sanitizeSummary = (raw) => {
  if (!raw || typeof raw !== 'string') {
    return '<p class="summary-empty">暂无摘要</p>'
  }

  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'a', 'span', 'div',
      'mjx-container', 'mjx-math', 'mjx-mrow', 'mjx-mi', 'mjx-mo', 'mjx-mn'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'src', 'alt'],
    FORBID_TAGS: ['script', 'style', 'iframe'],
    ADD_ATTR: ['target', 'rel']
  }

  const html = DOMPurify.sanitize(raw, config)

  // 保留完整 MathJax
  if (html.includes('mjx-container')) {
    return html
  }

  // 普通摘要：去标签 + 截断 180 字
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const max = 180
  const truncated = text.length > max ? text.slice(0, max) + '…' : text
  return `<p class="summary-text">${truncated}</p>`
}

// 监听 summary 变化（支持异步加载）
watch(
  () => props.props?.summary,
  (val) => {
    cleanSummary.value = sanitizeSummary(val)
  },
  { immediate: true }
)
</script>

<template>
  <article class="summary-card" :key="props.props.link">
    <!-- 标题（安全直接渲染） -->
    <h3 class="summary-title">
      <a :href="props.props.link" target="_blank" rel="noopener noreferrer">
        {{ props.props.title || '无标题' }}
      </a>
    </h3>

    <!-- 作者 + 时间 -->
    <!-- GitHub Badge 风格 -->
    <div class="github-badges">
      <a :href="props.props.htmlUrl" target="_blank" rel="noopener noreferrer" class="badge badge-author">
        {{ props.props.name }}
      </a>
      <span class="badge badge-updated">
        Updated {{ formatDate(props.props.pubDateYYMMDD) }}
      </span>
    </div>

    <!-- 摘要（仅此部分使用 v-html + 净化） -->
    <div class="summary-content">
      <div v-html="cleanSummary"></div>
      <a :href="props.props.link" target="_blank" rel="noopener noreferrer" class="summary-more">[查看更多]</a>
    </div>
  </article>
</template>

<style scoped>
/* 卡片容器 */
.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem 1.8rem;
  margin: 0 1.2rem 1.5rem;
  box-shadow: 0 4px 12px rgba(18, 18, 18, 0.08);
  transition: all 0.2s ease;
  overflow: hidden;
}

.summary-card:hover {
  box-shadow: 6px 6px rgba(69, 171, 255, 0.736);
}

/* 标题 */
.summary-title {
  margin: 0 0 0.8rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  word-break: break-word;
}

.summary-title a {
  color: #2c323c;
  text-decoration: none;
  background: linear-gradient(to right, #84b3ff, #84b3ff) no-repeat bottom left / 0% 2px;
  transition: background-size 0.3s ease, color 0.2s;
}

.summary-title a:hover {
  color: #3273dc;
  background-size: 100% 2px;
}

/* 元信息 */
.summary-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.summary-name,
.summary-time {
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}

.summary-name {
  background: #84b3ff;
}

.summary-time {
  background: #a0a0a0;
}

/* 内容区（仅 v-html 作用域） */
.summary-content {
  line-height: 1.7;
  color: #2c323c;
  font-size: 1rem;
}

/* 样式隔离：只影响 v-html 内容 */
.summary-content :deep(p),
.summary-content :deep(.summary-text) {
  margin: 0.5em 0;
}

.summary-content :deep(h4) {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0.8em 0 0.4em;
  color: #444;
}

.summary-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.8em 0;
  font-size: 0.9em;
  overflow-x: auto;
  display: block;
  white-space: nowrap;
}

.summary-content :deep(th),
.summary-content :deep(td) {
  border: 1px solid #ddd;
  padding: 0.4em 0.6em;
  text-align: left;
}

.summary-content :deep(th) {
  background: #f7f7f7;
}

.summary-content :deep(mjx-container) {
  display: block !important;
  overflow-x: auto;
  margin: 0.8em 0;
  padding: 0.5em;
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 1em;
  white-space: normal !important;
}

.summary-content :deep(.summary-empty) {
  color: #999;
  font-style: italic;
}

/* 查看更多 */
.summary-more {
  display: inline-block;
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #3273dc;
  font-weight: 500;
  text-decoration: none;
}

.summary-more:hover {
  color: #1e5bb8;
  text-decoration: underline;
}

/* 响应式 */
@media (max-width: 640px) {
  .summary-card {
    margin: 0 0.8rem 1.2rem;
    padding: 1.2rem 1.4rem;
  }

  .summary-title {
    font-size: 1.5rem;
  }
}


/* GitHub 风格元信息 */
.github-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
  font-size: 0.8125rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  line-height: 1.4;
}

.badge-author {
  background-color: #1d7eed;
  color: #ffffff;
}


.badge-updated {
  background-color: #f6f8fa;
  color: #57606a;
  border: 1px solid #d0d7de;
}
</style>