/* eslint-disable import/no-mutable-exports */
import { AppType, ProviderType } from '@/types/app'

const isDevelopment = process.env.NODE_ENV === 'development'

export let apiPrefix = ''
export let publicApiPrefix = ''

// NEXT_PUBLIC_API_PREFIX=/console/api NEXT_PUBLIC_PUBLIC_API_PREFIX=/api npm run start
if (process.env.NEXT_PUBLIC_API_PREFIX && process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX) {
  apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX
  publicApiPrefix = process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX
}
else if (
  globalThis.document?.body?.getAttribute('data-api-prefix')
  && globalThis.document?.body?.getAttribute('data-pubic-api-prefix')
) {
  // Not bulild can not get env from process.env.NEXT_PUBLIC_ in browser https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
  apiPrefix = globalThis.document.body.getAttribute('data-api-prefix') as string
  publicApiPrefix = globalThis.document.body.getAttribute('data-pubic-api-prefix') as string
}
else {
  if (isDevelopment) {
    apiPrefix = 'https://cloud.dify.dev/console/api'
    publicApiPrefix = 'https://dev.udify.app/api'
  }
  else {
    // const domainParts = globalThis.location?.host?.split('.');
    // in production env, the host is dify.app . In other env, the host is [dev].dify.app
    // const env = domainParts.length === 2 ? 'ai' : domainParts?.[0];
    apiPrefix = '/console/api'
    publicApiPrefix = '/api' // avoid browser private mode api cross origin
  }
}

export const API_PREFIX: string = apiPrefix
export const PUBLIC_API_PREFIX: string = publicApiPrefix

const EDITION = 'SELF_HOSTED'
// const EDITION = process.env.NEXT_PUBLIC_EDITION || globalThis.document?.body?.getAttribute('data-public-edition')
export const IS_CE_EDITION = EDITION === 'SELF_HOSTED'

export const MODEL_LIST = [
  { id: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo', type: AppType.chat },
  { id: 'gpt-3.5-turbo-16k', name: 'gpt-3.5-turbo-16k', type: AppType.chat },
  { id: 'gpt-4', name: 'gpt-4', type: AppType.chat }, // 8k version
  { id: 'claude-instant-1', name: 'claude-instant-1', type: AppType.chat, provider: ProviderType.anthropic }, // set 30k
  { id: 'claude-2', name: 'claude-2', type: AppType.chat, provider: ProviderType.anthropic }, // set 30k
  { id: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo', type: AppType.completion },
  { id: 'gpt-3.5-turbo-16k', name: 'gpt-3.5-turbo-16k', type: AppType.completion },
  { id: 'text-davinci-003', name: 'text-davinci-003', type: AppType.completion },
  { id: 'gpt-4', name: 'gpt-4', type: AppType.completion }, // 8k version
  { id: 'claude-instant-1', name: 'claude-instant-1', type: AppType.completion, provider: ProviderType.anthropic }, // set 30k
  { id: 'claude-2', name: 'claude-2', type: AppType.completion, provider: ProviderType.anthropic }, // set 30k
]
const UNIVERSAL_CHAT_MODEL_ID_LIST = ['gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-4', 'claude-2']
export const UNIVERSAL_CHAT_MODEL_LIST = MODEL_LIST.filter(({ id, type }) => UNIVERSAL_CHAT_MODEL_ID_LIST.includes(id) && (type === AppType.chat))
export const TONE_LIST = [
  {
    id: 1,
    name: 'Creative',
    config: {
      temperature: 0.8,
      top_p: 0.9,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    },
  },
  {
    id: 2,
    name: 'Balanced',
    config: {
      temperature: 0.5,
      top_p: 0.85,
      presence_penalty: 0.2,
      frequency_penalty: 0.3,
    },
  },
  {
    id: 3,
    name: 'Precise',
    config: {
      temperature: 0.2,
      top_p: 0.75,
      presence_penalty: 0.5,
      frequency_penalty: 0.5,
    },
  },
  {
    id: 4,
    name: 'Custom',
  },
]

export const DEFAULT_CHAT_PROMPT_CONFIG = {
  prompt: [],
}

export const DEFAULT_COMPLETION_PROMPT_CONFIG = {
  prompt: {
    text: '',
  },
  conversation_histories_role: {
    user_prefix: '',
    assistant_prefix: '',
  },
}

export const getMaxToken = (modelId: string) => {
  return (modelId === 'gpt-4' || modelId === 'gpt-3.5-turbo-16k') ? 8000 : 4000
}

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
export const DEFAULT_PARAGRAPH_VALUE_MAX_LEN = 1000

export const zhRegex = /^[\u4E00-\u9FA5]$/m
export const emojiRegex = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/m
export const emailRegex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/m
const MAX_ZN_VAR_NAME_LENGHT = 8
const MAX_EN_VAR_VALUE_LENGHT = 30
export const getMaxVarNameLength = (value: string) => {
  if (zhRegex.test(value))
    return MAX_ZN_VAR_NAME_LENGHT

  return MAX_EN_VAR_VALUE_LENGHT
}

export const MAX_VAR_KEY_LENGHT = 30

export const MAX_PROMPT_MESSAGE_LENGTH = 10

export const VAR_ITEM_TEMPLATE = {
  key: '',
  name: '',
  type: 'string',
  max_length: DEFAULT_VALUE_MAX_LEN,
  required: true,
}

export const appDefaultIconBackground = '#D5F5F6'

export const NEED_REFRESH_APP_LIST_KEY = 'needRefreshAppList'

export const DATASET_DEFAULT = {
  top_k: 2,
  score_threshold: 0.5,
}

export const APP_PAGE_LIMIT = 10

export const ANNOTATION_DEFAULT = {
  score_threshold: 0.9,
}
