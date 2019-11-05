import Vue from "vue";
import Monster from "./src/components/Monster.vue";

// new Vue({
// 	el: '#app',
// 	data: {
// 		playerHealth: 100,
// 		monsterHealth: 100,
// 		gameIsRunning: false,
// 	}
// })




new Vue({
	render: (createEl) => createEl(Monster),

}).$mount("#app");

