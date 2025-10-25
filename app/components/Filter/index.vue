<script lang="ts" setup>
import { ref } from "vue"
import { useFilterOptions } from "../../composables/useFilterOptions"
import type { FilterState } from "@/services/ads/model"

const emit = defineEmits(["applyFilter"])

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
    applyFilter()
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
}

function clearFilter() {
    selectedType.value = undefined
    selectedCity.value = undefined
    selectedRatings.value = []
    priceFrom.value = null
    priceTo.value = null
    applyFilter()
}
</script>

<template>
    <div class="p-6 border rounded-xl border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
        <div class="flex items-center gap-3 mb-6">
            <i class="ti ti-filter text-2xl text-blue-600"></i>
            <p class="font-bold text-xl text-gray-900">Filters</p>
        </div>


        <div class="space-y-6">
            <div class="space-y-2">
                <p class="text-gray-700 font-medium">Type</p>
                <USelect v-model="selectedType" :items="typeOptions" option-attribute="label" value-attribute="value"
                    clearable size="lg" placeholder="Select ad type"
                    class="w-full text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    :ui="{
                        base: 'bg-white border border-gray-300 rounded-lg',
                    }" />
            </div>

            <div class="space-y-2">
                <p class="text-gray-700 font-medium">Price</p>
                <div class="grid grid-cols-2 gap-2">
                    <UInput v-model.number="priceFrom" placeholder="From $" size="lg"
                        class="w-full text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        :ui="{ base: 'bg-white text-black  border border-gray-300 rounded-lg' }" />
                    <UInput v-model.number="priceTo" placeholder="To $" size="lg"
                        class="w-full text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        :ui="{ base: 'bg-white text-black border border-gray-300 rounded-lg' }" />
                </div>
            </div>

            <div class="space-y-2">
                <p class="text-gray-700 font-medium">City</p>
                <USelect v-model="selectedCity" :items="cityOptions" option-attribute="label" value-attribute="value"
                    clearable size="lg" placeholder="Select city"
                    class="w-full text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    :ui="{
                        base: 'bg-white border border-gray-300 rounded-lg',
                    }" />
            </div>

            <div class="space-y-2">
                <p class="text-gray-700 font-medium">Rating</p>
                <div class="space-y-2">
                    <UCheckbox v-for="rating in ratingOptions" :key="'rating-' + rating.value"
                        :model-value="selectedRatings.includes(rating.value)" :label="rating.label" size="lg"
                        class="text-black font-light" :ui="{
                            base: 'text-black',
                            label: 'text-black',
                            wrapper: 'items-center gap-2'
                        }" @update:model-value="(checked) => toggleRating(rating.value, checked as any)" />
                </div>
            </div>

            <div class="mt-4 grid gap-2 grid-cols-2">
                <UButton size="lg" color="secondary" label="Clear Filters" variant="outline"
                    class="w-full justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                    @click="clearFilter" />
                <UButton size="lg" color="primary" label="Apply" variant="solid"
                    class="w-full justify-center bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                    @click="applyFilter" />
            </div>
        </div>
    </div>
</template>
