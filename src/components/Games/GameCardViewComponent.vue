<template>
    <div id="game-view-card">
        <div class="max-w-full rounded py-2 overflow-hidden shadow-lg">
      
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{this.name}}</div>
        <p class="text-gray-900 text-sm" > Mistrz Gry: <ProfileIcon v-bind:user_id="this.game_master.id" />  {{this.game_master.username}} </p>
        <p class="text-gray-700 text-base">
        Opis:  {{this.description}}
        </p>
        <p v-if="$store.state.user.id == this.game_master.id" v-on:click="$router.push(`/gamepanel/${this.slug}`)" 
        class="text-purple-700 text-base"> Przejdz do panelu rozgrywki </p>
        <p class="text-gray-900 text-xl py-1">
         Gracze: 
        </p>
        <button type="submit" v-on:click="$router.push(`/chat/${this.room_key}`)" class=" rounded-xl min-w-full bg-white border border-purple-800 border-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-3xl sm:text-2xl font-bold shadow-md">  
          <span type="text" name="email" class="" placeholder="Email" > Graj </span> 
        </button>
      </div>
      <div  v-if="!loading_players" class="flex px-6 pt-4 pb-2">
        <span class="relative inline-block bg-white rounded-full px-3 py-1 text-gray-700 mr-2 mb-2" id="players" v-for="(player, index) in game_players" v-bind:key="index" >
          <i v-if="$store.state.user.id == this.game_master.id" class="absolute text-red-700 fas fa-times-circle z-10" v-on:click="removePlayer(player.id)"></i>
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
    room_key: String,
    next_game: String,
    description: String,
    players: Array,
  },
  components:{
      ProfileIcon
  },
   data(){
        return {
          error: {},
          ok: false,
          loading_players: false,
          response: {},
          game_players: this.players,
        }
   },
  methods:{
    removePlayer(id){
       
            this.error = "";
            this.ok = false;
            this.loading_players = true;
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Token ${this.$store.state.user.token}`,
                },
            }
            fetch(`http://localhost:8000/api/games/${this.slug}/players/${id}/remove/`,requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    
                    this.ok = true;
                    this.response = response;
                    this.game_players = this.game_players.filter(function( obj ) {
                      return obj.id !== id;
                    });
                    console.log(this.game_players)
                    this.loading_players = false;
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
    }
  },
})
</script>
