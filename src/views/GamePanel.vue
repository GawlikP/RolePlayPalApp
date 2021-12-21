<template>
    <div id="GamePanel" class="w-screen h-screen">
        <NavigationBar />
        <main class="w-full h-full">
            <div class="mx-4 my-2">
                <p v-if="loading"> Loading... </p>
                <p v-if="!loading && authorized == false" class="w-full py-2  text-center text-xl font-bold "> You do not own this game </p>
                <div id="data-section" v-if="!loading && authorized">


 <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2 ">
                                        <!-- Left Side -->
        <div class="w-full md:w-3/12 md:mx-2">
                                            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-purple-600">
                <div class="image overflow-hidden">
                    <img class="h-auto w-full mx-auto"
                       
                        alt="profile_image">
                    </div>
                        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">fsdfsdfsdf</h1>
                        <h3 class="text-gray-600 font-lg text-semibold leading-6"></h3>
                        <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 break-words">gfdgsfgfdg</p>
                        <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                        <span>Konto od:</span>
                        <span class="ml-auto">
                        <span class=" py-1 px-2 rounded text-black text-sm">
                            gdfdfgfdgdf
                        </span>
                        </span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Preferuje:</span>
                            <span class="ml-auto">
                            <span v-if="false" class=" py-1 px-2 rounded text-black text-sm">
                                Mistrz Gry
                            </span>
                            <span v-else class=" py-1 px-2 rounded text-black text-sm">
                                gdfggdfg
                            </span>

                            </span>
                        </li>
                                                   
                        </ul>
                    </div>
                    <div class="my-4"></div>
                                           
                    </div>
                                 
                    <div class="w-full md:w-9/12 mx-2 h-64">
                                         
                        <div class="bg-white p-3 shadow-sm rounded-sm">
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                            <i class="text-purple-500 fa fa-dragon">
                                                      
                            </i>
                            <span class="tracking-wide">Opis</span>
                        </div>
                        <div class="text-gray-700">
                            <p class="text-2xl font-bold break-words">
                                sdfgthytujiygh
                            </p>
                        </div>
                                                
                    </div>
                                         
                    <div class="my-4"></div>


                    <div class="bg-white p-3 shadow-sm rounded-sm">

                        <div class="grid grid-cols-2">
                            <div>
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">   
                                <span class="tracking-wide font-3xl"> Mistrzuje dla</span>
                            </div>
                                <ul v-if="!players_errors" class="list-inside space-y-2">
                                    <li  v-for="(player, index) in players" v-bind:key="index" 
                                    class="container fluid min-w-full min-h-10 mx-2 py-2 shadow rounded-xl">
                                        <p class="font-bold flex "> <ProfileIcon v-bind:user_id="player.user" />   {{player.user_username}} </p>
                                    </li>
                                    </ul>
                                    <p v-else> Aktualnie nikomu nie mistrzuje</p>
                            </div>
                            <div>
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                          
                                <span class="tracking-wide font-3xl">Gra dla</span>
                                </div>
                                <ul v-if="!masters_errors" class="list-inside space-y-2">
                                    <li  v-for="(master, index) in masters" v-bind:key="index" 
                                    class="container fluid min-w-full min-h-10 mx-2 py-2 shadow rounded-xl">
                                    <p class="font-bold flex "> <ProfileIcon v-bind:user_id="master.user" />{{master.user_username}} </p>
                                    </li>
                                </ul>
                                <p v-else> Aktualnie z nikim nie gra </p>
                            </div>
                        </div>
                                             
                    </div>
                                        
                </div>
            </div>
        </div>
                            

                </div>
                
            </div>
        </main>
    </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
export default {
    name: 'GamePanel',
    components: {
        NavigationBar,
    },
    data(){
            return {
                game_slug: this.$route.params.slug,
                ok: false,
                loading: false,
                error: null,
                authorized: false,
                game: null,
            }
    },
    watch:{

    },
    created() {
        this.getGameData();
    },
    methods:{
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
                this.loading = false;
                this.ok = true;
                
                })
                .catch((err) => {
                try {
                    this.error = err.json().toString();
                } catch (e) {
                    this.error['other'] = err;
                }
                });
        }
    }
}
</script>