<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()
</script>

<template>
  <main
    id="app-layout"
    class="h-screen w-screen bg-primary text-white font-sans"
  >
    <header class="flex justify-between items-center p-4 w-full bg-primary">
      <div class="flex gap-4 items-center">
        <Button aria-label="menu" class="size-10">
          <i class="icon icon-menu" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NuxtLink href="/" class="font-bold uppercase hover:text-white p-2">
                Home
              </NuxtLink>
            </BreadcrumbItem>
            <template v-if="route.name !== 'index'">
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  class="font-bold uppercase text-gray-400 hidden md:block"
                >
                  {{ route.name.toString().replaceAll('-', ' ') }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div class="flex items-center gap-4">
        <Button aria-label="branch" class="scale-[0.9] hidden md:block">
          <i class="icon icon-code-branch-solid scale-75" />
        </Button>
        <Button aria-label="history" class="scale-[0.9] hidden md:block">
          <i class="icon icon-history scale-75" />
        </Button>
        <Button aria-label="notification" class="scale-[0.9]">
          <i class="icon icon-bell-regular scale-75" />
        </Button>
        <span
          class="relative bg-[#70C5B3] p-1 rounded-full flex-center size-7 text-sm hover:cursor-pointer"
        >
          JA
          <span
            class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 block rounded-full size-3 bg-[#4CAF50] border-2 border-black border-solid"
          ></span>
        </span>
      </div>
    </header>

    <div class="pt-[72px] -mt-[72px]">
      <slot />
    </div>
  </main>
</template>
