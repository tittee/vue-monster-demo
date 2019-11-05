<template>
	<main>
		<section class="row">
			<div class="small-6 columns">
				<h1 class="text-center">YOU</h1>
				<div class="healthbar">
					<div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" 
						:style="{width: playerHealth + '%'}">
						{{ playerHealth }}
					</div>
				</div>
			</div>
			<div class="small-6 columns">
				<h1 class="text-center">MONSTER</h1>
				<div class="healthbar">
					<div class="healthbar text-center" style="background-color: green; margin: 0; color: white;">
						{{ monsterHealth }}
					</div>
				</div>
			</div>
		</section>
		<section class="row controls" v-if="!gameIsRunning">
			<div class="small-12 columns">
				<button id="start-game" v-on:click="startGame">START NEW GAME</button>
			</div>
		</section>
		<section class="row controls" v-else>
			<div class="small-12 columns">
				<button id="attack" @click="attack">ATTACK</button>
				<button id="special-attack" @click="specialAttack">SPECIAL ATTACK</button>
				<button id="heal" @click="heal">HEAL</button>
				<button id="give-up" @click="giveUp">GIVE UP</button>
			</div>
		</section>
		<section class="row log">
			<div class="small-12 columns">
				<ul>
					<li>
					</li>
				</ul>
			</div>
		</section>
	</main>
</template>

<script>


	var myGame = {
	  data () {
	    return {
	      playerHealth: 100,
				monsterHealth: 100,
				gameIsRunning: false,
	    }
	  },
	  methods: {
	    startGame() {
	     	this.gameIsRunning = true;
				this.playerHealth = 100;
				this.monsterHealth = 100;
	    },
	    attack() {
	     	var max = 10;
	     	var min = 3;
	     	var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
	     	this.monsterHealth -= damage;

	     	var max = 12;
	     	var min = 5;
	     	var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
	     	this.playerHealth -= damage
	    },
	    specialAttack() {
	     	console.log('Special Attack');
	    },
	    heal(){
	    	console.log('Heal');
	    },
	    giveUp(){
	    	console.log('Give Up');
	    }
	  }
	}

	// function startGame() {
		
	// }

	export default myGame

</script>

<style>
	
</style>