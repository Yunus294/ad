<script lang="ts" setup>
import { ref, computed } from "vue";
import { addComment } from "@/services/ads/api";
import type { AdModel, Comment } from "@/services/ads/model";

const props = defineProps<{
  ad: AdModel | null;
}>();

const emit = defineEmits(["close", "commentAdded"]);

const newComment = ref("");
const isSubmitting = ref(false);
const localComments = ref<Comment[]>([]);

const comments = computed(() => {
  if (props.ad) {
    localComments.value = [...(props.ad.comments || [])];
  }
  return localComments.value;
});

async function handleSubmitComment() {
  if (!newComment.value.trim() || !props.ad) return;

  isSubmitting.value = true;

  try {
    addComment(props.ad.id, newComment.value.trim());

    const newCommentObj: Comment = {
      id: crypto.randomUUID(),
      text: newComment.value.trim(),
      author: "User",
      createdAt: new Date(),
    };
    localComments.value.push(newCommentObj);

    newComment.value = "";
    emit("commentAdded");
  } catch (error) {
    console.error("Error adding comment:", error);
  } finally {
    isSubmitting.value = false;
    handleClose();
  }
}

function handleClose() {
  emit("close");
}

function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Unknown time";
  }

  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
</script>

<template>
  <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click="handleClose">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl" @click.stop>
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h2 class="font-bold text-gray-900 text-xl flex items-center gap-2">
            <i class="ti ti-message-circle text-blue-500"></i>
            Comments
          </h2>
          <p class="text-gray-500 text-sm">{{ props.ad?.title }}</p>
        </div>
        <button @click="handleClose" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <i class="ti ti-x text-gray-400 text-[20px]"></i>
        </button>
      </div>

      <div class="p-6 max-h-96 overflow-y-auto">
        <div v-if="comments.length === 0" class="text-center py-8">
          <i class="ti ti-message-off text-gray-300 text-[48px] mb-4"></i>
          <p class="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="comment in comments" :key="comment.id" class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <div
                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{
                  comment.author ? comment.author.charAt(0).toUpperCase() : "?"
                }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-gray-900">{{
                    comment.author || "Anonymous"
                  }}</span>
                  <span class="text-gray-400 text-sm">•</span>
                  <span class="text-gray-400 text-sm">
                    <i class="ti ti-clock mr-1"></i>{{ formatDate(comment.createdAt) }}
                  </span>
                </div>
                <p class="text-gray-700">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-gray-100 bg-gray-50">
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <i class="ti ti-pencil"></i> Add a comment
            </label>
            <textarea v-model="newComment" placeholder="Share your thoughts about this task..." rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
          </div>

          <div class="flex gap-3">
            <button @click="handleClose"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <i class="ti ti-x"></i> Close
            </button>
            <button @click="handleSubmitComment" :disabled="!newComment.trim() || isSubmitting"
              class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              <i class="ti ti-send"></i>
              {{ isSubmitting ? "Posting..." : "Post Comment" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
