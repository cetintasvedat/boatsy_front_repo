<template>
  <div class="chatbox">
    <ul class="chatbox__contacts" :style='{display: roomsDisplay}'>
      <li
        v-for="(contact, contactIndex) in contacts"
        :key="contactIndex"
        :class="contactIndex === selectedRoom ? 'chatbox__contact--selected' : ''"
        @click="onClickRoom(contactIndex)"
      >
        <userCard :room="contact" />
      </li>
    </ul>

    <div class="chatbox__container" :style='{display: messageDisplay}'>
      <div class="chatbox__info" v-if="currentRoomIndex > -1">
        <div class="chatbox__info--right">
          <img :src="IMAGE_URL + contacts[selectedRoom].avatar" height="45" width="45" />
          <h5 class="chat_box_room">{{ contacts[selectedRoom].sendname }}</h5>
        </div>
        <div class="prev__button" @click="showRooms">
          <i class="fas fa-angle-left"></i>
        </div>
      </div>
      <div style="padding-top: 50%; font-size: 25px; border-top: 8px solid #f2f2f2; text-align: center;" v-else>
        {{$t('message_text')}}
      </div>
      <div v-if="currentRoomIndex > -1" class="chatbox__chat" id="chatContainer">
        <div
          class="chatbox__messages"
          id="messages"
          ref="messagesRef"
          v-on:scroll="loadMoreMessage()"
        >
          <img
            v-if="scrollStatusForMessage"
            src="/assets/images/loading.gif"
            style="width: 50px"
          />
          <div
            v-for="(message, messageIndex) in getSelectedRoomMessage"
            :key="messageIndex"
          >
            <div class="chatbox__date">{{ message.date }}</div>
            <div
              class="chatbox__messageContainer"
              :class="message.sender ? 'chatbox__messageContainer--right' : ''"
              :style="{
                'margin-top': message.sender ? '12px' : '4px',
                'margin-bottom': messages.length - 1 && message.sender ? '12px' : '4px',
              }"
            >
              <div
                class="chatbox__message"
                aria-label="message.body"
                :style="{
                  'border-top-right-radius': !message.sender ? '5px' : '20px',
                  'border-bottom-right-radius': !message.sender ? '5px' : '20px',
                  'border-top-left-radius': !message.sender ? '5px' : '20px',
                  'border-bottom-left-radius': !message.sender ? '5px' : '20px',
                }"
              >
                <div v-if="messageChecker(message.body) == 'text'">
                  {{ message.body }}
                </div>
                <div v-else>
                  <boatCard :id="messageChecker(message.body)" />
                </div>

                <div
                  class="chatbox__time"
                  :class="!message.sender ? 'chatbox__time--left' : ''"
                >
                  {{ dateCalculator(message.dt_insert_date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message_send">
          <input
            class="chatbox__messageInput"
            v-model="messageInput"
            ref="newMessageInput"
            :placeholder="'Mesaj Yaz...'"
            @keyup.enter="newMessage()"
          />
          <div class="send-button" @click="newMessage()">
            <i class="far fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { mapGetters } from "vuex";
import userCard from "./component/userCard.vue";
import boatCard from "./component/BoatCardVerticalForMessage.vue";
import { IMAGE_URL } from "../../config/GlobalVariables";

import {
  GET_ROOMS,
  SET_MESSAGE,
  FETCH_BOAT_DETAIL_FOR_BOAT_CARD,
  GET_MESSAGE,
} from "../../store/actions.type";
export default {
  props: ["room"],
  components: {
    userCard,
    boatCard,
  },
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      currentPage: 1,
      messageCount: -1,
      darkMode: false,
      showUserMenu: false,
      showOptions: false,
      userId: "FExpl9n",
      scrollStatusForMessage: false,
      messageInput: "",
      currentRoomIndex: -1,
      messageDisplay: '',
      roomsDisplay: '',
    };
  },
  computed: {
    contacts() {
      return this.$store.getters.getRooms;
    },
    getSelectedRoomMessage() {
      return this.selectedRoom > -1 ? this.contacts[this.selectedRoom].messages : [];
    },
    ...mapGetters({
      messages: "getMessages",
      selectedRoom: "getSelectedRoom",
    }),
  },
  mounted() {},

  async created() {
    $("#chatContainer").height($(window).height() - 300);
    //this.$store.dispatch(GET_ROOMS);
    this.$store.commit("setPaginationPageForMessage", 1);
    this.$store.dispatch(GET_ROOMS).then((result) => {
      if (this.room != undefined) {
        for (var i = 0; i <= this.contacts.length; i++) {
          if (this.contacts[i].room == this.room) {
            this.currentRoomIndex = i;
            this.$store.commit("setSelectedRoom", i);
            this.$store.dispatch(GET_MESSAGE, this.contacts[i].room).then((res) => {
              if (res.error == false) {
                this.messageCount = res.totalCount;
                if (this.messageCount == this.messages.length) {
                  this.scrollStatusForMessage = false;
                }
                var scrollingElement = document.getElementById("messages");
                scrollingElement.scrollTop = scrollingElement.scrollHeight;
              }
            });
          }
        }
      }
    });
  },
  mutations: {},
  methods: {
    getMessages() {},
    async loadMoreMessage() {
      var scrollingElementFirst = document.getElementById("messages");
      var firstHeight = scrollingElementFirst.scrollHeight;
      if (
        scrollingElementFirst.scrollTop == 0 &&
        this.messageCount != this.contacts[this.selectedRoom].messages.length &&
        this.scrollStatusForMessage == false
      ) {
        this.scrollStatusForMessage = true;
        this.currentPage = this.currentPage + 1;
        this.$store.commit("setPaginationPageForMessage", this.currentPage);
        this.$store
          .dispatch(GET_MESSAGE, this.contacts[this.selectedRoom].room)
          .then((res) => {
            if (res.error == false) {
              var scrollingElementLast = document.getElementById("messages");
              var lastHeight = scrollingElementLast.scrollHeight;
              scrollingElementLast.scrollTop = lastHeight - firstHeight - 100;
              this.messageCount = res.totalCount;
              this.scrollStatusForMessage = false;
            }
          });
      }
    },
    async onClickRoom(contactIndex) {
      if(window.innerWidth < 801 ) {
        this.roomsDisplay = 'none';
        this.messageDisplay = 'inline';
      }
      this.$store.commit("setPaginationPageForMessage", 1);
      this.currentPage = 1;
      this.$store.commit("setSelectedRoom", contactIndex);
      this.currentRoomIndex = contactIndex;
      this.scrollStatusForMessage = true;
      this.contacts[this.selectedRoom].messages = [];
      var res = await this.$store.dispatch(GET_MESSAGE, this.contacts[contactIndex].room);
      if (res.error == false) {
        this.messageCount = res.totalCount;
        this.scrollStatusForMessage = false;
        var scrollingElementFirst = document.getElementById("messages");
        scrollingElementFirst.scrollTop =
          scrollingElementFirst.scrollHeight - scrollingElementFirst.clientHeight;
      }
    },
    async getBoatDetail(id) {
      return await this.$store
        .dispatch(FETCH_BOAT_DETAIL_FOR_BOAT_CARD, id)
        .then((data) => {
          if (data != undefined) {
            this.$nextTick(() => {
              this.boatData = data.data[0];
            });
          }
        });
    },
    messageChecker(body) {
      var data = "text";

      var messageFirstSplit = body.split("{{boat_id(^)");
      if (messageFirstSplit.length > 1) {
        var tempContent = messageFirstSplit[1].split("}}");
        if (tempContent.length > 1) {
          var boatId = tempContent[0];
          data = boatId;
          //await this.$store.dispatch(FETCH_BOAT_DETAIL_FOR_BOAT_CARD, id).then((data) => {
          //});
        }
      } else {
        data = "text";
      }
      return data;
    },
    onChannelInputBlur() {
      if (this.selectedContact.newChannelInput === "") {
        this.selectedContact.makeNewChannel = false;
      } else {
        this.newChannel(this.selectedContact.newChannelInput);
      }
    },
    newMessage() {
      var room = this.contacts[this.selectedRoom].room;
      this.$store.dispatch(SET_MESSAGE, this.messageInput, room);
      this.messageInput = "";
      //this.$store.dispatch(GET_MESSAGE, room).then((value) => {
      //  if (!value.error) {
      //    var scrollingElement = document.getElementById("messages");
      //    scrollingElement.scrollTop = scrollingElement.scrollHeight;
      //  }
      //});
    },
    closePopup() {
      if (this.showOptions) {
        this.showOptions = false;
      }
    },
    getDate() {
      let date = new Date();
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 < 10 ? "0" : "") +
        (date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10 ? "0" : "") +
        date.getDate()
      );
    },
    getTime() {
      let date = new Date();
      return (
        (date.getHours() < 10 ? "0" : "") +
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes()
      );
    },
    dateCalculator(date) {
      var date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      var dateNow = new Date();
      var dateNowYear = dateNow.getFullYear();
      var dateNowMonth = dateNow.getMonth();
      var dateNowDay = dateNow.getDate();
      var dateNowHour = dateNow.getHours();
      var dateNowMinute = dateNow.getMinutes();

      if ((dateNowDay - day == 0) & (dateNowMonth - month == 0)) {
        return hour + ":" + minute;
      } else if ((dateNowDay - day == 1) & (dateNowMonth - month == 0)) {
        return "dün " + hour + ":" + minute;
      } else if ((dateNowDay - day < 7) & (dateNowMonth - month == 0)) {
        return this.dayNumberToString(date.getDay()) + hour + ":" + minute;
      } else if (dateNowYear - year == 0) {
        return day + this.monthNumberToString(date.getMonth()) + hour + ":" + minute;
      } else {
        return day + this.monthNumberToString(date.getMonth()) + year;
      }
    },
    dayNumberToString(dayNumber) {
      if (dayNumber == 0) {
        return "Pazar ";
      } else if (dayNumber == 1) {
        return "Pazartesi ";
      } else if (dayNumber == 2) {
        return "Salı ";
      } else if (dayNumber == 3) {
        return "Çarşamba ";
      } else if (dayNumber == 4) {
        return "Perşembe ";
      } else if (dayNumber == 5) {
        return "Cuma ";
      } else if (dayNumber == 6) {
        return "Cumartesi ";
      }
    },
    monthNumberToString(mountNumber) {
      if (mountNumber == 0) {
        return " Oca ";
      } else if (mountNumber == 1) {
        return " Şub ";
      } else if (mountNumber == 2) {
        return " Mar ";
      } else if (mountNumber == 3) {
        return " Nis ";
      } else if (mountNumber == 4) {
        return " May ";
      } else if (mountNumber == 5) {
        return " Haz ";
      } else if (mountNumber == 6) {
        return " Tem ";
      } else if (mountNumber == 7) {
        return " Ağu ";
      } else if (mountNumber == 8) {
        return " Eyl ";
      } else if (mountNumber == 9) {
        return " Eki ";
      } else if (mountNumber == 10) {
        return " Kas ";
      } else if (mountNumber == 11) {
        return " Ara ";
      }
    },
    showRooms(){
      this.messageDisplay = 'none';
      this.roomsDisplay = 'inline';
    }
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
a:focus,
a:active,
button::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
select::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner {
  border: 0;
  outline: 0;
}
p {
  margin: 0;
}
.chatbox__contacts li {
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}
.card-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
}
.chatbox {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 75px);
  margin-top: 75px;
}
.message_send {
  padding: 5px;
  display: flex;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
}
.send-button {
  height: 45px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-left: 15px;
  border-radius: 50%;
  cursor: pointer;
}
.chatbox__contacts {
  display: inline-block;
  height: 80%;
  width: 450px;
  padding: 10px;
  overflow-y: scroll;
  border-right: 8px solid #f2f2f2;
  border-top: 8px solid #f2f2f2;
  height: 100%;
}
.chat_box_room {
  align-items: center;
  text-align: center;
  margin-bottom: 0px;
  margin-left: 10px;
}
.room-container {
  justify-content: space-between;
}
.chatbox__contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 5px;
  height: 55px;
  width: 100%;
  border-radius: 40px;
  cursor: pointer;
  border: 2px solid #fff;
  background-size: cover;
  background-position: center;
  background-color: #e6e6e6;
  transition-duration: 0.1s;
}
.chatbox__contact:hover {
  box-shadow: 0 0 0 2px #eee;
}
.chatbox__onlineIndicator {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  bottom: 0;
  background-color: #2de58d;
  border-radius: 50px;
  border: 2px solid #fff;
}
.chatbox__container {
  position: relative;
  width: calc(100% - 175px);
  height: 100%;
}
.chatbox__info,
.chatbox__navigation {
  align-self: flex-start;
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
}
.chatbox__info {
  padding: 10px 10px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  justify-content: flex-start;
}
.chatbox__info img {
  cursor: pointer;
}
.chatbox__navigation {
  display: flex;
  height: auto;
  align-items: center;
  text-align: left;
  padding: 8px 10px;
}
.chatbox__channelSwitchButton,
.chatbox__channelNewButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  font-weight: 400;
  white-space: nowrap;
  border-radius: 40px;
  margin: 0 9px 0 0;
  font-size: 11px;
  height: 25px;
  padding: 4px 12px;
  background: #fff;
  border: 1px solid #09f;
  color: #09f;
  cursor: pointer;
}
.chatbox__info--right{
  display: flex;
  align-items: center;
}
.prev__button{
  padding: 5px 15px;
  font-size: 20px;
  cursor: pointer;
  display: none;
}
.prev__button:hover{
  background: #dddddd94;
  border-radius: 50%;
}
.chatbox__channelSwitchButton input,
.chatbox__channelNewButton input {
  margin: 0;
  padding: 0 4px;
  border: none;
  height: 100%;
  width: 96px;
  text-align: left;
  font: inherit;
}
.chatbox__channelSwitchButton input::placeholder,
.chatbox__channelNewButton input::placeholder {
  color: #bbb;
}
.chatbox__channelSwitchButton--selected,
.chatbox__channelNewButton--selected {
  background: #09f;
  color: #fff !important;
}
.chatbox__channelSwitchButton--input,
.chatbox__channelNewButton--input {
  padding: 0 8px;
  cursor: default;
  display: flex;
}
.chatbox__channelNewButton {
  border-color: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 25px;
  width: 25px;
  color: #555;
  font-weight: 100;
  font-size: 22px;
  transition-duration: 0.1s;
}
.chatbox__channelNewButton:hover {
  border-color: #aaa;
}
.chatbox__chat {
  position: relative;
  height: calc(100% - 65px);
  padding-bottom: 25px;
}
.chatbox__messages {
  margin: 0;
  min-width: 64px;
  padding: 20px;
  padding-bottom: 75px;
  overflow-y: auto;
  height: calc(100% - 55px);
  padding: 0 15% 0px 15%;
}
.chatbox__messageInput {
  display: block;
  font: inherit;
  font-size: 13px;
  text-align: left;
  height: 45px;
  padding: 2px 19px;
  width: 450px;
  border-radius: 50px;
  border: 1px solid #e4e4e4;
  bottom: 26px;
  z-index: 2;
}
.chatbox__messageInput::placeholder {
  color: #bbb;
}
.chatbox__messageContainer {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 6px 0;
  justify-content: flex-start;
}
.chatbox__messageContainer--right {
  justify-content: flex-end;
}
.chatbox__messageContainer--right .chatbox__message {
  color: #fff;
  background-color: #cfe2f3;
  border: none;
}
.chatbox__message {
  position: relative;
  max-width: 400px;
  padding: 6px 15px;
  text-align: left;
  border-radius: 20px !important;
  font-size: 12px;
  color: #000 !important;
  word-break: break-word;
  background-color: #f3f3f3;
}
.chatbox__message:hover .chatbox__time {
  display: block;
}
.chatbox__time {
  position: absolute;
  color: #000;
  left: -25px;
  font-size: 8px;
  top: 12px;
}
.chatbox__time--left {
  top: 12px;
  right: -25px;
  left: auto;
}
.chatbox__date {
  width: 100%;
  height: 20px;
  text-align: center;
  margin: 13px 0 10px;
  font-size: 12px;
  color: #ccc;
}
.chatbox__date:nth-child(1) {
  margin-top: 0;
}
.chatbox__popupMenu,
.chatbox__colorPalette,
.chatbox__userMenu {
  position: absolute;
  right: 10px;
  top: 40px;
  background: #fff;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.chatbox__popupMenu button,
.chatbox__colorPalette button,
.chatbox__userMenu button {
  width: 100%;
  padding: 8px 10px;
  cursor: pointer;
  background-color: #fff;
  border: none;
}
.chatbox__popupMenu button:hover,
.chatbox__colorPalette button:hover,
.chatbox__userMenu button:hover {
  background: #f4f4f4;
}
.chatbox__popupMenu button:last-child,
.chatbox__colorPalette button:last-child,
.chatbox__userMenu button:last-child {
  color: #f00;
}
.chatbox__popupMenu button:disabled,
.chatbox__colorPalette button:disabled,
.chatbox__userMenu button:disabled,
.chatbox__popupMenu button button[disabled],
.chatbox__colorPalette button button[disabled],
.chatbox__userMenu button button[disabled] {
  cursor: default;
  color: #bbb;
}
.chatbox__popupMenu button:disabled:hover,
.chatbox__colorPalette button:disabled:hover,
.chatbox__userMenu button:disabled:hover,
.chatbox__popupMenu button button[disabled]:hover,
.chatbox__colorPalette button button[disabled]:hover,
.chatbox__userMenu button button[disabled]:hover {
  background: #fff;
}
.chatbox__colorPalette {
  width: auto;
  padding: 9px;
  display: grid;
  grid-template: 1fr 1fr 1fr/1fr 1fr 1fr 1fr;
  grid-gap: 5px;
}
.chatbox__userMenu {
  right: auto;
  left: 10px;
}
.chatbox__color {
  width: 25px;
  height: 25px;
  border-radius: 30px;
  cursor: pointer;
}
.chatbox__color:hover {
  opacity: 0.9;
}
.chatbox__color:nth-child(1) {
  background-color: #ff7ca8;
}
.chatbox__color:nth-child(2) {
  background-color: #247ba0;
}
.chatbox__color:nth-child(3) {
  background-color: #70c1b3;
}
.chatbox__color:nth-child(4) {
  background-color: #b2dbbf;
}
.chatbox__color:nth-child(5) {
  background-color: #ff1654;
}
.chatbox__color:nth-child(6) {
  background-color: #ffba08;
}
.chatbox__color:nth-child(7) {
  background-color: #3f88c5;
}
.chatbox__color:nth-child(8) {
  background-color: #23bf73;
}
.chatbox__color:nth-child(9) {
  background-color: #ff0f80;
}
.chatbox__color:nth-child(10) {
  background-color: #fe4e00;
}
.chatbox__color:nth-child(11) {
  background-color: #f19a3e;
}
.chatbox__color:nth-child(12) {
  background-color: #09f;
}
.chatbox__info,
.chatbox__navigation {
  border-bottom: 8px solid #f2f2f2;
  border-top: 8px solid #f2f2f2;
  justify-content: space-between;
}
.chatbox__messages::-webkit-scrollbar-thumb {
  background: #b5b2b2;
  border-radius: 8px;
}
.chatbox__messages::-webkit-scrollbar {
  background: #fff;
  width: 4px;
}
.chatbox__messages::-webkit-scrollbar:hover {
  width: 8px;
}
.chatbox__contacts::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 8px;
}
.chatbox__contacts::-webkit-scrollbar {
  background: #fff;
  width: 4px;
}
.chatbox__contacts::-webkit-scrollbar:hover {
  width: 8px;
}
.chatbox__contacts::-webkit-scrollbar-thumb:hover {
  background: #b5b2b2;
  border-radius: 8px;
}
@media (max-width:800px) {
  .chatbox__container{
    display: none;
  }
  .chatbox__contacts{
    width: 100%;
    border-right: none;
  }
  .chatbox__container{
    width: 100%;
    padding-bottom: 8px;
  }
  .prev__button{
    display: inline;
  }
}
@media (min-width: 950px) {
  .chatbox__message {
    font-size: 16px;
  }
}
@media (min-width: 600px) {
  .chatbox__time {
    left: -60px;
    font-size: 10px;
    top: 10px;
  }
  .chatbox__time--left {
    top: 12px;
    right: -35px;
  }
}
@media screen and (max-width: 600px) {
  .chatbox__info h5{
    font-size: 16px;
  }
  .chatbox__info img{
    width: 32px !important;
    height: 32px !important;
  }
  .chatbox__chat{
    padding-bottom: 5px !important;
  }
}
@media screen and (max-width: 640px) {
  .chatbox__messageInput {
    width: 290px;
  }
}
</style>
