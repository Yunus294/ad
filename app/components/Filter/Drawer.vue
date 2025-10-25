<script lang="ts" setup>
import { ref } from "vue"
import { useFilterOptions } from "../../composables/useFilterOptions"
import type { FilterState } from "@/services/ads/model"

const emit = defineEmits(["applyFilter", "close"])

const { typeOptions, cityOptions, ratingOptions } = useFilterOptions()

const selectedType = ref<string | undefined>(undefined)
const selectedCity = ref<string | undefined>(undefined)
const selectedRatings = ref<number[]>([])
const priceFrom = ref<number | null>(null)
const priceTo = ref<number | null>(null)

function toggleRating(rating: number, checked: boolean) {
  if (checked) {
    if (!selectedRatings.value.includes(rating)) {
      selectedRatings.value.push(rating)
    }
  } else {
    selectedRatings.value = selectedRatings.value.filter(r => r !== rating)
  }
}

function applyFilter() {
  const filters: Partial<FilterState> = {
    type: selectedType.value ?? null,
    city: selectedCity.value ?? null,
    ratings: selectedRatings.value.length > 0 ? selectedRatings.value : null,
    priceFrom: priceFrom.value,
    priceTo: priceTo.value,
    title: "",
    showLikedOnly: false
  }
  emit("applyFilter", filters)
  emit("close")
}

function clearFilter() {
  selectedType.value = undefined
  selectedCity.value = undefined
  selectedRatings.value = []
  priceFrom.value = null
  priceTo.value = null
  const filters: Partial<FilterState> = {
    type: null,
    city: null,
    ratings: null,
    priceFrom: null,
    priceTo: null,
    title: "",
    showLikedOnly: false
  }
  emit("applyFilter", filters)
  handleClose()
}

function handleClose() {
  emit("close")
}
</script>

<template>
  <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" @click="handleClose"></div>

  <div class="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 md:hidden shadow-xl">
    <div class="flex items-center justify-between p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900">Filters</h2>
      <button @click="handleClose" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div class="p-6 space-y-6 overflow-y-auto h-full pb-24">
      <div class="space-y-3">
        <label class="block text-gray-700 font-medium">Task Category</label>
        <select v-model="selectedType"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Categories</option>
          <option v-for="option in typeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="space-y-3">
        <label class="block text-gray-700 font-medium">Priority Level</label>
        <div class="grid grid-cols-2 gap-3">
          <input v-model.number="priceFrom" type="number" placeholder="Min Priority" min="1" max="9"
            class="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <input v-model.number="priceTo" type="number" placeholder="Max Priority" min="1" max="9"
            class="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      <div class="space-y-3">
        <label class="block text-gray-700 font-medium">City</label>
        <select v-model="selectedCity"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Cities</option>
          <option v-for="option in cityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="space-y-3">
        <label class="block text-gray-700 font-medium">Rating</label>
        <div class="space-y-2">
          <label v-for="rating in ratingOptions" :key="'rating-' + rating.value" class="flex items-center">
            <input type="checkbox" :checked="selectedRatings.includes(rating.value)"
              @change="(e) => toggleRating(rating.value, (e.target as HTMLInputElement).checked)"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span class="ml-3 text-gray-700">{{ rating.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-100">
      <div class="grid grid-cols-1 gap-3">
        <button @click="clearFilter"
          class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Clear All
        </button>
        <button @click="applyFilter"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>
