<template>
    <div id="game-view-card">
        <div class="max-w-full rounded py-2 overflow-hidden shadow-lg">
      
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{this.name}}</div>
        <p class="text-gray-900 text-sm" > Mistrz Gry: <ProfileIcon v-bind:user_id="this.game_master.id" />  {{this.game_master.username}} </p>
        <p class="text-gray-700 text-base">
        Opis:  {{this.description}}
        </p>
        <p class="text-gray-900 text-xl py-1">
         Gracze: 
        </p>
      </div>
      <div class="flex px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2" id="players" v-for="(player, index) in players" v-bind:key="index" >
         <ProfileIcon v-bind:user_id="player.id" />   
        </span>
      </div>
    </div>
    </div>
</template>
<script>
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'

export default ({
    
   name: 'GameCardViewComponent',
    props: {
    id: Number,
    name: String,
    slug: String,
    edited: String,
    created: String,
    game_master: Object,
   
    next_game: String,
    description: String,
    players: Array,
  },
  components:{
      ProfileIcon
  }
})
</script>
