<script lang="ts" setup>
import { ref } from "vue"
import type { AdModel } from "@/services/ads/model"

const props = defineProps<{
  ad: AdModel | null
}>()

const emit = defineEmits(["close"])

function handleClose() {
  emit("close")
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="handleClose">
    <div class="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" @click.stop>
      <div class="relative">
        <img :src="props.ad?.image" :alt="props.ad?.title" class="w-full h-80 object-cover" />

        <button @click="handleClose"
          class="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
          <i class="ti ti-x text-xl"></i>
        </button>

        <div class="absolute top-4 left-4">
          <span class="bg-blue-500/90 text-white text-sm font-medium px-4 py-2 rounded-full capitalize">
            {{ props.ad?.type }}
          </span>
        </div>

        <div class="absolute bottom-4 right-4">
          <div class="flex items-center bg-green-500/90 text-white px-4 py-2 rounded-full backdrop-blur-sm">
            <i class="ti ti-star-filled mr-2"></i>
            <span class="font-semibold text-lg">{{ props.ad?.rating }}</span>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="mb-6">
          <h1 class="text-white font-bold text-3xl mb-3">{{ props.ad?.title }}</h1>

          <div class="flex items-center text-gray-400 text-lg mb-4">
            <i class="ti ti-map-pin mr-3 text-blue-400"></i>
            <span>{{ props.ad?.city }}, {{ props.ad?.country }}</span>
          </div>

          <p class="text-gray-300 text-lg leading-relaxed">
            Experience the perfect blend of comfort and luxury in this beautiful {{ props.ad?.type }} located in the
            heart of {{ props.ad?.city }}.
            This stunning accommodation offers modern amenities, breathtaking views, and easy access to local
            attractions.
            Perfect for both business and leisure travelers seeking an unforgettable stay.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gray-800/50 p-4 rounded-lg text-center">
            <i class="ti ti-wifi text-2xl text-blue-400 mb-2"></i>
            <p class="text-white text-sm">Free WiFi</p>
          </div>
          <div class="bg-gray-800/50 p-4 rounded-lg text-center">
            <i class="ti ti-car text-2xl text-green-400 mb-2"></i>
            <p class="text-white text-sm">Parking</p>
          </div>
          <div class="bg-gray-800/50 p-4 rounded-lg text-center">
            <i class="ti ti-snowflake text-2xl text-cyan-400 mb-2"></i>
            <p class="text-white text-sm">Air Conditioning</p>
          </div>
          <div class="bg-gray-800/50 p-4 rounded-lg text-center">
            <i class="ti ti-swimming text-2xl text-blue-400 mb-2"></i>
            <p class="text-white text-sm">Pool Access</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div class="flex gap-6 mb-4 md:mb-0">
            <div class="flex items-center text-gray-300">
              <i class="ti ti-heart mr-2 text-red-400"></i>
              <span>{{ props.ad?.likes || 0 }} likes</span>
            </div>
            <div class="flex items-center text-gray-300">
              <i class="ti ti-message-circle mr-2 text-blue-400"></i>
              <span>{{ props.ad?.comments.length }} comments</span>
            </div>
          </div>

          <div class="text-right">
            <p class="text-gray-400 text-sm">Starting from</p>
            <p class="text-white font-bold text-4xl">${{ props.ad?.price.toLocaleString() }}</p>
            <p class="text-gray-400 text-sm">per night</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <UButton size="xl" color="primary" icon="i-heroicons-phone" label="Contact Owner"
            class="flex-1 justify-center font-medium" />
          <UButton size="xl" color="secondary" icon="i-heroicons-heart" label="Add to Favorites"
            class="flex-1 justify-center font-medium" />
        </div>
      </div>
    </div>
  </div>
</template>
