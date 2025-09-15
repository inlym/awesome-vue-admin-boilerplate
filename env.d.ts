/// <reference types="vite/client" />

/**
 * 环境变量类型定义
 *
 * 为 Vite 项目中的环境变量提供 TypeScript 类型支持
 * 这样可以在代码中安全地使用 import.meta.env.VITE_* 变量
 */
interface ImportMetaEnv {
  /** API 基础地址 - 用于配置所有HTTP请求的基础URL */
  readonly VITE_BASE_URL: string
}

/**
 * 扩展 ImportMeta 接口以包含环境变量类型
 *
 * 使用方式：
 * const apiUrl = import.meta.env.VITE_BASE_URL
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
