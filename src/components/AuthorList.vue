<template>
    <div  class="grid mb-3 mt-5     md:mb-5 grid grid-cols-1 gap-4">
        <div v-for="(item, index) in state?.list" class="mb-3 shadow-sm rounded-lg border-b border-gray-200 border bg-white rounded-tr-lg">
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
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { faker } from '@faker-js/faker';
import { useStore } from 'vuex'

import helperGenerator from './helper/HelperGenerator'

export default {
    name: 'author',
    setup() {
        const isOpen = ref(false)
        const store = useStore()
        
        const state = reactive({
            list: []
        })

        const getList = computed(() => {
            return store.getters.getList
        })
    
        
        onMounted(async () => {
            await store.dispatch('fetchList')
            state.list = (new helperGenerator(getList.value)).getData()

        })

        return {
            state,
            isOpen,
            getList
        }
    }
}
</script>