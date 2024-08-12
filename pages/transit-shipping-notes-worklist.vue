<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X } from 'lucide-vue-next'
</script>

<template>
  <Tabs default-value="transit-notes" class="h-full flex flex-col">
    <TabsList class="justify-start">
      <TabsTrigger value="pinned" class="h-9">
        <i
          class="icon icon-thumbtack-solid scale-[0.6] mr-2"
          :style="
            `filter: brightness(0) saturate(100%) invert(35%) sepia(97%)
              saturate(3041%) hue-rotate(209deg) brightness(104%) contrast(100%);`
          "
        />
        Pinned (4)
        <X class="size-4 text-gray-400 hover:text-white ml-3" @click.prevent/>
      </TabsTrigger>
      <TabsTrigger value="transit-notes"> Transit notes </TabsTrigger>
      <TabsTrigger value="draft"> Drafts </TabsTrigger>
    </TabsList>

    <div class="bg-gray flex-1">
      <TabsContent value="pinned"> Content pinned here. </TabsContent>

      <TabsContent value="transit-notes" class="h-full">
        <DataTable />
      </TabsContent>

      <TabsContent value="draft"> Content draft here. </TabsContent>
    </div>
  </Tabs>
</template>
