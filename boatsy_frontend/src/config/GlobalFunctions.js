import Vue from "vue";
import numeral from 'numeral'

numeral.locale('tr');

var dispatcherFunc = (property, dispatchedFunctionModel, bindingFunction) => {
    if (bindingFunction != undefined) {
        if (bindingFunction != null) {
            if (typeof bindingFunction == "function") {
                dispatchedFunctionModel[property] = bindingFunction;
            }
        }
    }
}


var _globalFunctions = {
    Company: {
        onChange: (companyID) => {
            return companyID;
        },
        bindChange: (bindingFunction) => {
            dispatcherFunc("onChange", Vue.prototype.$globalFunctions.Company, bindingFunction);
        }
    },
    Branch: {
        onChange: (branchID) => {
            return branchID;
        },
        bindChange: (bindingFunction) => {
            dispatcherFunc("onChange", Vue.prototype.$globalFunctions.Branch, bindingFunction);
        }
    },
    DatePicker: {
        onChange: (dateRange) => {
        },
        bindChange: (bindingFunction) => {
            dispatcherFunc("onChange", Vue.prototype.$globalFunctions.DatePicker, bindingFunction);
        }
    },

    isNumberDataValidator: {

        validate: (data) => {
            if (data !== undefined) {
                if (data !== null) {
                    return Vue.prototype.$globalFunctions.isNumberDataValidator.numberTyper(data);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        costValidate: (data) => {
            if (data !== undefined) {
                if (data !== null) {
                    return Vue.prototype.$globalFunctions.isNumberDataValidator.costTyper(data);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        numberTyper: (data) => {
            if (typeof data == "string") {
                data = parseFloat(data)
            }
            return numeral(data).format('0.0,00');
            //parseFloat(data).toFixed(4).replace('.', ',');
        },
        costTyper: (data) => {

                data = parseFloat(data).toFixed(2);

            return numeral(data).format('0.0,00')
        }
    },

    isDateValidator: {
        validateDay: (date) => {
            if (date !== undefined) {
                if (date !== null) {
                    return Vue.prototype.$globalFunctions.isDateValidator.dayTyper(date);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        dayTyper: (data) => {
            data = new Date(data);
            data.getDate();
            return data.getDate() + "." + (data.getMonth() + 1) + "." + data.getFullYear();
        },
        validateHour: (date) => {
            if (date !== undefined) {
                if (date !== null) {
                    return Vue.prototype.$globalFunctions.isDateValidator.hourTyper(date);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        hourTyper: (data) => {
            data = new Date(data);
            data.getDate();
            if (data.getHours() < 10) {
                return "0" + data.getHours() + ":" + "00:00";
            } else {
                return data.getHours() + ":" + "00:00";
            }

        }
    },
    processController : {
        process: [],
        addProcess: (_process) => {
            Vue.prototype.$globalConfigs.headerLoading = true;
            var findingProcess = Vue.prototype.processController.process.filter((x) => x == _process);
            if (findingProcess.length < 1) {
                Vue.prototype.processController.process.push(_process);
            }
        },
        deleteProcess: (_process) => {
            Vue.prototype.processController.process =  Vue.prototype.processController.process.filter((x) => x != _process);
            Vue.prototype.processController.process =  Vue.prototype.processController.process.filter((x) => x != _process);
            if ( Vue.prototype.processController.process.length < 1) {
                Vue.prototype.$globalConfigs.headerLoading = false;
            }
        },
    }

};



var globalFunctions = () => {
    return _globalFunctions;
};

export default globalFunctions();
