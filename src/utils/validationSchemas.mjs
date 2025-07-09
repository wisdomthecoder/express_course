export const createUserValiSchema = {
    username: {
        isLength: {
            options: {
                min: 5,
                max: 32
            }
        },
        errorMessage: "Usrname must be atleast 5 and max 32 chracter",

    },
    notEmpty: {
        errorMessage: "Username cannot be empty"
    },
    isString: {
        errorMessage: "username must be string"

    },

}
export const getUserValiSchema = {
    filter: {
        isLength: {
            options: {
                min: 3,
                max: 10
            }
        },
        errorMessage: "value must be atleast 3 and max 10 chracter",

    },
     notEmpty: {
        errorMessage: "value cannot be empty"
    },
       isString: {
        errorMessage: "value must be string"

    },
   

}