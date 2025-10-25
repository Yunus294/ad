<script lang="ts" setup>
import { ref, watch } from "vue"
import { APP_CONFIG } from "@/constants"

const searchQuery = ref("")
const showLikedOnly = ref(false)
const emit = defineEmits(["search", "toggleLiked", "toggleFilterDrawer"])

let searchTimeout: ReturnType<typeof setTimeout> | null = null

function handleSearch() {
    if (searchTimeout) clearTimeout(searchTimeout)
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

watch(searchQuery, handleSearch)
</script>

<template>
    <div
        class="flex items-center justify-between md:p-4 md:bg-white md:border md:border-gray-200 rounded-xl md:shadow-sm md:gap-4">
        <div class="hidden md:flex gap-3 items-center">
            <i class="ti ti-ad-filled text-4xl text-green-600"></i>
            <p class="text-2xl font-bold text-gray-900">{{ APP_CONFIG.APP_NAME }}</p>
        </div>

        <div class="flex-1 border border-gray-300 bg-gray-100 rounded-lg p-4 md:p-3 flex items-center gap-2 
             md:max-w-lg w-full">
            <input v-model="searchQuery" type="text" placeholder="Search tasks…"
                class="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base" />
        </div>

        <div class="hidden md:flex gap-2">
            <UButton variant="ghost"
                :icon="showLikedOnly ? 'i-heroicons-heart-solid text-red-500' : 'i-heroicons-heart'"
                class="hover:bg-gray-100" @click="toggleLikedFilter" />
        </div>

        <UButton variant="solid" icon="i-heroicons-bars-3"
            class="md:hidden bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2 p-[18px]" @click="toggleFilterDrawer" />
    </div>
</template>
