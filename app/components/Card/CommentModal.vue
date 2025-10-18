<script lang="ts" setup>
import { ref, computed } from "vue"
import { addComment } from "@/services/ads/api"
import type { AdModel, Comment } from "@/services/ads/model"

const props = defineProps<{
  ad: AdModel | null
}>()

const emit = defineEmits(["close", "commentAdded"])

const newComment = ref("")
const isSubmitting = ref(false)
const localComments = ref<Comment[]>([])

const comments = computed(() => {
  if (props.ad) {
    localComments.value = [...(props.ad.comments || [])]
  }
  return localComments.value
})

async function handleSubmitComment() {
  if (!newComment.value.trim() || !props.ad) return

  isSubmitting.value = true

  try {
    addComment(props.ad.id, newComment.value.trim())
    // Refresh local comments to show the new one
    localComments.value = [...(props.ad.comments || [])]
    newComment.value = ""
    emit("commentAdded")
  } catch (error) {
    console.error("Error adding comment:", error)
  } finally {
    isSubmitting.value = false
  }
}

function handleClose() {
  emit("close")
}

function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="handleClose">
    <div class="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl" @click.stop>
      <div class="p-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-white font-bold text-2xl">Comments</h2>
            <p class="text-gray-400">{{ props.ad?.title }}</p>
          </div>
          <button @click="handleClose" class="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <i class="ti ti-x text-xl text-gray-400"></i>
          </button>
        </div>
      </div>

      <div class="p-6 max-h-96 overflow-y-auto">
        <div v-if="comments.length === 0" class="text-center py-8">
          <i class="ti ti-message-circle text-4xl text-gray-600 mb-4"></i>
          <p class="text-gray-400">No comments yet. Be the first to comment!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="comment in comments" :key="comment.id" class="bg-gray-800/50 p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <div
                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ comment.author.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-white font-medium">{{ comment.author }}</span>
                  <span class="text-gray-400 text-sm">•</span>
                  <span class="text-gray-400 text-sm">{{ formatDate(comment.createdAt) }}</span>
                </div>
                <p class="text-gray-300">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-gray-700">
        <div class="space-y-4">
          <div>
            <label class="block text-white font-medium mb-2">Add a comment</label>
            <UTextarea v-model="newComment" placeholder="Share your thoughts about this property..." :rows="3"
              class="w-full" />
          </div>

          <div class="flex gap-3">
            <UButton size="lg" color="secondary" label="Cancel" variant="outline" class="flex-1 justify-center"
              @click="handleClose" />
            <UButton size="lg" color="primary" label="Post Comment" class="flex-1 justify-center"
              :loading="isSubmitting" :disabled="!newComment.trim()" @click="handleSubmitComment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
