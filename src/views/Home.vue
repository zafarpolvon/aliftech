<template>
  <div class="home">
    <div class="container px-4 md:container md:mx-auto xl:mx-auto mt-8">
      <div class="flex justify-between items-center">
        <div class="mr-0 xl:mr-4 md:mr-4 w-full">
          <input v-model="state.search" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Поиск по тексту и по автору цитаты " required>
        </div>
        <div class="w-full flex justify-end">
          <router-link
          tag="a"
          :to="{ name: 'Create' }"
          class="text-white dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 bg-blue-700 focus:outline-none "
          >
          Создать
        </router-link>
        </div>
      </div>
        <div  class="grid mb-3 mt-5 md:mb-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div v-for="(item, index) in filteredQuotes" class="mb-3 shadow-sm rounded-lg border-b border-gray-200 border bg-white rounded-tr-lg">
              <figure  :key="index" class="flex flex-col items-center justify-center p-8 text-center ">
                  <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                      <h3 class="text-lg font-semibold text-gray-900">{{ item?.quote?.text }}</h3>
                      <div class="text-sm font-light text-gray-500 mt-2">
                          Обновлено в {{ item?.quote?.updated_at }}
                      </div>
                  </blockquote>
                  <figcaption class="flex items-center justify-center space-x-3">
                      <img class="rounded-full w-14 h-14" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture">
                      <div class="space-y-0.5 font-medium text-left">
                          <div>{{ item.author }}</div>
                          <div class="text-sm font-light text-gray-500">
                              <div v-for="inItem in item?.quote?.genre">{{ inItem?.display }}</div>
                          </div>
                      </div>
                  </figcaption>
                  <div class="mt-5">
                      <router-link :to="{ name: 'Show', params: { id: item.id }, }" :key="item.id" class="text-white bg-gradient-to-r flex from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Посмотреть<span class="svg-icon svg-icon-muted svg-icon-2hx ml-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 4L18 12L10 20H14L21.3 12.7C21.7 12.3 21.7 11.7 21.3 11.3L14 4H10Z" fill="currentColor"/>
                              <path opacity="0.3" d="M3 4L11 12L3 20H7L14.3 12.7C14.7 12.3 14.7 11.7 14.3 11.3L7 4H3Z" fill="currentColor"/>
                          </svg>
                          </span>
                      </router-link>
                  </div>    
              </figure>
          </div>
      </div>
      
      </div>
      
  </div>
</template>

<script>
// @ is an alias to /src

import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from 'vuex'
import helperGenerator from './helper/HelperGenerator'
export default {
  name: "HomeView",
  
  setup() {
    const store = useStore()

    const state = reactive({
      list: [],
      search: ''
    })
    const getList = computed(() => {
        return store.getters.getList
    })
    const filteredQuotes = computed(() => {
      const filtered = state.list.filter(book => {
        const textMatch = !state.search || book?.text?.some(text => text.text.toLowerCase().includes(state.search.toLowerCase()));
        const authorMatch = !state.search || book?.author?.toLowerCase().includes(state.search.toLowerCase());
        return textMatch || authorMatch;
      });
      return filtered;

    })

    onMounted(async () => {
      loadData()
    });
    const loadData = async () => {
      await store.dispatch('fetchList')
      state.list = (new helperGenerator(getList.value)).getData()
    } 
    return {
      getList,
      state,
      filteredQuotes
    }
  }
};
</script>
