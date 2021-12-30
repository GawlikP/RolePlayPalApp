<template>
    <div id="GamePanel" class="w-screen h-screen">
        <NavigationBar />
        <div class="flex w-full h-full">
          
            <div class="min-w-full mx-4 my-2 flex">
            <GameHandoutFormModal v-if="show_form" @hide="closeModal" @add="sendHandout" />
            <SuccessGameHandoutModal v-if="upload_ok" @hide="hideOk" />
            <div id="ConfirmDeleteModal" v-if="confirm_deletation" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
                <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center items-center">
                
                    
                    <div class="bg-slate-800 bg-opacity-50 fluid justify-center shadow-xl items-center absolute top-0 right-0 bottom-0 left-0">
                        <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click="confirm_deletation = false; handout_to_delete= null;"></i>
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            
                            <h1 class="text-2xl mb-4 font-bold text-slate-500">Jesteś pewien?</h1>
                            <button v-on:click="delete_handout()" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Tak</button>
                        </div>
                    </div>
                
                </div>
            </div>
            <div id="DeleteSuccessModal" v-if="delete_ok" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
                <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center items-center" >
                    <div class="bg-slate-800 bg-opacity-50 fluid justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click="delete_ok=false"></i>
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h1 class="text-xl mb-4 font-bold text-slate-500">Udało się usunąć</h1>
                            <button v-on:click="delete_ok=false" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">OK</button>
                        </div>
                    </div>
                </div>
            </div>
                <p v-if="loading"> Loading... </p>
                <p v-if="!loading && authorized == false" class="w-full py-2  text-center text-xl font-bold "> You do not own this game </p>
                <div id="data-section" class="min-w-full" v-if="!loading && authorized">


                    <div class=" mx-auto my-5 p-5 min-w-full">
                        <div class="md:flex no-wrap md:-mx-2 ">
                                                    
                            <div class="w-full md:w-3/12 md:mx-2">
                                                       
                                <div class="bg-white p-3 border-t-4 border-purple-600">
                                    <div class="image overflow-hidden">
                                        <img class="h-auto w-full mx-auto"
                                                :src="game.game_master.profile_thumbnail"
                                            alt="profile_image">
                                        </div>
                                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">Rozgrywka:</h1>
                                            <h3 class="text-gray-600 font-lg text-semibold leading-6"></h3>
                                            <p class="text-xl text-black hover:text-gray-600 leading-6 break-words">{{game.name}}</p>
                                            <ul
                                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                            <li class="flex items-center py-3">
                                            <span>Mistrz Gry:</span>
                                            <span class="ml-auto">
                                            <span class=" py-1 px-2 rounded text-black text-sm">
                                                {{game.game_master.username}}
                                            </span>
                                            </span>
                                            </li>
                                            <li class="flex items-center py-3">
                                                <span>Rozgrywka stworzona:</span>
                                                <span class="ml-auto">

                                                </span>
                                            </li>
                                                                    
                                            </ul>
                                    </div>
                                        <div class="my-4"></div>
                                                            
                                </div>
                                                    
                                        <div class="w-full md:w-9/12 mx-2  flex flex-col">
                                                            
                                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                <i class="text-purple-800 fas fa-dice-d20"></i>
                                                <span class="tracking-wide">Opis</span>
                                                </div>
                                                <div class="text-gray-700">
                                                    <p class="text-2xl font-bold break-words">
                                                        {{game.description}}
                                                    </p>
                                                </div>
                                                                    
                                            </div>  
                                            <div class="my-4"></div>
                                            <div class="bg-white p-3 shadow-sm rounded-sm max-h-full w-full flex flex-col">
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                    <i class="text-purple-800 fas fa-book"></i>
                                                    <span class="tracking-wide">Handouts</span>
                                                </div>
                                                <div class="max-h-100 min-w-full flex flex-row ">
                                                    <div class=" flex rounded text-3xl font-bold text-center items-center hover:text-purple-700 ">
                                                        <i v-on:click="handouts_pointer -= 1" class="fas fa-angle-left"></i>
                                                    </div>
                                                    <div v-for="(handout, index) in actual_handouts" v-bind:key="handout.id" class="h-md rounded overflow-hidden flex  w-full shadow-lg  ">
                                                        <div @mouseover="handouts_hover[handout.id] = true" @mouseleave="handouts_hover[handout.id] = false" class="min-w-full flex flex-col">
                                                            <i v-if="$store.state.user.id == this.game.game_master.id && handouts_hover[handout.id]" class="absolute text-red-700 text-2xl fas fa-times-circle z-10" v-on:click="confirm_deletation = true; handout_to_delete = handout"></i>
                                                            <img class="object-scale-down max-h-48 "
                                                            :src="handout.get_image"
                                                            alt="Sunset in the mountains">
                                                            <div class="px-6 py-4">
                                                                <div class="font-bold text-xl mb-2">{{handout.name}}</div>
                                                            
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="max-w-sm flex rounded text-3xl font-bold text-center items-center hover:text-purple-700 ">
                                                        <i v-on:click="handouts_pointer += 1" class="fas fa-angle-right"></i>
                                                    </div>
                                                </div>
                                                 <div class="flex flex-col items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                    <div v-on:click="show_form = !show_form" class="fluid hover:bg-gray-200 hover:text-purple-700">
                                                        <i class="fas fa-folder-plus"></i>
                                                        <span class="tracking-wide">Dodaj nowy</span>
                                                    </div>
                                                </div>
                                                                    
                                            </div>  
                                            <div class="my-4"></div>
                                            <div class="w-full bg-white p-3 shadow-sm rounded-sm">

                                                <div class="flex min-w-full">
                                                    <div>
                                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">   
                                                        <h2 class="tracking-wide text-3xl font-bold"> Gracze </h2>
                                                    </div>
                                                        <ul v-if="game.players" class="list-inside space-y-2">
                                                            <li  v-for="(player, index) in game.players" v-bind:key="index" 
                                                            class="container fluid min-w-full min-h-10 mx-2 py-3 shadow-xl rounded-xl">
                                                                <p class="font-bold flex "> <ProfileIcon v-bind:user_id="player.id" />   {{player.username}} </p>
                                                            </li>
                                                            </ul>
                                                            <p v-else> Aktualnie nikomu nie mistrzuje</p>
                                                    </div>
                                                </div>            
                                            </div>                
                                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue';
