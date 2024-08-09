<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
</script>

<template>
  <Dialog>
    <DialogTrigger
      aria-label="create new shipping note"
      class="bg-blue-900 hover:bg-blue-900/50 flex gap-2 px-4 h-9 flex-center rounded-md"
    >
      <i class="icon icon-plus-solid scale-75" />
      <span class="uppercase font-semibold">Create new shipping note</span>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-4">Create new shipping note</DialogTitle>
        <DialogDescription>
          <form class=" space-y-6">
            <FormField name="username">
              <FormItem>
                <FormControl>
                  <Textarea />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter><Button type="submit" class="px-4"> Submit </Button></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
