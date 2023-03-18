<template>
    <div class="fixed z-40 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity z-40" @click="onClose">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="bg-white w-full xl:w-6/12 md:w-2/5 rounded-lg z-50 overflow-hidden shadow-xl p-6">
          <div class="mb-4">
            <slot name="header"></slot>
          </div>
          <div>
            <slot></slot>
          </div>
          <div class="mt-4 flex justify-end">
            <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-3" @click="onClose">Закрыть</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" @click="deleteItem">Удалить</button>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
      isOpen: Boolean
    },
    emits: {
      close: () => true
    },
    methods: {
      onClose() {
        this.$emit('close')
      },
      deleteItem() {
        this.$emit('deleteItem')
      }
    }
  })
  </script>