import { ref } from 'vue'
import type { AdModel } from '@/services/ads/model'

export function useModal() {
  const isOpen = ref(false)
  const selectedAd = ref<AdModel | null>(null)

  const open = (ad: AdModel) => {
    selectedAd.value = ad
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    selectedAd.value = null
  }

  return {
    isOpen,
    selectedAd,
    open,
    close
  }
}
