<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useAdFilters } from "../composables/useAds"
import { APP_CONFIG } from "@/constants"
import type { FilterState } from "@/services/ads/model"
import FilterDrawer from "@/components/Filter/Drawer.vue"
import Filter from "@/components/Filter/index.vue"

const { filters, updateFilters } = useAdFilters()
const showFilterDrawer = ref(false)
const isPageLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isPageLoading.value = false
    }, APP_CONFIG.PAGE_LOADING_DELAY)
})

function handleHeaderSearch(query: string) {
    updateFilters({ title: query })
}

function handleToggleLiked(showLikedOnly: boolean) {
    updateFilters({ showLikedOnly })
}

function handleToggleFilterDrawer() {
    showFilterDrawer.value = !showFilterDrawer.value
}

function handleFilterChange(newFilters: Partial<FilterState>) {
    updateFilters(newFilters)
}

function handleCloseDrawer() {
    showFilterDrawer.value = false
}
</script>
<template>
    <div v-if="isPageLoading" class="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-gray-700 text-xl font-medium">Loading {{ APP_CONFIG.APP_NAME }}...</p>
        </div>
    </div>

    <div v-else class="min-h-screen bg-gray-50 p-4 ">
        <Header @search="handleHeaderSearch" @toggleLiked="handleToggleLiked"
            @toggleFilterDrawer="handleToggleFilterDrawer" />

        <div class="hidden md:flex gap-8 mt-8 w-full">
            <div class="w-1/4 flex-shrink-0">
                <Filter @applyFilter="handleFilterChange" />
            </div>
            <div class="flex-1 min-w-0">
                <Card :filters="filters" />
            </div>
        </div>

        <div class="md:hidden mt-8 w-full">
            <div class="container mx-auto pb-8">
                <Card :filters="filters" />
            </div>
        </div>

        <FilterDrawer v-if="showFilterDrawer" @applyFilter="handleFilterChange" @close="handleCloseDrawer" />
    </div>
</template>
