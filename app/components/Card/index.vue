<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useAds } from "../../composables/useAds"
import { useModal } from "../../composables/useModal"
import type { FilterState, AdModel } from "@/services/ads/model"
import ViewModal from "./ViewModal.vue"
import CommentModal from "./CommentModal.vue"

const { ads, isLoading, loadAds, refreshAds, handleLike, isAdLiked } = useAds()
const viewModal = useModal()
const commentModal = useModal()

onMounted(() => {
  loadAds()
})

function openViewModal(ad: AdModel) {
  viewModal.open(ad)
}

function openCommentModal(ad: AdModel) {
  commentModal.open(ad)
}

function handleCommentAdded() {
  refreshAds()
}

const props = defineProps<{
  filters: FilterState
}>()

const filteredAds = computed(() => {
  return ads.value.filter(ad => {
    const byType = !props.filters.type || ad.category === props.filters.type
    const byCity = !props.filters.city || ad.city === props.filters.city

    const price = (ad as any).price
    const hasPrice = typeof price === "number"
    const byPriceFrom = !props.filters.priceFrom || (hasPrice && price >= props.filters.priceFrom)
    const byPriceTo = !props.filters.priceTo || (hasPrice && price <= props.filters.priceTo)

    const byRating = !props.filters.ratings ||
      !Array.isArray(props.filters.ratings) ||
      props.filters.ratings.length === 0 ||
      props.filters.ratings.includes(Math.floor(ad.rating))

    const byTitle = !props.filters.title ||
      props.filters.title.trim() === "" ||
      ad.title.toLowerCase().includes(props.filters.title.toLowerCase())

    const byLiked = !props.filters.showLikedOnly || isAdLiked(ad.id)

    return byType && byCity && byPriceFrom && byPriceTo && byRating && byTitle && byLiked
  })
})
</script>

<template>
  <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in 6" :key="i" class="animate-pulse">
      <div class="task-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div class="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div class="flex gap-2">
            <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="h-5 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="filteredAds.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="ad in filteredAds"
      :key="ad.id"
      class="task-card p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      @click="openViewModal(ad)"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <img
            :src="ad.author?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`"
            :alt="ad.author?.name || 'User'"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span class="font-semibold text-sm text-gray-900">{{ ad.author?.name || 'Anonymous' }}</span>
        </div>
        <div class="flex gap-2">
          <div class="text-red-500 bg-red-200 px-2 py-1 rounded-full"><i class="ti ti-flag-filled text-red-600"></i> {{ ad.priority || Math.floor(Math.random() * 9) + 1 }}</div>
          <div class="text-green-700 bg-[#a6cf80] px-2 py-1 rounded-full"><i class="ti ti-star-filled text-green-800"></i> {{ ad.rating || Math.floor(Math.random() * 5) + 1 }}</div>
        </div>
      </div>

      <!-- Основной текст -->
      <div class="mb-4">
        <h3 class="font-bold text-gray-900 text-lg mb-2">{{ ad.title }}</h3>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <span class="mr-1">👤</span>
          <span>{{ ad.category || 'General' }}</span>
        </div>
        <div class="flex items-center text-gray-500 text-sm">
          <span class="mr-1">📍</span>
          <span>{{ ad.city }}</span>
        </div>
      </div>

      <!-- Нижняя строка (дата и срок) -->
      <div class="flex items-center justify-between text-gray-500 text-sm mb-4">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ ad.startDate || '25.05' }} - {{ ad.endDate || '28.05' }}, 2025</span>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ ad.duration || '4 days' }}</span>
        </div>
      </div>

      <!-- Лайки и комментарии -->
      <div class="flex items-center justify-start gap-6 pt-4 border-t border-gray-100" @click.stop>
        <button
          @click="handleLike(ad)"
          class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-base font-medium"
          :class="{ 'text-red-500': isAdLiked(ad.id) }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{{ ad.likes || 0 }}</span>
        </button>

        <button
          @click="openCommentModal(ad)"
          class="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-base font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{{ ad.comments?.length || 0 }}</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="flex flex-col items-center justify-center py-16 text-center">
    <div class="mb-6">
      <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
    <p class="text-gray-500">Try adjusting your filters to see more results</p>
  </div>

  <ViewModal
    v-if="viewModal.isOpen.value"
    :ad="viewModal.selectedAd.value"
    @close="viewModal.close"
  />

  <CommentModal
    v-if="commentModal.isOpen.value"
    :ad="commentModal.selectedAd.value"
    @close="commentModal.close"
    @commentAdded="handleCommentAdded"
  />
</template>
