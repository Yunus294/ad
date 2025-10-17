<script lang="ts" setup></script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <div class="flex flex-col">
            <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700"
                alt="" class="w-full h-44 object-cover rounded-t-lg" />
            <div class="bg-gray-900 border  border-gray-700 rounded-b-lg p-4">
                <div class="flex justify-between items-center">
                    <p class="text-whtie font-semibold text-2xl">dest</p>
                    <div class="bg-green-500 text-sm px-2 rounded-full py-1">4 <i class="ti ti-star-filled"></i></div>
                </div>
                <p class="text-sm text-gray-500">description</p>
                <div class="flex justify-between items-center">
                    <p class="text-white font-medium text-lg">price:</p>
                    <p class="text-white font-medium text-xl">1,000$</p>
                </div>
                <div class="grid grid-cols-1 mt-4 gap-2">
                    <UButton size="xl" color="primary" icon="i-heroicons-hand-thumb-up" label="Like"
                        class="flex justify-center items-center text-white" />
                    <UButton size="xl" color="secondary" icon="i-heroicons-phone" label="Call"
                        class="flex justify-center items-center text-white" />
                </div>
            </div>
        </div>
    </div>
</template>
