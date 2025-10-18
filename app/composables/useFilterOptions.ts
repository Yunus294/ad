import { ref, computed } from 'vue'
import { getAds } from '@/services/ads/ads'
import { RATING_OPTIONS } from '@/constants'

export function useFilterOptions() {
  const types = ref<string[]>([])
  const cities = ref<string[]>([])
  const ratings = ref<number[]>([...RATING_OPTIONS])

  const loadFilterOptions = () => {
    const ads = getAds()
    types.value = Array.from(new Set(ads.map(ad => ad.type)))
    cities.value = Array.from(new Set(ads.map(ad => ad.city)))
  }

  // Load options immediately when composable is created
  loadFilterOptions()

  const typeOptions = computed(() => 
    types.value.map(type => ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }))
  )

  const cityOptions = computed(() => 
    cities.value.map(city => ({ label: city, value: city }))
  )

  const ratingOptions = computed(() => 
    ratings.value.map(rating => ({ label: `${rating} stars`, value: rating }))
  )

  return {
    types,
    cities,
    ratings,
    typeOptions,
    cityOptions,
    ratingOptions,
    loadFilterOptions
  }
}
