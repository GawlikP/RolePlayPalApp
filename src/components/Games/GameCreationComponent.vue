<template>
     <div id="GameCreationComponent" class="min-w-full flex items-center justify-center">
         <div class="items-center justify-center text-center grid grid-cols-1 gap-1 flex min-w-full my-8">
            <div v-if="loading">
                <p class="text-2xl"> Loading... </p>
            </div>
            <div v-if="!loading" class="text-center " >
                <p> Formularz dodawania nowej rozgrywki </p>
                        <div>
                            <div class=" mx-2  rounded-xl items-center justify-center">
                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-white bg-black rounded-xl"> Nazwa Rozgrywki </label>
                                <input type="text" name="title" autocomplete="title" v-model="game.name" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" placeholder="Tytuł" /> 
                            </div>
                            </div>
                        </div>
                        <div>
                            <div class=" mx-2 min-w-full  rounded-xl items-center justify-center">
                            <div class="rounded-md shadow-md -space-y-px my-1">    
                                <label for="Content" class=" font-bold lg:text-3xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-white bg-black rounded-xl"> Opis </label>
                                <textarea name="content" v-model="game.description" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl resize-x" rows=10 placeholder="Enter some long form content."></textarea>
                            </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-center min-w-full lg:my-1 sm:my-8">
                            <button type="submit" v-on:click="createGame()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-3xl sm:text-2xl font-bold shadow-md">  
                                <span type="text" name="email" class="" placeholder="Email" > Dodaj rozgrywke! </span> 
                            </button>
                        </div>
                        <div id="error message" v-if="error">
                            <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4  sm:my-6">
                                <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                
                                    <span class="text-bold text-3xl text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                        <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                        </div>
                                    
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="done" v-if="ok">
                            <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                                <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                                
                                    <p class="text-bold text-4xl text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Dodano rozgrywke!</p>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
export default ({
   name: 'GameCreationComponent',
   data(){
        return {
            game: {
                name: '',
                description:''
            },
            loading: false,
            error: "",
            status: 0,
            response: {},

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
        createGame(){
             
            this.error = "";
            this.ok = false;
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Token ${this.$store.state.user.token}`,
                },
                body: JSON.stringify({name: this.game.name   , description: this.game.description})
            }
            fetch('http://localhost:8000/api/games/',requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    console.log(response);
                    this.ok = true;
                    this.response = response;
                    console.log(this.$store.state.user.isAuthenticated)
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
          
            //this.$store.commit({type: 'logUser', token: this.token, username: this.username})
        
        }
    },
    components: {
        ProfileIcon
    }
})
</script>
