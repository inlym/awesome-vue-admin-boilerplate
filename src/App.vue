<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const isCollapse = ref(false)

const menuItems = [
  {
    index: 'home',
    title: '首页',
    icon: 'House',
    path: '/'
  },
  {
    index: 'user',
    title: '用户管理',
    icon: 'User',
    children: [
      {
        index: 'user-list',
        title: '用户列表',
        path: '/user/list'
      }
    ]
  },
  {
    index: 'about',
    title: '关于',
    icon: 'InfoFilled',
    path: '/about'
  }
]

interface MenuItem {
  index: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

const handleMenuSelect = (index: string) => {
  const item = findMenuItemByIndex(index, menuItems)
  if (item?.path) {
    router.push(item.path)
  }
}

const findMenuItemByIndex = (index: string, items: MenuItem[]): MenuItem | null => {
  for (const item of items) {
    if (item.index === index) {
      return item
    }
    if (item.children) {
      const found = findMenuItemByIndex(index, item.children)
      if (found) return found
    }
  }
  return null
}

const handleLogout = () => {
  console.log('退出登录')
}
</script>

<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <el-button
          text
          @click="isCollapse = !isCollapse"
          class="collapse-btn"
        >
          <el-icon size="20">
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
        </el-button>
        <h1 class="title">Vue 管理后台</h1>
      </div>

      <div class="header-right">
        <el-dropdown @command="handleLogout">
          <span class="user-info">
            <el-avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <span class="username">管理员</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 左侧菜单栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          @select="handleMenuSelect"
          router
          class="sidebar-menu"
        >
          <template v-for="item in menuItems" :key="item.index">
            <!-- 有子菜单的项 -->
            <el-sub-menu v-if="item.children" :index="item.index">
              <template #title>
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.path"
                :route="child.path"
              >
                {{ child.title }}
              </el-menu-item>
            </el-sub-menu>

            <!-- 单独菜单项 -->
            <el-menu-item v-else :index="item.path" :route="item.path">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <!-- 主要内容区 -->
      <el-main class="main-content">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 60px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  padding: 8px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #606266;
}

.username {
  font-size: 14px;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  background: #fff;
  border-right: 1px solid #e4e7ed;
  transition: width 0.3s;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
  overflow-y: auto;
}

.main-content {
  background: #f5f7fa;
  padding: 16px;
  overflow-y: auto;
  flex: 1;
  min-width: 0;
}
</style>
