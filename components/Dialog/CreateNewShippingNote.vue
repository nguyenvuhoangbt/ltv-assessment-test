<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'


const formSchema = toTypedSchema(z.object({
  note: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})


</script>

<template>
  <Dialog>
    <DialogTrigger
      aria-label="create new shipping note"
      class="bg-blue-900 hover:bg-blue-900/50 flex gap-2 px-4 h-9 flex-center rounded-md sm:w-fit duration-200"
    >
      <i class="icon icon-plus-solid scale-75" />
      <span class="uppercase font-semibold">Create new shipping note</span>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-4 text-white">Create new shipping note</DialogTitle>
        <DialogDescription>
          <form class=" space-y-6">
            <FormField name="note">
              <FormItem>
                <FormControl>
                  <Textarea class="text-white min-h-40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter><Button type="submit" class="px-4 bg-blue-900 hover:bg-blue-900/50"> Submit </Button></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
