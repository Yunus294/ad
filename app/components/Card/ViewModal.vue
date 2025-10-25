<script lang="ts" setup>
import { ref } from "vue";
import type { AdModel } from "@/services/ads/model";

const props = defineProps<{
  ad: AdModel | null;
}>();

const emit = defineEmits(["close"]);

function handleClose() {
  emit("close");
}
</script>

<template>
  <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click="handleClose">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl" @click.stop>
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <img :src="props.ad?.author?.avatar ||
            `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1
            }`
            " :alt="props.ad?.author?.name || 'User'" class="w-10 h-10 rounded-full object-cover" />
          <div>
            <h2 class="font-semibold text-gray-900">
              {{ props.ad?.author?.name || "Anonymous" }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ props.ad?.category || "General" }}
            </p>
          </div>
        </div>

        <button @click="handleClose" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <i class="ti ti-x text-gray-400 text-[20px]"></i>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div>
          <h1 class="font-bold text-gray-900 text-2xl mb-2">
            {{ props.ad?.title }}
          </h1>
          <div class="flex items-center text-gray-500 text-sm mb-4">
            <i class="ti ti-map-pin mr-2"></i>
            <span>{{ props.ad?.city }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <i class="ti ti-calendar text-gray-500"></i>
              <span class="text-sm font-medium text-gray-700">Duration</span>
            </div>
            <p class="text-gray-900 font-semibold">
              {{ props.ad?.duration || "4 days" }}
            </p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <i class="ti ti-clock text-gray-500"></i>
              <span class="text-sm font-medium text-gray-700">Priority</span>
            </div>
            <div class="flex gap-2">
              <div class="text-red-500 bg-red-200 px-2 py-1 rounded-full flex items-center gap-1">
                <i class="ti ti-flag-filled text-red-600"></i>
                {{ props?.ad?.priority || Math.floor(Math.random() * 9) + 1 }}
              </div>
              <div class="text-green-700 bg-[#a6cf80] px-2 py-1 rounded-full flex items-center gap-1">
                <i class="ti ti-star-filled text-green-800"></i>
                {{ props?.ad?.rating || Math.floor(Math.random() * 5) + 1 }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Task Description</h3>
          <p class="text-gray-600 leading-relaxed">
            {{
              props.ad?.description ||
              "This task requires attention to detail and professional execution. The client is looking for someone reliable and experienced to complete this work efficiently."
            }}
          </p>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-1 text-gray-500">
              <i class="ti ti-heart text-[16px]"></i>
              <span class="text-sm font-medium">{{ props.ad?.likes || 0 }} likes</span>
            </div>
            <div class="flex items-center gap-1 text-gray-500">
              <i class="ti ti-message-dots text-[16px]"></i>
              <span class="text-sm font-medium">{{ props.ad?.comments?.length || 0 }} comments</span>
            </div>
          </div>
        </div>

        <button
          class="flex-1 w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          <i class="ti ti-send mr-2"></i>
          Contact Task Owner
        </button>
      </div>
    </div>
  </div>
</template>
