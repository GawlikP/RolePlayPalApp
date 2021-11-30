<template>
    <div id="Games">
        <NavigationBar />
        <div class="container  min-h-screen min-w-full items-center justify-center" >
            <div class="grid grid-cols-5 gap-4 flex min-w-full my-1">
                <div></div>
                <div class="grid grid-cols-1 gap-2flex min-w-full my-1 px-1 md:col-span-5 lg:col-span-3 col-span-5">
                    <div v-if="loading">
                        <p class="text-3xl text-left font-bold "> Please Wait... </p>
                    </div>
                     <div v-if="!loading && state=='games'">
                        <div class="text-xl text-left font-bold min-w-full grid grid-cols-1" id="rows" v-for="(game, index) in games" v-bind:key="index" >
                           
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
                        </div>
                        <div v-if="!loading && state=='invitations'">
                            <div class="text-xl text-left font-bold min-w-full grid grid-cols-1">

                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/NavigationBar.vue'
import GameCardViewComponent from '@/components/Games/GameCardViewComponent'

export default ({
    name: 'Games',
    data(){
        return {
            games: [],
            loading: false,
            error: "",
            state: "invitations",
        }
    },
    created(){
            // fetching method here
            this.fetchGames()
    },
    watch: {
        '$route': 'fetchGames'
    },
    methods: {
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
                this.games = res;
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
        GameCardViewComponent
    },
})
</script>
