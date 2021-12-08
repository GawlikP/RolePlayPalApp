<template>
    <div id="Games">
        <NavigationBar />
        <div class="container  min-h-screen min-w-full items-center justify-center" >
            <div class="grid grid-cols-5 gap-4 flex min-w-full my-1">
                <div></div>
                <div class="grid grid-cols-1 gap-2flex min-w-full my-1 px-1 md:col-span-5 lg:col-span-3 col-span-5">
                    <ul id="tabs" class="inline-flex w-full px-1 pt-2 ">
                          <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': state=='games',  'text-gray-800': state!=='games'}" class="px-4 py-2 -mb-px font-semibold  rounded-t " v-on:click="state='games'">Gry</li>
                          <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': state=='invitations',  'text-gray-800': state!=='invitations'}" class="px-4 py-2 font-semibold  rounded-t " v-on:click="state='invitations'" >Zaproszenia</li>
                          <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': state=='create_game',  'text-gray-800': state!=='create_game'}" class="px-4 py-2 font-semibold  rounded-t " v-on:click="state='create_game'" >Stwórz rozgrywkę</li>
                        </ul>
                    <div v-if="loading">
                        <p class="text-3xl text-left font-bold "> Please Wait... </p>
                    </div>
                     <div v-if="!loading && state=='games'">
                        
                           
                           <GamesComponent v-bind:page="page"/>
                        
                    </div>
                    <div v-if="!loading && state=='invitations'">
                            <div class="text-xl text-left font-bold min-w-full grid grid-cols-1">
                                    <InvitationsComponent  />
                            </div>
                    </div>
                    <div v-if="!loading && state=='create_game'">
                            <div class="text-xl text-left font-bold min-w-full grid grid-cols-1">
                                    <GameCreationComponent  />
                            </div>
                    </div>
                    
                </div>
                <div></div>
            </div>
            <GamesPaginationComponent />
        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/NavigationBar.vue'
import GameCardViewComponent from '@/components/Games/GameCardViewComponent'
import InvitationsComponent from '@/components/Games/InvitationsComponent'
import GamesComponent from '@/components/Games/GamesComponent'
import GameCreationComponent from '@/components/Games/GameCreationComponent'

export default ({
    name: 'Games',
    data(){
        return {
            page: this.$route.params.page,
            games: [],
            fetched_data: [],
            page_numbers: 0,
            loading: false,
            error: "",
            state: "games",
            pages_loading: true,
            pages: -1,
        }
    },
    created(){
            // fetching method here
            //this.fetchGames()
    },
    watch: {
        '$route': 'fetchGames',
        
    },
    methods: {
        setPages(pages){
                this.pages = pages;
                this.pages_loading =false;
        },
        fetchGames() {
            this.error = "";
            this.loading = true;
            const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch('http://localhost:8000/api/games/', requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json();
                }else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                this.fetched_data= res;
                this.games = this.fetched_data.games;
                this.page_numbers = this.fetched_data.page_numbers;
                this.loading = false;
            }))
            .catch((err=>{
                 try{
                            this.error = err.json().toString()
                        }
                        catch(e)
                        {
                            this.error = err;
                        }
            }))
            
        }
    },
    components: {
        NavigationBar,
        GameCardViewComponent,
        InvitationsComponent,
        GamesComponent,
        GameCreationComponent,
   
    },
})
</script>
