import Vue from 'vue'

import {
  GET_ROOMS,
  SET_MESSAGE,
  SET_MESSAGE_FOR_BOAT_SUPPORT,
  GET_MESSAGE,
  JOIN_ROOM,
} from './actions.type.js'
const messageModule = {
  state: () => ({
    rooms: [],
    messages: [],
    boatDetail: null,
    paginableRequestModel: {
      ascending: 0,
      byColumn: 0,
      limit: 30,
      page: 1,
      query: '',
      extras: '',
      orderBy: null,
      filterObject: {},
    },
    selectedRoom: -1,
  }),
  mutations: {
    setRooms(state, value) {
      state.user = value
    },
    setMessageBoatDetail(state, value) {
      state.boatDetail = value
    },
    setMessage(state, value) {
      state.messages = value
    },
    setSelectedRoom(state, value) {
      state.selectedRoom = value
    },
    setPaginationPageForMessage(state, value) {
      state.paginableRequestModel.page = value
    },
    addMessageforSocket(state, value) {
      if (value.sender != JSON.parse(localStorage.getItem('profileModel')).id) {
        Vue.$toast(value.message, {
          icon: 'far fa-envelope',
          onClick: () => {
            value.this.$router.push({
              name: 'Message',
              params: {
                room: value.room,
              },
            })
          },
        })
      }
      state.rooms.map((data, index) => {
        if (data.room == value.room) {
          state.rooms[index].messages.push({
            datetime: value.datetime,
            message: value.message,
            room: value.room,
            body: value.message,
            dt_insert_date: value.datetime,
            dt_update_date: null,
            id: 0,
            inserted_user_id: value.sender.toString(),
            row_status: true,
            sender:
              value.sender ==
              JSON.parse(localStorage.getItem('profileModel')).id
                ? true
                : false,
            title: value.message,
          })

          Vue.nextTick().then(function () {
            var scrollingElementFirst = document.getElementById('messages')
            scrollingElementFirst.scrollTop =
              scrollingElementFirst.scrollHeight -
              scrollingElementFirst.clientHeight
          })
        }
      })
    },
  },
  getters: {
    getRooms: function (state) {
      return state.rooms
    },
    getMessages: function (state) {
      return state.messages
    },
    getSelectedRoom(state) {
      return state.selectedRoom
    },
  },
  actions: {
    [GET_ROOMS]: async function ({ state }) {
      state.paginableRequestModel.limit = 99999
      var val = await Vue.prototype.$messageService.getRooms(
        state.paginableRequestModel,
      )
      if (val.error == true) {
        return { error: true, message: 'Beklenmedik bir hata olustu!' }
      } else {
        state.rooms = []
        val.data.forEach(function (element) {
          element.messages = []
          state.rooms.push(element)
        })

        return { error: false, message: 'İşlem başarılı.' }
      }
    },
    [GET_MESSAGE]: async function ({ state }, room) {
      var data = state.paginableRequestModel
      state.paginableRequestModel.orderBy = 'id'
      data.extras = room
      data.ascending = 0
      state.paginableRequestModel.limit = 30

      var val = await Vue.prototype.$messageService.getMessages(data)
      if (val.error == true) {
        return { error: true, message: 'Beklenmedik bir hata olustu!' }
      } else {
        state.rooms.forEach(function (element) {
          if (state.paginableRequestModel.page == 1) {
            var messageList = val.data
            element.messages = [...val.data].reverse()
          } else {
            element.messages = [...val.data.reverse(), ...element.messages]
          }
        })

        return {
          error: false,
          message: 'İşlem başarılı.',
          totalCount: val.count,
        }
      }
    },
    [SET_MESSAGE]: async function ({ state, commit }, text, room) {
      var payload = {
        room: state.rooms[state.selectedRoom].room,
        sender: JSON.parse(localStorage.getItem('profileModel')).id,
        message: text,
        datetime: new Date().toISOString(),
      }
      this._vm.$socket.client.emit('sendMessage', payload)

      var val = await Vue.prototype.$messageService.setMessages({
        room: state.rooms[state.selectedRoom].room,
        title: text,
        body: text,
      })
      if (val.error == true) {
        return { error: true, message: 'Beklenmedik bir hata olustu!' }
      } else {
        return { error: false, message: 'İşlem başarılı.' }
      }
    },
    [JOIN_ROOM]: async function ({ state }, room) {
      Vue.$prototype.emit('joinRoom', room)
    },

    [SET_MESSAGE_FOR_BOAT_SUPPORT]: async function ({ state }, data) {
      var val = await Vue.prototype.$messageService.setMessageForBoatSupport(
        data,
      )

      if (val.error == true) {
        return { error: true, message: 'Beklenmedik bir hata olustu!' }
      } else {
        state.messages = val.data
        return { error: false, message: 'İşlem başarılı.' }
      }
    },
    receiveMessage({ commit }, payload) {},
  },
}
export default messageModule
