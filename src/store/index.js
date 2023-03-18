import { createStore } from "vuex";

import {db} from '../firebase/firebaseInit'

export default createStore({
  state: {
    error: null,
    list: [],
    data: [],
    listGendre: [],
    quotesList: []
  },
  mutations: {
    setGendreList: (state, data) => state.listGendre = data,
    setList: (state, data) => state.list = data,
    setQuotesList: (state, data) => state.quotesList = data,
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchGenre({commit}) {
      try{
        const info = (await db.ref(`/genre`).once('value')).val()
        // await db.ref('/genre').once('value')
        const list = Object.keys(info).map(key => ({...info[key], id: key}))
        commit('setGendreList', list)
        return list
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchList({commit}) {
      try{
        const info = (await db.ref(`/notes`).once('value')).val()
        // await db.ref('/genre').once('value')
        const list = Object.keys(info).map(key => ({...info[key], id: key}))
        commit('setList', list)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchListById({commit}, id) {
      try{
        const info = (await db.ref(`/notes`).child(id).once('value')).val()
        // await db.ref('/genre').once('value')
        return {...info, id}

      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async updateGenre({dispatch, commit}, {id, text, author, created_at, updated_at}) {
      try {
        const info = await db.ref(`/notes/${id}`).update({id, text, author, created_at, updated_at})
        return info
      } catch (e) {
        console.log(e);
        commit('setError', e)
        throw e
      } 
    },
    async fetchQuoteList({commit}, id) {
      try{
        const info = (await db.ref(`/notes/${id}/text`).once('value')).val()
        // await db.ref('/genre').once('value')
        const list = Object.keys(info).map(key => ({...info[key], id: key}))
        commit('setQuotesList', list)
        return list

      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createQuote({dispatch, commit}, {id, text}) {
      try {
        const info = await db.ref(`/notes/${id}`).update({text})
        return info
      } catch (e) {
        console.log(e);
        commit('setError', e)
        throw e
      } 
    },
    async updateQuote({dispatch, commit}, {id, quote_id, text, genre, created_at, updated_at}) {
      try {
        const info = await db.ref(`/notes/${id}/text/${quote_id}`).update({id: quote_id, text, genre, created_at, updated_at})
        return info
      } catch (e) {
        console.log(e);
        commit('setError', e)
        throw e
      } 
    },
    async deleteQuote({dispatch, commit}, {id, quote_id}) {
      try {
        const info = await db.ref(`/notes/${id}/text/${quote_id}`).remove()
        return info
      } catch (e) {
        console.log(e);
        commit('setError', e)
        throw e
      } 
    },
  },
  getters: {
    getGendreList: state => {
      return state.listGendre
    },
    getList: state => {
      return state.list
    },
    getQuotesList: state => {
      return state.quotesList
    },
  },
  modules: {},
});
