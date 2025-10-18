<script lang="ts" setup></script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
    <div
      class="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <img
        src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
        alt="destination"
        class="w-full h-48 object-cover"
      />

      <div class="flex flex-col flex-1 justify-between p-5">
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-white font-semibold text-2xl">Destination</h2>
            <div class="flex items-center bg-green-500/90 text-white text-sm px-3 py-1 rounded-full">
              <i class="ti ti-star-filled mr-1"></i>
              <span>4.0</span>
            </div>
          </div>
          <p class="text-gray-400 text-sm mb-4 line-clamp-2">
            A wonderful place to relax and enjoy nature. Perfect for family trips and weekends.
          </p>
        </div>

        <div class="mt-auto">
          <div class="flex justify-between items-center mb-4">
            <p class="text-gray-300 font-medium text-lg">Price:</p>
            <p class="text-white font-bold text-xl">$1,000</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <UButton
              size="xl"
              color="primary"
              icon="i-heroicons-hand-thumb-up"
              label="Like"
              class="justify-center font-medium"
            />
            <UButton
              size="xl"
              color="secondary"
              icon="i-heroicons-phone"
              label="Call"
              class="justify-center font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
