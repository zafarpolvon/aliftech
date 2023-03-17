<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-40 xl:table-fixed md:xl:table-fixed ">
      <thead class="text-xs text-white uppercase bg-blue-700">
        <tr>
          <th scope="col" class="px-6 py-3">Цитата</th>
          <th scope="col" class="px-6 py-3">
            <div class="w-60 pr-4 xl:pr-5">
              <v-select v-model="state.genre"  @clearSearchOnSelect="filterGenre" :placeholder="'Выберите'" :clearable="false" :options="getGendreList" label="display" class="table__select"></v-select>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div @click="filterCreated" class="flex cursor-pointer">
              <span>Создан</span>
              <span v-if="state.createdSort" class="ml-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M13 14.4V3.00003C13 2.40003 12.6 2.00003 12 2.00003C11.4 2.00003 11 2.40003 11 3.00003V14.4H13Z" fill="currentColor"/>
                  <path d="M5.7071 16.1071C5.07714 15.4771 5.52331 14.4 6.41421 14.4H17.5858C18.4767 14.4 18.9229 15.4771 18.2929 16.1071L12.7 21.7C12.3 22.1 11.7 22.1 11.3 21.7L5.7071 16.1071Z" fill="currentColor"/>
                </svg>
              </span>
              <span v-else class="ml-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M13 9.59998V21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21V9.59998H13Z" fill="currentColor"/>
                  <path d="M5.7071 7.89291C5.07714 8.52288 5.52331 9.60002 6.41421 9.60002H17.5858C18.4767 9.60002 18.9229 8.52288 18.2929 7.89291L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L5.7071 7.89291Z" fill="currentColor"/>
                  </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div @click="filterUpdated" class="flex cursor-pointer">
              <span>Обновлено</span>
              <span v-if="state.updatedSort" class="ml-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M13 14.4V3.00003C13 2.40003 12.6 2.00003 12 2.00003C11.4 2.00003 11 2.40003 11 3.00003V14.4H13Z" fill="currentColor"/>
                  <path d="M5.7071 16.1071C5.07714 15.4771 5.52331 14.4 6.41421 14.4H17.5858C18.4767 14.4 18.9229 15.4771 18.2929 16.1071L12.7 21.7C12.3 22.1 11.7 22.1 11.3 21.7L5.7071 16.1071Z" fill="currentColor"/>
                </svg>
              </span>
              <span v-else class="ml-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M13 9.59998V21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21V9.59998H13Z" fill="currentColor"/>
                  <path d="M5.7071 7.89291C5.07714 8.52288 5.52331 9.60002 6.41421 9.60002H17.5858C18.4767 9.60002 18.9229 8.52288 18.2929 7.89291L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L5.7071 7.89291Z" fill="currentColor"/>
                  </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">Действия</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in state.list" :key="index" class="bg-white border-b hover:bg-gray-100">
          
          <td class="px-6 py-4">{{ item.text }}</td>
          <td class="px-6 py-4">
            <div v-for="(inItem, index) in item.genre" :key="index">
              <span>{{ inItem.display }}</span>
            </div>
          </td>
            <td class="px-6 py-4">{{ item.created_at }}</td>
          <td class="px-6 py-4">{{ item.updated_at }}</td>
         
          <td class="flex items-center px-6 py-4 space-x-3">
            <a
              @click="item.editIsOpen = true"
              tag="a"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >Изменить</a
            >
            <a
              @click="item.isOpen = true"
              href="#"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >Удалить</a
            >
            <Modal v-if="item.isOpen" :isOpen="item.isOpen" @deleteItem="deleteItem(item)"  @close="item.isOpen = false">
              <template #header>
                <h2 class="text-lg font-bold">Вы точноо хотите удалить</h2>
              </template>

              <p>{{ item.text }}</p>
              <template #footer>
                <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="onClose">Close</button>
              </template>
            </Modal>
            <Edit-quote v-if="item.editIsOpen" :info="item" :id="info.id" :isOpen="item.editIsOpen"  @close="closeEdit(item.editIsOpen)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, reactive, onMounted, defineComponent, computed, defineExpose } from "vue";
import { useRoute } from 'vue-router'
import moment from 'moment'
import Modal from '../components/Modal.vue'
import EditQuote from '../components/EditQuote.vue'



import { useStore } from 'vuex'

export default  defineComponent({
  name: 'list',
  props: ['info'],
  components: {Modal, EditQuote},
  setup(props, { emit }) {
    const isOpen = ref(false)
    const route = useRoute()
    const state = reactive({
      list: [],
      genre: null,
      createdSort: false,
      updatedSort: false
    })
    const store = useStore()
    const getQuotesList = computed(() => {
      return store.getters.getQuotesList
    })
    const getGendreList = computed(() => {
      return store.getters.getGendreList
    })

    onMounted(async () => {
      await loadData()
    })
    
    const loadData = async () => {
      const id = route.params.id
      state.list = await store.dispatch('fetchQuoteList', id)
      await store.dispatch('fetchGenre')
    }

    const filterGenre = (event) => {
      state.list = getQuotesList.value.filter(book => {
        return book.genre.some(g => g.display == event.display)
      });
    }
    const filterCreated = () => {
      state.createdSort = !state.createdSort
      if(state.createdSort) {
        state.list = getQuotesList.value.sort((a,b) => {
          const aDate = moment(a.created_at, 'DD MM YYYY, HH:mm');
          const bDate = moment(b.created_at, 'DD MM YYYY, HH:mm');
          return aDate - bDate;
        })
      } else {
        state.list = getQuotesList.value.sort((a,b) => {
          const aDate = moment(a.created_at, 'DD MM YYYY, HH:mm');
          const bDate = moment(b.created_at, 'DD MM YYYY, HH:mm');
          return bDate - aDate;
        })
      }
    }
    const filterUpdated = () => {
      state.updatedSort = !state.updatedSort
      if(state.updatedSort) {
        state.list = getQuotesList.value.sort((a,b) => {
          const aDate = moment(a.updated_at, 'DD MM YYYY, HH:mm');
          const bDate = moment(b.updated_at, 'DD MM YYYY, HH:mm');
          return aDate - bDate;
        })
      } else {
        state.list = getQuotesList.value.sort((a,b) => {
          const aDate = moment(a.updated_at, 'DD MM YYYY, HH:mm');
          const bDate = moment(b.updated_at, 'DD MM YYYY, HH:mm');
          return bDate - aDate;
        })
      }
    }
    const deleteItem = async (e) => {
      const info = {
        id: route.params.id,
        quote_id: e.id
      }
      await store.dispatch('deleteQuote', info)
      await loadData()
    }
    const closeEdit = async (e) => {
      e = false
      loadData()
    }

    return {
      state,
      isOpen,
      getQuotesList,
      EditQuote,
      getGendreList,
      filterGenre,
      filterCreated,
      filterUpdated,
      deleteItem,
      closeEdit
    }
  }
})
</script>