<template>
    <div class="fixed z-40 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div class="fixed inset-0 transition-opacity z-40" @click="onClose">
                <div class="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div>
                
            </div>
            <div class="bg-white w-full xl:w-2/5 md:w-2/5 rounded-lg z-50 overflow-hidden shadow-xl p-6">
                <form @submit.prevent="submitHandler" action="">
                    <div class="flex justify-between">
                        <div>
                            <h4 class="text-blue-500 text-xl font-bold">Изменить цитату</h4>
                        </div>
                        
                    </div>
                    
                    <div class="mt-3">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Жанр</label>
                        <v-select v-model="state.genre" :clearable="false" :multiple="true" :options="getGendreList" label="display" ></v-select>
                        
                       
                    </div>
                    <div class="mt-3">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Текст</label>
                        <textarea v-model="state.text" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-3" @click="onClose">Отмена</button>
                        <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2">Сохранить</button>
                    </div>
                </form>
                <!-- <div class="mt-4 flex justify-end">
                    
                </div> -->
            </div>
        </div>
    </div>
  </template>
  
<script>
import { ref, reactive, onMounted, computed, } from "vue";
import Multiselect from 'vue-multiselect'
import { useStore } from 'vuex'
import { faker } from '@faker-js/faker';
import moment from 'moment'
  
export default {
    props: {
        isOpen: Boolean,
        info: null,
        id: null
    },
    components: {Multiselect},
    setup(props, { emit }) {
        const store = useStore()
        const state = reactive({
            text: '',
            genre: ''
        })
        const getGendreList = computed(() => {
            return store.getters.getGendreList
        })
        
        onMounted(async () => {
            loadData()

            await store.dispatch('fetchGenre')
        })
        const loadData = () => {
            state.text = props.info.text
            state.genre = props.info.genre
            // state.genre = faker.datatype.number({min: 1, max: 3})
        }
        const submitHandler = async () => {
            const load = {
                id: props.id,
                quote_id: props.info.id,
                text: state.text,
                genre: state.genre,
                created_at: props.info.created_at,
                updated_at: moment().format('DD MM YYYY, hh:mm')
            }

            await store.dispatch('updateQuote', load)

            emit('close')
        }

        return {
            state,
            loadData,
            getGendreList,
            submitHandler
        }
    },
    emits: {
        close: () => true
    },
    methods: {
        onClose() {
            this.$emit('close')
        }
    }
}
  </script>