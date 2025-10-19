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
        const byType = !props.filters.type || ad.type === props.filters.type
        const byCity = !props.filters.city || ad.city === props.filters.city
        const byPriceFrom = !props.filters.priceFrom || ad.price >= props.filters.priceFrom
        const byPriceTo = !props.filters.priceTo || ad.price <= props.filters.priceTo

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
    <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-gray-800 rounded-2xl overflow-hidden">
                <div class="h-56 bg-gray-700"></div>
                <div class="p-6 space-y-4">
                    <div class="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-700 rounded w-1/2"></div>
                    <div class="h-3 bg-gray-700 rounded w-2/3"></div>
                    <div class="flex justify-between">
                        <div class="h-6 bg-gray-700 rounded w-20"></div>
                        <div class="h-6 bg-gray-700 rounded w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="filteredAds.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="ad in filteredAds" :key="ad.id"
            class="group flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500/50 hover:shadow-blue-500/10">

            <div class="relative overflow-hidden">
                <img :src="ad.image" alt="destination"
                    class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />

                <div class="absolute top-3 left-3">
                    <span class="bg-blue-500/90 text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                        {{ ad.type }}
                    </span>
                </div>

                <div class="absolute top-3 right-3">
                    <div
                        class="flex items-center bg-green-500/90 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        <i class="ti ti-star-filled mr-1 text-xs"></i>
                        <span class="font-semibold">{{ ad.rating }}</span>
                    </div>
                </div>

                <div class="absolute bottom-3 right-3">
                    <button @click="handleLike(ad)"
                        class="p-2 px-3 rounded-full backdrop-blur-sm transition-all duration-200" :class="isAdLiked(ad.id)
                            ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                            : 'bg-black/30 text-white hover:bg-red-500/90'">
                        <i :class="isAdLiked(ad.id) ? 'ti ti-heart-filled' : 'ti ti-heart'" class="text-lg"></i>
                    </button>
                </div>
            </div>

            <div class="flex flex-col flex-1 p-6">
                <div class="mb-6">
                    <h2
                        class="text-white font-bold text-xl mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
                        {{ ad.title }}
                    </h2>

                    <div class="flex items-center text-gray-400 text-sm mb-3">
                        <i class="ti ti-map-pin mr-2 text-blue-400"></i>
                        <span>{{ ad.city }}, {{ ad.country }}</span>
                    </div>

                    <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        Beautiful {{ ad.type }} accommodation in {{ ad.city }}. Perfect for your next getaway with
                        modern amenities and stunning views.
                    </p>
                </div>

                <div class="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                    <div class="flex items-center text-gray-300">
                        <i class="ti ti-heart mr-2 text-red-400"></i>
                        <span class="text-sm font-medium">{{ ad.likes || 0 }} likes</span>
                    </div>
                    <div class="flex items-center text-gray-300">
                        <i class="ti ti-message-circle mr-2 text-blue-400"></i>
                        <span class="text-sm font-medium">{{ ad.comments.length }} comments</span>
                    </div>
                </div>

                <div class="mt-auto">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Starting from</p>
                            <p class="text-white font-bold text-3xl">${{ ad.price.toLocaleString() }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-gray-400 text-xs">per night</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="grid grid-cols-2 gap-3">
                            <UButton size="lg" color="primary" icon="i-heroicons-phone" label="Contact"
                                class="justify-center font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" />
                            <UButton size="lg" color="secondary" icon="i-heroicons-eye" label="View Details"
                                class="justify-center font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                @click="openViewModal(ad)" />
                        </div>

                        <UButton size="lg" color="neutral" icon="i-heroicons-chat-bubble-left-right" label="Comments"
                            class="w-full justify-center font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            @click="openCommentModal(ad)" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <div class="mb-6">
            <i class="ti ti-search text-6xl text-gray-600"></i>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">No ads found</h3>
        <p class="text-gray-400 text-lg">Try adjusting your filters to see more results</p>
    </div>

    <ViewModal v-if="viewModal.isOpen.value" :ad="viewModal.selectedAd.value" @close="viewModal.close" />

    <CommentModal v-if="commentModal.isOpen.value" :ad="commentModal.selectedAd.value" @close="commentModal.close"
        @commentAdded="handleCommentAdded" />
</template>
