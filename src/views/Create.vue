<template>
    <div class="container px-4 md:px-auto xl:mx-auto"> 
        
        <form @submit.prevent="submitHandler" action="">
            <div class="mt-4 grid grid-cols-6 gap-4">
                <div class="col-start-0 xl:col-start-2 md:col-start-2 col-span-6 md:col-span-4 xl:col-span-4 bg-gray-200 p-4 rounded-xl">
                    <div class="flex justify-between">
                        <div>
                            <h4 class="text-blue-500 text-xl font-bold">Генерация цитат</h4>
                        </div>
                        <div>
                            <span @click="loadData" class="text-white bg-blue-500 cursor-pointer flex hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2">
                                <span class="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5 20.7259C14.6 21.2259 14.2 21.826 13.7 21.926C13.2 22.026 12.6 22.0259 12.1 22.0259C9.5 22.0259 6.9 21.0259 5 19.1259C1.4 15.5259 1.09998 9.72592 4.29998 5.82592L5.70001 7.22595C3.30001 10.3259 3.59999 14.8259 6.39999 17.7259C8.19999 19.5259 10.8 20.426 13.4 19.926C13.9 19.826 14.4 20.2259 14.5 20.7259ZM18.4 16.8259L19.8 18.2259C22.9 14.3259 22.7 8.52593 19 4.92593C16.7 2.62593 13.5 1.62594 10.3 2.12594C9.79998 2.22594 9.4 2.72595 9.5 3.22595C9.6 3.72595 10.1 4.12594 10.6 4.02594C13.1 3.62594 15.7 4.42595 17.6 6.22595C20.5 9.22595 20.7 13.7259 18.4 16.8259Z" fill="currentColor"/>
                                        <path opacity="0.3" d="M2 3.62592H7C7.6 3.62592 8 4.02592 8 4.62592V9.62589L2 3.62592ZM16 14.4259V19.4259C16 20.0259 16.4 20.4259 17 20.4259H22L16 14.4259Z" fill="currentColor"/>
                                    </svg>
                                </span>
                                <span class="ml-2">Генерация</span>
                            </span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Автор</label>
                        <input v-model="state.author" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required>
                    </div>
                    <div class="mt-3">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Жанр</label>
                        <v-select v-model="state.genre" :clearable="false" :multiple="true" :options="getGendreList" label="display" ></v-select>
                        
                        <!-- {{ state.genre }} -->
                        <!-- <select v-model="state.genre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option v-bind:value="item.id" v-for="(item, index) in getGendreList" :key="index">{{ item.display }}</option>
                        </select> -->
                    </div>
                    <div class="mt-3">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Текст</label>
                        <textarea v-model="state.text" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button  type="submit" class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2">Сохранить</button>
                    </div>
                </div>
                
            </div>
        </form>
    </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from 'vuex'
import { faker } from '@faker-js/faker';
import moment from 'moment'
import router from "@/router";
import Multiselect from 'vue-multiselect'

export default {
    components: { Multiselect },
    setup() {
        const store = useStore()
        const getGendreList = computed(() => {
            return store.getters.getGendreList
        })
        const state = reactive({
            list: [],
        })
        
        onMounted(async () => {
            await store.dispatch('fetchGenre')
            loadData()

        })

        const loadData = () => {
            state.author = faker.name.fullName()
            state.text = faker.lorem.sentence(20)
            state.genre = [getGendreList.value[0]]
            // state.genre = faker.datatype.number({min: 1, max: 3})
        }
        const submitHandler = async () => {
            const info = {
                id: faker.datatype.uuid(),
                text: [
                    {
                        id: faker.datatype.uuid(),
                        text: state.text,
                        genre: state.genre,
                        created_at: moment().format('DD MM YYYY, hh:mm'),
                        updated_at: moment().format('DD MM YYYY, hh:mm')
                    }
                ],
                author: state.author,
                created_at: moment().format('DD MM YYYY, hh:mm'),
                updated_at: moment().format('DD MM YYYY, hh:mm')
            }
            await store.dispatch('updateGenre', info)
            router.push({ name: "home" });
        }

        const generateQuote = () => {
            const info = {
                id: faker.datatype.uuid(),
                text: faker.lorem.text()
            }
        }
        return {
            state,
            loadData,
            submitHandler,
            generateQuote,
            getGendreList
        }
    }
};
</script>