<script lang="ts" setup>
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])

</script>

<template>
    <div class="p-4 flex-col md:flex border justify-center hidden rounded-lg border-gray-700">
        <p class="font-medium text-xl ">Filter</p>
        <div class="flex flex-col gap-2 mt-4">
            <p>Ad type</p>
            <USelect :items="items" :clearable="true" size="xl" placeholder="select ad type" />
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <p>Price</p>
            <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col gap-1">
                    <p class="text-base font-light">From</p>
                    <UInput placeholder="$" />
                </div>
                <div class="flex flex-col gap-1">
                    <p class="text-base font-light">To</p>
                    <UInput placeholder="$" />
                </div>

            </div>
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <p>City</p>
            <USelect :items="items" :clearable="true" size="xl" placeholder="select City " />
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <p>Features</p>
            <UCheckboxGroup :items="items" />
        </div>
        <div class="grid grid-cols-2 mt-4 gap-2">
            <UButton size="xl" color="secondary" label="Clean" variant="outline"
                class="flex justify-center items-center" />

            <UButton size="xl" color="primary" label="Filter" variant="outline"
                class="flex justify-center items-center" />
        </div>

    </div>

</template>
