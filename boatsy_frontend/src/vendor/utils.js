import Vue from "vue";



var _utils = {
    /**
     * 
     * @param {String} type warning, info, danger, success 
     * @param {String} title 
     * @param {String} message 
     */
    notify: (type, title, message) => {
        Vue.notify({
            group: "notification",
            text: message,
            type: type,
            title: title,
        });
    },
    showSweetAlert(type, title, message,showCancelButton=false,confirmButtonText,cancelButtonText) {

       return Vue.swal({
            title: title,
            text: message,
            icon: type,
            showCancelButton: showCancelButton,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });
    },

};

var utils = () => {
    return _utils;
};

export default utils();
