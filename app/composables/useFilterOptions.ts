import { ref, computed } from 'vue'
import { getFilterOptions } from '@/services/ads/api'

export function useFilterOptions() {
  const categories = ref<string[]>([])
  const cities = ref<string[]>([])
  const ratings = ref<number[]>([1, 2, 3, 4, 5])

  const loadFilterOptions = () => {
    const options = getFilterOptions()
    categories.value = options.categories.map(opt => opt.value)
    cities.value = options.cities.map(opt => opt.value)
  }

  loadFilterOptions()

  const typeOptions = computed(() => {
    const options = getFilterOptions()
    return options.categories
  })

  const cityOptions = computed(() => {
    const options = getFilterOptions()
    return options.cities
  })

  const ratingOptions = computed(() => {
    const options = getFilterOptions()
    return options.ratings
  })

  return {
    categories,
    cities,
    ratings,
    typeOptions,
    cityOptions,
    ratingOptions,
    loadFilterOptions
  }
}
