<script setup>
import { ref, computed } from 'vue'
import SummaryCard from '../components/SummaryCard.vue'
import BlogInfoCard from '../components/BlogInfoCard.vue'
import dataJson from '../assets/data.json'
import opmlJson from '../assets/opml.json'
import { ElPagination, ElButton } from 'element-plus'

// 分页相关状态
const currentPage = ref(1)
const itemsPerPage = ref(10)

// 计算当前页应该显示的数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return dataJson.slice(startIndex, endIndex)
})

// 分页控制方法
const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (val) => {
  itemsPerPage.value = val
  // 当页面大小改变时，确保回到第一页
  currentPage.value = 1
}

</script>

<template>
  <div id="container">
    <main>
      <div id="main">

        <article v-for="item in paginatedData" :key="item.link">
          <SummaryCard :props="item" />
        </article>

        <!-- 使用 Element Plus 的分页组件 -->
        <div class="pagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="itemsPerPage" :pager-count="5"
            :total="dataJson.length" :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"
            @current-change="handlePageChange" @size-change="handleSizeChange" />
        </div>


        <!-- 原始分页导航（保留作参考） -->
        <!--
        <div class="pagination">
          <button 
            class="pagination-button" 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            上一页
          </button>
          
          <button
            v-if="generatePageNumbers[0] > 1"
            class="pagination-button"
            @click="goToPage(1)"
          >
            1
          </button>
          
          <span v-if="generatePageNumbers[0] > 2" class="pagination-ellipsis">
            ...
          </span>
          
          <button
            v-for="page in generatePageNumbers"
            :key="page"
            class="pagination-button"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          
          <span 
            v-if="generatePageNumbers[generatePageNumbers.length - 1] < totalPages - 1" 
            class="pagination-ellipsis"
          >
            ...
          </span>
          
          <button
            v-if="generatePageNumbers[generatePageNumbers.length - 1] < totalPages"
            class="pagination-button"
            @click="goToPage(totalPages)"
          >
            {{ totalPages }}
          </button>
          
          <button 
            class="pagination-button" 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            下一页
          </button>
        </div>
        -->
      </div>
    </main>

    <aside>
      <div id="sidebar">

        <div id="sidebar-content"><span id="sidebar-title">博客列表</span>
          <template v-for="item in opmlJson">
            <BlogInfoCard :props="item" />
          </template>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
#container {
  margin-top: 70px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 5px;
  flex-wrap: wrap;
  padding: 20px 0;
  border-radius: 5px;
}

.pagination-button {
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 40px;
}

.el-pager li {
  margin: 0 2px;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f5f5f5;
  border-color: #999;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  background-color: #84b3ff;
  color: white;
  border-color: #84b3ff;
}

.pagination-ellipsis {
  padding: 8px 5px;
  color: #999;
}

#sidebar-title {
  font-size: x-large;
  font-weight: bolder;
  margin-bottom: 10px;
  display: block;
  color: #444950;
}
</style>