<template>
  <div class="flex items-center gap-4 justify-between">
    <div class="flex gap-2 items-center">
      <p class="text-2xl font-bold  justify-center hidden md:flex">AdMind</p>
      <i class="ti ti-ad-filled text-5xl text-green-500 hidden md:inline"></i>

      <i class="ti ti-filter p-3 border rounded-xl border-gray-600   md:hidden cursor-pointer"></i>
    </div>

    <UInput placeholder="Search..." size="xl" class="w-[400px] max-w-full sm:max-w-[300px] md:max-w-[400px]" />

    <i class="ti ti-heart text-2xl p-2 border border-gray-600 rounded-xl"></i>
  </div>
</template>
