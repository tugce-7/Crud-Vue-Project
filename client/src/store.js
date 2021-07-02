import { createStore } from 'vuex'
import axios from   "axios";


const store = createStore({


    state:{
        token :"",
   


    },
    mutations:{
        setToken(state, token){
            state.token = token
        },
        clearToken(state){
            state.token=""
        }
        
    },
    getters:{

    },
    actions:{

   
    }

})

export default store
