```vue-vue

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <NuxtLayout>
    <template #header> Transit shipping notes worklist </template>

    <Tabs default-value="transit-notes">
      <TabsList>
        <TabsTrigger value="pinned"> Pinned </TabsTrigger>
        <TabsTrigger value="transit-notes"> Transit notes </TabsTrigger>
        <TabsTrigger value="draft"> Drafts </TabsTrigger>
      </TabsList>

      <div class="bg-gray">
        <TabsContent value="pinned"> Content pinned here. </TabsContent>

        <TabsContent value="transit-notes">
          <DataTable />
        </TabsContent>

        <TabsContent value="draft"> Content draft here. </TabsContent>
      </div>
    </Tabs>
  </NuxtLayout>
</template>
