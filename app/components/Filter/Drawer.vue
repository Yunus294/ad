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
}

function handleClose() {
  emit("close")
}
</script>

<template>

  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" @click="handleClose"></div>


  <div class="fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 z-50 md:hidden">
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <h2 class="text-xl font-semibold text-white">Filters</h2>
      <button @click="handleClose" class="p-2 hover:bg-gray-800 rounded-lg transition-colors">
        <i class="ti ti-x text-xl text-gray-400"></i>
      </button>
    </div>

    <div class="p-4 space-y-6 overflow-y-auto h-full pb-24">
      <div class="space-y-2">
        <p class="text-white font-medium">Ad type</p>
        <USelect v-model="selectedType" :items="typeOptions" option-attribute="label" value-attribute="value" clearable size="xl" placeholder="Select ad type" />
      </div>

      <div class="space-y-2">
        <p class="text-white font-medium">Price</p>
        <div class="grid grid-cols-2 gap-2">
          <UInput v-model.number="priceFrom" placeholder="From $" size="xl" />
          <UInput v-model.number="priceTo" placeholder="To $" size="xl" />
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-white font-medium">City</p>
        <USelect v-model="selectedCity" :items="cityOptions" option-attribute="label" value-attribute="value" clearable size="xl" placeholder="Select city" />
      </div>

      <div class="space-y-2">
        <p class="text-white font-medium">Rating</p>
        <div class="space-y-2">
          <UCheckbox v-for="rating in ratingOptions" :key="'rating-' + rating.value" :model-value="selectedRatings.includes(rating.value)"
            :label="rating.label" size="lg"
            @update:model-value="(checked) => toggleRating(rating.value, checked as any)" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
      <div class="grid grid-cols-2 gap-3">
        <UButton size="xl" color="secondary" label="Clear" variant="outline" class="justify-center"
          @click="clearFilter" />
        <UButton size="xl" color="primary" label="Apply" variant="solid" class="justify-center" @click="applyFilter" />
      </div>
    </div>
  </div>
</template>
