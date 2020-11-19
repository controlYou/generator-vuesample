import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		userInfo:null
	},
	mutations:{
		setUserInfo(state,data){
			state.userInfo = data
			console.log(state.userInfo);
		}
	}
})
export default store;