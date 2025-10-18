export const APP_CONFIG = {
  APP_NAME: 'AdMind',
  LOADING_DELAY: 800,
  PAGE_LOADING_DELAY: 1000,
  SEARCH_DEBOUNCE: 10,
  MAX_COMMENTS_DISPLAY: 10
} as const

export const STORAGE_KEYS = {
  ADS_DATA: 'ads_data',
  USER_LIKED_ADS: 'user_liked_ads'
} as const

export const AD_TYPES = ['hotel', 'villa', 'apartment', 'house'] as const

export const RATING_OPTIONS = [1, 2, 3, 4, 5] as const

export const PRICE_RANGE = {
  MIN: 50,
  MAX: 5000
} as const

export const RATING_RANGE = {
  MIN: 1,
  MAX: 5
} as const
