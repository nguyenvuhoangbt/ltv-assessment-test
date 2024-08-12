<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'

const router = useRouter()
</script>

<template>
  <div class="w-full text-center">
    <Button
      class="px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-900/50 duration-200 font-semibold"
      aria-label="Go to Transit Shipping Notes Worklist"
      @click="router.push('/transit-shipping-notes-worklist')"
    >
      Transit Shipping Notes Worklist
    </Button>
  </div>
</template>
