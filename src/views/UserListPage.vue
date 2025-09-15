<template>
  <div class="user-list-page">
    <el-card class="box-card">
      <!-- 页面标题和操作区 -->
      <template #header>
        <div class="card-header">
          <span class="page-title">用户列表</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新建用户
          </el-button>
        </div>
      </template>

      <!-- 搜索和筛选区 -->
      <div class="filter-section">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索用户姓名或邮箱"
              clearable
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="statusFilter"
              placeholder="全部状态"
              clearable
              @change="handleFilter"
            >
              <el-option label="全部状态" value="" />
              <el-option label="激活" value="active" />
              <el-option label="未激活" value="inactive" />
              <el-option label="已暂停" value="suspended" />
            </el-select>
          </el-col>
        </el-row>
      </div>

      <!-- 用户列表表格 -->
      <el-table
        v-loading="loading"
        :data="paginatedUsers"
        stripe
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="name" label="用户" min-width="200">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :size="40" :src="row.avatar" />
              <div class="user-details">
                <div class="user-name">{{ row.name }}</div>
                <div class="user-id">ID: {{ row.id }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" sortable />

        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag
              :type="getStatusTagType(row.status)"
              size="small"
            >
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="role" label="角色" width="100" />

        <el-table-column prop="createdAt" label="创建时间" sortable width="120">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              text
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              text
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredUsers.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TableColumnCtx } from 'element-plus'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  status: 'active' | 'inactive' | 'suspended'
  role: string
  createdAt: string
}

const users = ref<User[]>([])
const loading = ref(false)
const searchKeyword = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUsers: User[] = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `用户${index + 1}`,
        email: `user${index + 1}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${index + 1}`,
        status: ['active', 'inactive', 'suspended'][index % 3] as User['status'],
        role: ['管理员', '普通用户', '编辑者'][index % 3],
        createdAt: new Date(2024, 0, index + 1).toISOString()
      }))
      resolve(mockUsers)
    }, 500)
  })
}

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchKeyword.value ||
      user.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.value.toLowerCase())

    const matchesStatus = !statusFilter.value || user.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredUsers.value.slice(start, end)
})

const getStatusText = (status: User['status']) => {
  const statusMap = {
    active: '激活',
    inactive: '未激活',
    suspended: '已暂停'
  }
  return statusMap[status]
}

const getStatusTagType = (status: User['status']) => {
  const typeMap = {
    active: 'success',
    inactive: 'info',
    suspended: 'danger'
  }
  return typeMap[status] as 'success' | 'info' | 'danger'
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleSortChange = ({ column, prop, order }: { column: TableColumnCtx<User>; prop: string; order: string }) => {
  console.log('排序变化:', { column, prop, order })
}

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  currentPage.value = 1
}

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage
}

const handleAdd = () => {
  ElMessage.info('新建用户功能待实现')
}

const handleEdit = (user: User) => {
  ElMessage.info(`编辑用户: ${user.name}`)
}

const handleDelete = async (user: User) => {
  try {
    await ElMessageBox.confirm(
      `确认删除用户 "${user.name}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    ElMessage.success(`用户 "${user.name}" 已删除`)
  } catch {
    ElMessage.info('已取消删除')
  }
}

onMounted(async () => {
  loading.value = true
  try {
    users.value = await fetchUsers()
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.user-list-page {
  height: 100%;
}

.box-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.filter-section {
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 500;
  color: #303133;
}

.user-id {
  font-size: 12px;
  color: #909399;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  margin-bottom: 0;
}

:deep(.el-card__body) {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
}

:deep(.el-table__body-wrapper) {
  flex: 1;
}
</style>