import GameHandoutFormModal from '@/components/GamePanel/GameHandoutFormModal.vue';
import SuccessGameHandoutModal from '@/components/GamePanel/SuccessGameHandoutModal.vue'
export default {
    name: 'GamePanel',
    components: {
        NavigationBar,
        ProfileIcon,
        GameHandoutFormModal,
        SuccessGameHandoutModal
    },
    data(){
            return {
                game_slug: this.$route.params.slug,
                ok: false,
                loading: false,
                error: null,
                authorized: false,
                game: null,
                handouts_hover: [
                    false,
                    false,
                    false,
                ],
                show_form: false,
                upload_ok: false,
                handouts_pointer: 0,
                handouts_number: 0,
                actual_handouts: 0,
                confirm_deletation: false,
                handout_to_delete: null,
                delete_ok: false,
            }
    },
    watch:{
        handouts_pointer(val, oldval){
                if(val + 3 > this.handouts_number){ val = Math.max(0,this.handouts_number - 3); this.handouts_pointer = this.handouts_number - 3;}
                if(val < 0) {val = 0; this.handouts_pointer = 0;}
                this.actual_handouts = this.game.game_handouts.slice(0 + val, 3 + val);
                
        }
    },
    created() {
        this.getGameData();
    },
    methods:{
        closeModal(){
            this.show_form = false;
        },
        showConfirmation(game){

        },
        getGameData(){
            this.error = "";
            this.loading = true;
            this.ok = false;
            this.game = {};
            const requestOptions = {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,
                },
            };
            fetch(`http://localhost:8000/api/games/${this.game_slug}/`, requestOptions)
                .then((res) => {
                if (res.status == 200) {
                    
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
                    this.game = res;
                    if ( this.game.game_master.id == this.$store.state.user.id ) this.authorized= true;
                    this.handouts_hover = Array.from(this.game.game_handouts, (x, index) => x.id).reduce((map,obj) => { map[obj] = false; return map;}, {})
                    this.loading = false;
                    this.handouts_pointer = 0;
                    this.handouts_number = this.game.game_handouts.length
                    this.actual_handouts = this.game.game_handouts.slice(0 , 3 );
                    this.ok = true;
                    console.log(this.handouts_hover)
                })
                .catch((err) => {
                        console.log(err)
                });
        },
        delete_handout(){
             const requestOptions = {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,
                },
                body: JSON.stringify({deleted: true})
            };
            fetch(`http://localhost:8000/api/games/${this.game_slug}/handouts/${this.handout_to_delete.slug}/`, requestOptions)
                .then((res) => {
                if (res.status == 201) {
                    
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
                    this.delete_ok = true;
                    this.handout_to_delete = null;
                    this.confirm_deletation = false;
                    
                })
                .catch((err) => {
                        console.log(err)
                });
        },
        sendHandout(image, name){
                this.error = "";
            this.ok = false;
            let fd = new FormData();
            fd.append('image', image);
            fd.append('name', name)

            const requestOptions = {
                method: "POST",
                headers: {"Authorization": `Token ${this.$store.state.user.token}`},
                body: fd
            }
            fetch(`http://localhost:8000/api/games/${this.game_slug}/handouts/`,requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    console.log(response);
                    this.game.game_handouts.push(response)
                    this.closeModal()
                    this.upload_ok = true;
                    this.handouts_pointer = 0;
                    console.log(this.actual_handouts)
            }))
            .catch(err => {
                console.log(err)
              
            })
        },
        hideOk(){
            this.upload_ok = false;
        },
    }
}
</script>