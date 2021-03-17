/* eslint-disable*/
import vm from "@/main";

export default function handleError(error: any) {
    // Quasar Toast Schema
    let message = "Please contact your developer for assistance";
    let validationErrors = [];
    let devMessage = "Not sure what the problem is";
    // Setup Error Message
    if (typeof error !== "undefined") {
        if (error.hasOwnProperty("message")) {
            message = `${error.message}. ${(error.message === "Network Error" ? "Please check your internet connection" : "")}`;

        }
    }

    if (typeof error.response !== "undefined") {
        if (error.response.status === 401) {// Setup Generic Response Messages
            devMessage = "Unauthorized";
            message = "Please contact your developer for assistance";
            // vm.$emit("logout"); // Emit Logout Event
        } else if (error.response.status == 422) {
            // Validation Message
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data")) {
                // if (error.response.data.hasOwnProperty("error")) {
                validationErrors = { ...error.response.data.error.validationError };
                // }
            }
        } else if (error.response.status === 404) {
            devMessage = "API Route is Missing or Undefined";
        } else if (error.response.status === 405) {
            devMessage = "API Route Method Not Allowed";
        } else if (error.response.status >= 400) {
            devMessage = "Bad Input";
            message = "Invalid input. Please check your input values";
        } else if (error.response.status >= 500) {
            devMessage = "Server Error";
        }

        // Try to Use the Response Message
        if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data")) {
            if (error.response.data.hasOwnProperty("error") && error.response.data.error.userMessage.length > 0) {
                message = error.response.data.error.userMessage;
            }
        }
    }

    // Toast the Message
    if (message.length > 0) {
        // @ts-ignore
        vm.emitter.emit("error", { message, validationErrors: error.response.data?.error?.validationError })
        if (process.env.NODE_ENV !== "production") {
            console.error("<<<<<<<<< AXIOS ERROR >>>>>>>>>>\n", devMessage, typeof validationErrors, validationErrors.map((val: { param: any; msg: any; }) => `${val.param}: ${val.msg}`));
        }
    }
}
