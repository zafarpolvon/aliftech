<template>
    <div class="container px-4 md:mx-auto xl:mx-auto"> 
        <div class="flex justify-end mt-5">
            <a @click="state.isOpen = true" class="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Создать цитату</a>
        </div>
        <div class="grid grid-cols-8 gap-4 mt-5">
            <div class="col-span-8 xl:col-span-2 md:col-span-8">
                <div class="w-full bg-white border border-gray-200 rounded-lg shadow ">
                    <div class="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500  hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
                            <span class="sr-only">Open dropdown</span>
                            <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3721 4.65439C17.6415 4.23815 16.8052 4 15.9142 4C14.3444 4 12.9339 4.73924 12.003 5.89633C11.0657 4.73913 9.66 4 8.08626 4C7.19611 4 6.35789 4.23746 5.62804 4.65439C4.06148 5.54462 3 7.26056 3 9.24232C3 9.81001 3.08941 10.3491 3.25153 10.8593C4.12155 14.9013 9.69287 20 12.0034 20C14.2502 20 19.875 14.9013 20.7488 10.8593C20.9109 10.3491 21 9.81001 21 9.24232C21.0007 7.26056 19.9383 5.54462 18.3721 4.65439Z" fill="currentColor"/>
                            </svg>
                            </span>
                        </button>
                        <!-- Dropdown menu -->
                        
                    </div>
                    <div class="flex flex-col items-center pb-10">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="Bonnie image"/>
                        <h5 class="mb-1 text-xl font-medium text-gray-900 ">{{ state.author.author }}</h5>
                       
                        <span class="text-sm text-gray-500 mt-5">Создан в {{state.author.created_at}}</span>
                    </div>
                </div>
            </div>
            <div class="col-span-8 xl:col-span-6 md:col-span-8">
                <Quote-list :info="state.author" ref="updateChild" />
           </div>
        </div>
        <Create-quote v-if="state.isOpen" :info="state.author" :list="getQuotesList" :isOpen="state.isOpen"  @close="loadData" />
    </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import router from "@/router";
import moment from 'moment'
import QuoteList from "@/components/QuoteList.vue";
import CreateQuote from "@/components/CreateQuote.vue";

export default {
    components: {QuoteList, CreateQuote},
    setup() {
        const store = useStore()
        const updateChild = ref(null);
        const route = useRoute()
        const state = reactive({
            author: {},
            isOpen: false
        })
        const getQuotesList = computed(() => {
            return store.getters.getQuotesList
        })
        
        onMounted(async () => {
            loadData()
        })

        const loadData = async () => {
            const id = route.params.id
            state.isOpen = false
            state.author = await store.dispatch('fetchListById', id)
            state.list = await store.dispatch('fetchQuoteList', id)
            updateChild.value.state.list = getQuotesList.value
               
        }
        return {
            state,
            route,
            loadData,
            updateChild,
            getQuotesList
        }
    }
};
</script>