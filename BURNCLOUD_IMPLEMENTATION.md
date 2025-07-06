# Burncloud 供应商实现

这个实现为 Agent TARS 项目添加了一个新的供应商 **burncloud**，支持多种先进的大语言模型。

## 实现概述

### 1. 新增的文件

- `multimodal/llm-client/src/handlers/burncloud.ts` - Burncloud 供应商处理器

### 2. 修改的文件

- `multimodal/llm-client/src/models.ts` - 添加 burncloud 模型定义
- `multimodal/llm-client/src/chat/index.ts` - 添加类型定义
- `multimodal/llm-client/src/handlers/utils.ts` - 注册 burncloud 处理器

## 支持的模型

Burncloud 供应商支持以下模型：

### Claude 系列
- `claude-sonnet-4-20250514` - 最新的 Claude Sonnet 4 模型
- `claude-3-7-sonnet-20250219` - Claude 3.7 Sonnet 模型
- `claude-3-5-sonnet-20241022` - Claude 3.5 Sonnet 模型

### GPT 系列
- `gpt-4o` - GPT-4 Omni 模型
- `gpt-4o-mini` - GPT-4 Omni Mini 模型
- `o1` - OpenAI O1 模型
- `gpt-4.5-preview` - GPT-4.5 Preview 模型
- `o1-mini` - OpenAI O1 Mini 模型
- `gpt-image-1` - GPT 图像模型

### Gemini 系列
- `gemini-2.5-pro-preview-05-06` - Gemini 2.5 Pro Preview 模型

### DeepSeek 系列
- `deepseek-r1` - DeepSeek R1 模型
- `deepseek-v3` - DeepSeek V3 模型

## 功能支持

### 流式响应
支持以下模型的流式响应：
- Claude 系列：`claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-sonnet-20241022`
- GPT 系列：`gpt-4o`, `gpt-4o-mini`, `gpt-4.5-preview`, `o1-mini`, `gpt-image-1`
- Gemini 系列：`gemini-2.5-pro-preview-05-06`
- DeepSeek 系列：`deepseek-r1`, `deepseek-v3`

### JSON 输出
支持以下模型的 JSON 模式输出：
- Claude 系列：`claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-sonnet-20241022`
- GPT 系列：`gpt-4o`, `gpt-4o-mini`, `gpt-4.5-preview`, `o1-mini`
- Gemini 系列：`gemini-2.5-pro-preview-05-06`
- DeepSeek 系列：`deepseek-r1`, `deepseek-v3`

### 图像输入
支持以下模型的图像输入：
- Claude 系列：`claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-sonnet-20241022`
- GPT 系列：`gpt-4o`, `gpt-4o-mini`, `gpt-4.5-preview`, `gpt-image-1`
- Gemini 系列：`gemini-2.5-pro-preview-05-06`
- DeepSeek 系列：`deepseek-v3`

### 函数调用
支持以下模型的函数调用：
- Claude 系列：`claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-sonnet-20241022`
- GPT 系列：`gpt-4o`, `gpt-4o-mini`, `gpt-4.5-preview`, `o1-mini`
- Gemini 系列：`gemini-2.5-pro-preview-05-06`
- DeepSeek 系列：`deepseek-r1`, `deepseek-v3`

## 配置

### API 密钥
可以通过以下方式配置 API 密钥：
1. 在代码中直接传入 `apiKey` 选项
2. 设置环境变量 `BURNCLOUD_API_KEY`

### API 端点
Burncloud 供应商使用以下 API 端点：
- 基础 URL：`https://ai.burncloud.com/v1`
- 兼容 OpenAI API 格式

## 使用示例

```typescript
import { LLMChat } from '@multimodal/llm-client';

// 初始化客户端
const llmChat = new LLMChat({
  apiKey: 'your-burncloud-api-key', // 或设置 BURNCLOUD_API_KEY 环境变量
});

// 基本对话
const response = await llmChat.completions.create({
  provider: 'burncloud',
  model: 'claude-sonnet-4-20250514',
  messages: [
    {
      role: 'user',
      content: 'Hello, how are you?',
    },
  ],
});

// 流式响应
const stream = await llmChat.completions.create({
  provider: 'burncloud',
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: 'Write a short poem about AI',
    },
  ],
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.choices[0]?.delta?.content) {
    process.stdout.write(chunk.choices[0].delta.content);
  }
}
```

## 实现细节

### 架构
- 继承自 `BaseHandler` 类
- 使用 OpenAI SDK 进行 API 调用
- 支持所有 OpenAI 兼容的功能

### 特性
- 完全兼容 OpenAI API 格式
- 支持流式和非流式响应
- 支持多模态输入（文本、图像）
- 支持函数调用和工具使用
- 支持 JSON 模式输出

### 环境变量
- `BURNCLOUD_API_KEY` - Burncloud API 密钥

## 分支信息

此实现在分支 `feat/burncloud` 中完成。

## 提交的更改

1. 新增 `burncloud.ts` 处理器文件
2. 在 `models.ts` 中添加 burncloud 模型定义
3. 在 `chat/index.ts` 中添加类型定义
4. 在 `utils.ts` 中注册 burncloud 处理器

所有更改都保持了与现有代码架构的一致性，并遵循了项目的编码标准。