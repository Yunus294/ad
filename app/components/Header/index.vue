<script lang="ts" setup>
import { ref, watch } from "vue"
import { APP_CONFIG } from "@/constants"

const searchQuery = ref("")
const showLikedOnly = ref(false)
const emit = defineEmits(["search", "toggleLiked", "toggleFilterDrawer"])

let searchTimeout: ReturnType<typeof setTimeout> | null = null

function handleSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout)
    }

    searchTimeout = setTimeout(() => {
        emit("search", searchQuery.value.trim())
    }, APP_CONFIG.SEARCH_DEBOUNCE)
}

function toggleLikedFilter() {
    showLikedOnly.value = !showLikedOnly.value
    emit("toggleLiked", showLikedOnly.value)
}

function toggleFilterDrawer() {
    emit("toggleFilterDrawer")
}

watch(searchQuery, () => {
    handleSearch()
})
</script>

<template>
    <div class="flex items-center gap-4 justify-between p-4 bg-gray-900 border border-gray-700 rounded-xl">
        <div class="flex gap-3 items-center">
            <i class="ti ti-ad-filled text-4xl text-green-500"></i>
            <p class="text-2xl font-bold text-white hidden md:flex">{{ APP_CONFIG.APP_NAME }}</p>
        </div>

        <div class="flex-1 max-w-lg">
            <UInput v-model="searchQuery" placeholder="Search destinations..." size="lg" variant="outline"
                class="w-full" :loading="searchQuery.length > 0" icon="i-heroicons-magnifying-glass" />
        </div>

        <div class="flex gap-2">
            <UButton variant="ghost"
                :icon="showLikedOnly ? 'i-heroicons-heart-solid text-red-500' : 'i-heroicons-heart'"
                class="hidden md:flex" @click="toggleLikedFilter" />
            <UButton variant="ghost" icon="i-heroicons-bell" class="hidden md:flex" />
            <UButton variant="ghost" icon="i-heroicons-bars-3" class="md:hidden" @click="toggleFilterDrawer" />
        </div>
    </div>
</template>
