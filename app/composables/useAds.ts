import { ref, computed } from 'vue'
import { getAds } from '@/services/ads/ads'
import { toggleLike, isLiked } from '@/services/ads/api'
import { APP_CONFIG } from '@/constants'
import type { AdModel, FilterState } from '@/services/ads/model'

export function useAds() {
  const ads = ref<AdModel[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const loadAds = async () => {
    try {
      isLoading.value = true
      error.value = null
      await new Promise(resolve => setTimeout(resolve, APP_CONFIG.LOADING_DELAY))
      ads.value = getAds()
    } catch (err) {
      error.value = 'Failed to load ads'
      console.error('Error loading ads:', err)
    } finally {
      isLoading.value = false
    }
  }

  const refreshAds = () => {
    ads.value = getAds()
  }

  const handleLike = (ad: AdModel) => {
    toggleLike(ad.id)
    refreshAds()
  }

  const isAdLiked = (adId: string) => isLiked(adId)

  return {
    ads,
    isLoading,
    error,
    loadAds,
    refreshAds,
    handleLike,
    isAdLiked
  }
}

export function useAdFilters() {
  const filters = ref<FilterState>({
    type: null,
    city: null,
    priceFrom: null,
    priceTo: null,
    ratings: null,
    title: '',
    showLikedOnly: false
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      type: null,
      city: null,
      priceFrom: null,
      priceTo: null,
      ratings: null,
      title: '',
      showLikedOnly: false
    }
  }

  return {
    filters,
    updateFilters,
    clearFilters
  }
}
