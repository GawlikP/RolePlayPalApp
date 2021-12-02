<template>
    <div id="GamesComponent">
        <div v-if="!profile_fetched" class="text-xl text-left font-bold min-w-full grid grid-cols-1">
            <p> Nie stworzyłeś swojego profilu! Przejdż do " Moje konto" i stwórz profil! </p>
        </div>
        <div v-if="profile_fetched && games_ok">
            <div class="text-xl py-3 text-left font-bold min-w-full grid grid-cols-1" id="rows" v-for="(game, index) in games" v-bind:key="index" >
                            
                                <GameCardViewComponent 
                                    v-bind:id="game.id"
                                    v-bind:name="game.name"
                                    v-bind:slug="game.slug"
                                    v-bind:edited="game.edited"
                                    v-bind:created="game.created"
                                    v-bind:game_master="game.game_master"
                                    v-bind:next_game="game.next_game"
                                    v-bind:description="game.description"
                                    v-bind:players="game.players"
                                />
                               
                
                    <div v-if="game.game_master.profile_slug == profile.slug" id="Nothing_to_show" class="container fluid px-3 min-w-full min-h-10 px-2 py-2 shadow-2xl bg-white text-gray-900 rounded-xl ">
                        <p class="break-all text-center font-bold text-2xl  min-w-full bg-white rounded-xl "> Zaproś nowych graczy </p>
                        <p class="text-center font-bold text-2xl min-w-full bg-white rounded-xl">
                            <div>
                                <div class="my-4 mx-2  rounded-xl items-center justify-center">
                                    <div class="rounded-md shadow-md -space-y-px">    
                                            <div v-if="player ===''">
                                            <input @focus="show_profile_list = true" id="username" type="text" name="username" autocomplete="username" v-model="profile_name" class="appearance-none text-center rounded relative block w-full px-2 py-2 border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-3xl md:text-2xl sm:text-xl" placeholder="Wyszukaj Profilu" /> 
                                                <div v-if="computing && show_profile_list"><p class="text-2xl fond-bold"> Searching... </p> </div>
                                                <div v-if="!computing && show_profile_list">
                                                    <div id="dropdown" class="bg-white min-w-full text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                                                        <ul class="py-1" aria-labelledby="username">
                                                        <li v-for="(profile, index) in profiles" v-bind:value="profile.slug" v-bind:key="profile.id">
                                                            <p v-if="index < 5"  v-on:click="this.player = profile; show_profile_list=false" class="flex text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><ProfileIcon v-bind:user_id="profile.user" />  {{profile.slug}}</p>
                                                        </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <p v-on:click="this.player=''" class="flex apearance-none text-center rounded relative block w-full px-2 py-2 border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-3xl md:text-2xl sm:text-xl"> <ProfileIcon v-bind:user_id="player.user" />    {{player.slug}} </p>    
                                            </div>
                                    </div>
                                </div>
                            </div> 
                           
                            <div v-if="player" class="flex items-center justify-center min-w-full lg:my-1 sm:my-8">
                                <button type="submit" v-on:click="sendInvitation(game.slug)" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center bg-purple-800  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                    <span type="text"  > Wyslij zaproszenie </span> 
                                </button>
                            </div>
                            <div v-if="sending_ok && send_status == 201">
                                <p class="break-all text-center font-bold text-2xl text-green  min-w-full bg-white rounded-xl "> Wysłano zaproszenie! </p>
                            </div>
                            <div v-if="send_status == 406" >
                                <p class="break-all text-center font-bold text-xl text-red-800  min-w-full bg-white rounded-xl "> Błąd! </p>
                                <div>
                                     <span class="text-bold text-3xl text-left font-bold text-red-600 "><div v-for="(value, name) in send_response.errors" :key="name">
                                        <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                        </div>
                                    </span>
                                </div>
                            </div>
                          
                        </p>
                    </div>
            </div>
        </div>
        <div v-if="profile_fetched && !games_ok"> 
            <div class="text-xl py-3 text-left font-bold min-w-full grid grid-cols-1"  >
                    <p class="break-all text-center font-bold text-2xl  min-w-full bg-white rounded-xl "> Brak gier do wyświetlenia</p>
            </div>
        </div>
    </div>
</template>
<script>
import GameCardViewComponent from "@/components/Games/GameCardViewComponent";
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
export default {
  data() {
    return {
      games: [],
      games_ok: false,
      loading: false,
      error: "",
      state: "games",
      profile: {},
      profile_fetched: false,
      show_profile_list: false,
      profile_name: "",
      computing: false,
      profiles: [],
      player: "",
      sending: false,
      sending_ok: false,
      sending_errors: "",
      send_response: "",
      send_status: 0,
    };
  },
  created() {
    // fetching method here
    this.fetchGames();
    this.fetchProfile();
  },
  watch: {
    $route: "fetchGames",
    $route: "fetchProfile",
    $route: "sendInvitation",
    profile_name: function (val) {
        this.computing = true
        this.player = ""
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,}
            };
            fetch(`http://localhost:8000/api/profiles/?username=${val}&slug=${val}`,requestOptions)
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    throw res;
                }
                })
                .then((res) => {
                
                this.profiles = res;
                this.computing = false;
                })
                .catch((err) => {
                    this.profiles = []
                try {
                    this.error = err.json().toString();
                } catch (e) {
                    this.error = err;
                }
                });
    },
  },
  methods: {
    
    fetchGames() {
      this.error = "";
      this.loading = true;
      this.games_ok = false;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      };
      fetch("http://localhost:8000/api/games/me/", requestOptions)
        .then((res) => {
          if (res.status == 200) {
              this.games_ok = true;
            return res.json();
          } 
          else if (res.status == 406){
              return res.json();
          }
          else {
            throw res;
          }
        })
        .then((res) => {
          this.ok = true;
          this.games = res;
          this.loading = false;
        })
        .catch((err) => {
          try {
            this.error = err.json().toString();
          } catch (e) {
            this.error = err;
          }
        });
    },
    fetchProfile() {
      this.profile_fetched = false;
      const user = this.$store.state.user.username;
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Token ${this.$store.state.user.token}` },
      };
      fetch(`http://localhost:8000/api/profiles/me/`, requestOptions)
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then((response) => {
          //console.log(response);
          this.profile_fetched = true;

          this.profile = response;
          console.log(this.profile);
        })
        .catch((err) => {
          try {
            this.fetch_error = err.json().toString();
          } catch (e) {
            this.fetch_error = err;
          }
        });
    },
    sendInvitation(game_slug){
            this.sending = true;
            this.sending_errors = ""
            this.sending_ok = false;
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Token ${this.$store.state.user.token}`},
                body: JSON.stringify({player_slug: this.player.slug})
            }
            fetch(`http://localhost:8000/api/games/${game_slug}/invitations/`,requestOptions)
            .then((res)=> {
                if(res.status == 201 || res.status == 406){
                    this.send_status = res.status;
                    return res.json()
                }else {
                

                    throw res;
                }
            })
            .then((res)=>{
                this.sending = false;
                this.sending_ok = true;
                this.send_response = res;
                console.log(this.send_status)

            })
            .catch((err) => {
                this.sending_errors= err
                console.log(err)
               
            });

    }
  },
  components: {
    GameCardViewComponent,
    ProfileIcon
  },
};
</script>
