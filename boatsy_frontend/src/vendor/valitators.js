"use strict";
var select = (value) => { if (value == undefined) return false; if (value == null) return false; if (value == "") return false; return true; }
var timepicker = (value) => {
    return !(value.HH == null) && !(value.HH == "") && !(value.mm == null) && !(value.mm == "");
}

export * from "vuelidate/lib/validators";
export { select, timepicker };