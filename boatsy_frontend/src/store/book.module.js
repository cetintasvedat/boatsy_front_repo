import Vue from 'vue'

import {
  FETCH_BOOKING,
  FETCH_ALL_BOOKING,
  FETCH_BOOKING_DETAIL,
  FETCH_PUBLIC_BOOKING_DETAIL,
  CANCEL_REQUEST,
  SET_BOOKING_COMMENT,
  GET_BOOKING_COMMENT,
  NON_AUTH_FETCH_BOOKING,
  NON_AUTH_FETCH_BOOKING_WITH_PAYMENT
} from './actions.type.js'
const bookModule = {
  state: () => ({
    bookingModel: [],
    userBooks: [],
    allBooking: [],
    bookingDetail: [],
    bookingId: '',
    cancelRequestModel: [],
    bookingLoading: false,
    paginableRequestModel: {
      ascending: 0,
      byColumn: 0,
      limit: 1000,
      page: 1,
      query: '',
      extras: '',
      orderBy: null,
      filterObject: {},
    },
    commentRequestModel: [],
    bookingCommentDetail: [],
    bookingCommentLoading: false,
  }),
  mutations: {
    setBookingModel(state, value) {
      state.bookingModel = value
    },
    setBookingId(state, value) {
      state.bookingId = value
    },
    setCancelRequestModel(state, value) {
      state.cancelRequestModel = value
    },
    setCommentRequestModel(state, value) {
      state.commentRequestModel = value
    },
  },
  getters: {
    getbookingModel: (state) => {
      return state.bookingModel
    },
    getAllBooking: (state) => {
      return state.allBooking
    },
    getBookingDetail: (state) => {
      return state.bookingDetail
    },
    getBookingLoading: (state) => {
      return state.bookingLoading
    },
    getBookingCommentDetail: (state) => {
      return state.bookingCommentDetail
    },
    getBookingCommentLoading: (state) => {
      return state.bookingCommentLoading
    },
  },
  actions: {
    [FETCH_BOOKING]: async function ({ state }) {
      var val = await Vue.prototype.$bookService.setBooking(state.bookingModel)

      if (val.error == true) {
        return {
          error: true,
          message:
            'Rezervasyon talebi gerçekleştirilemedi. Lütfen tekrar deneyin.',
        }
      } else {
        return val
      }
    },
    [NON_AUTH_FETCH_BOOKING]: async function ({ state },body) {
      var val = await Vue.prototype.$bookService.setNonAuthBooking(body)

      if (val.error == true) {
        return {
          error: true,
          message:
            'Rezervasyon talebi gerçekleştirilemedi. Lütfen tekrar deneyin.',
        }
      } else {
        return val
      }
    },
    [NON_AUTH_FETCH_BOOKING_WITH_PAYMENT]: async function ({ state },body) {
      var val = await Vue.prototype.$bookService.setNonAuthBookingWithPayment(body)

      if (val.error == true) {
        return {
          error: true,
          message:
            'Rezervasyon talebi gerçekleştirilemedi. Lütfen tekrar deneyin.',
        }
      } else {
        return val
      }
    },
    [FETCH_ALL_BOOKING]: async function ({ state }, page) {
      state.bookingLoading = true

      if (page != undefined && page != null) {
        state.paginableRequestModel.limit = 30
        state.paginableRequestModel.page = page
      }
      var val = await Vue.prototype.$bookService.getAllBooking(
        state.paginableRequestModel,
      )
      if (page == 1) {
        state.allBooking = val.data
      } else {
        state.allBooking = [...state.allBooking, ...val.data]
      }
      state.bookingLoading = false
      return val.count
    },
    [FETCH_BOOKING_DETAIL]: async function ({ state }) {
      state.bookingDetail = []
      state.paginableRequestModel.filterObject = {
        'bo.id': state.bookingId,
      }
      var val = await Vue.prototype.$bookService.getAllBooking(
        state.paginableRequestModel,
      )
      state.bookingDetail = val.data[0]
      return state.bookingDetail
    },

    [FETCH_PUBLIC_BOOKING_DETAIL]: async function ({ state },body) {
      var val = await Vue.prototype.$bookService.getPublicBookingDetail(
       body
      );
      state.bookingDetail = val.data[0]
      return val
    },
    [CANCEL_REQUEST]: async function ({ state }) {
      return await Vue.prototype.$bookService.cancelRequest(
        state.cancelRequestModel,
      )
    },
    [SET_BOOKING_COMMENT]: async function ({ state }) {
      var data = await Vue.prototype.$bookService.setBookingComment(
        state.commentRequestModel,
      )
      return data
    },
    [GET_BOOKING_COMMENT]: async function ({ state }) {
      state.bookingCommentLoading = true
      var res = await Vue.prototype.$bookService.getBookingComment(
        state.bookingId,
      )
      if (res.error == false) {
        var data = res.data == null ? [] : res.data
        state.bookingCommentLoading = false
        state.bookingCommentDetail = data
      } else {
        state.bookingCommentLoading = false
      }
      return res.data
    },
  },
}
export default bookModule
