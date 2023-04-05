<template>
    
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { faker } from '@faker-js/faker';
import { useStore } from 'vuex'



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

        })

        return {
            state,
            isOpen,
            getList
        }
    }
}
</script>