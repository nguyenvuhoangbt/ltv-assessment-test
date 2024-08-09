<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();

useHead({
  title: "Transit Shipping Notes",
  meta: [{ name: "description", content: "My amazing site." }],
});
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtPage />
  </ConfigProvider>
</template>
