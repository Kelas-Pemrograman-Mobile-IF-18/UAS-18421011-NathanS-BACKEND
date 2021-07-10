module.exports = {

    commonError:{
        error: true,
        msg : 'Server Crash'
    },
    commonErrorMsg: (msg) => {
        return {
            error: true,
            msg : msg
        }
    },
    commonSuccess: {
        error: false,
        msg : 'Server Success'
    },
    commonSuccessMsg: (msg) => {
        return {
            error: false,
            msg : msg
        }
    },
    commonResult: (data) => {
        return {
            error : false,
            msg : 'Data Load Success',
            data : data
        }
    }

};