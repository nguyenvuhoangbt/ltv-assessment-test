<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <Tabs default-value="transit-notes" class="h-full flex flex-col">
    <TabsList class="justify-start">
      <TabsTrigger value="pinned"> Pinned </TabsTrigger>
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
