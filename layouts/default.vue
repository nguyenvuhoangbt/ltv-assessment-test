<template>
  <div id="app-layout" class="h-screen bg-primary text-white font-sans">
    <main>
      <div class="flex justify-between items-center mb-4 p-4">
        <div class="flex items-center gap-4">
          <Button aria-label="menu">
            <i class="icon icon-menu-regular" />
          </Button>
          <span class="font-bold uppercase">Home</span>
          <span class="scale-50 brightness-50">
            <i class="icon icon-next-arrow" />
          </span>
          <h1 class="font-bold uppercase text-gray-400">
            <slot name="header" />
          </h1>
        </div>

        <div class="flex items-center gap-4">
          <Button aria-label="branch" class="scale-[0.9]">
            <i class="icon icon-code-branch-solid scale-75" />
          </Button>
          <Button aria-label="history" class="scale-[0.9]">
            <i class="icon icon-history-regular scale-75" />
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
      </div>
      <slot />
    </main>
  </div>
</template>