<template>
    <div id="Profile" >
            <NavigationBar />
        <div class="container  min-w-full my-1 py-1 centered justify-center ">
            <div class="  py-1 mx-1 flex min-w-full my-1">
                <div></div>
                    <div v-if="loading" class="font-bold text-xl my-1">
                        Loading...
                    </div>
                    <div v-else class="mx-2">

                        <div v-if="error" class="error my-1 ">
                            {{ error }}
                        </div>

                        <div v-if="profile" class="">
                            <div class="container mx-auto my-5 p-5">
                                    <div class="md:flex no-wrap md:-mx-2 ">
                                        <!-- Left Side -->
                                        <div class="w-full md:w-3/12 md:mx-2">
                                            <!-- Profile Card -->
                                            <div class="bg-white p-3 border-t-4 border-purple-600">
                                                <div class="image overflow-hidden">
                                                    <img class="h-auto w-full mx-auto"
                                                        :src="profile.get_image"
                                                        alt="profile_image">
                                                </div>
                                                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{profile.user_username}}</h1>
                                                <h3 class="text-gray-600 font-lg text-semibold leading-6"></h3>
                                                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 break-words">{{profile.note}}</p>
                                                <ul
                                                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                                    <li class="flex items-center py-3">
                                                        <span>Konto od:</span>
                                                        <span class="ml-auto">
                                                            <span class=" py-1 px-2 rounded text-black text-sm">
                                                                {{created_stamp}}
                                                            </span>
                                                        </span>
                                                    </li>
                                                     <li class="flex items-center py-3">
                                                        <span>Preferuje:</span>
                                                        <span class="ml-auto">
                                                            <span v-if="profile.preferred_role" class=" py-1 px-2 rounded text-black text-sm">
                                                                Mistrz Gry
                                                            </span>
                                                            <span v-else class=" py-1 px-2 rounded text-black text-sm">
                                                                Gracz
                                                            </span>

                                                        </span>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                            <!-- End of profile card -->
                                            <div class="my-4"></div>
                                           
                                        </div>
                                        <!-- Right Side -->
                                        <div class="w-full md:w-9/12 mx-2 h-64">
                                            <!-- Profile tab -->
                                            <!-- About Section -->
                                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                    <i class="text-purple-500 fa fa-dragon">
                                                      
                                                    </i>
                                                    <span class="tracking-wide">Opis</span>
                                                </div>
                                                <div class="text-gray-700">
                                                    <p class="text-2xl font-bold break-words">
                                                        {{profile.description}}
                                                    </p>
                                                </div>
                                                
                                            </div>
                                            <!-- End of about section -->

                                            <div class="my-4"></div>

                                            <!-- Experience and education -->
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
                                                <!-- End of Experience and education grid -->
                                            </div>
                                            <!-- End of profile tab -->
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                <div> </div>
            </div>
        
        </div>
    </div>
</template>
<script> 
import NavigationBar from '../components/NavigationBar.vue'
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue';
import moment from 'moment'
    export default {
        name: 'Profile',
        
        components: {
            NavigationBar,
            ProfileIcon
        },

        data(){
            return {
                profile_name: this.$route.params.slug,
                ok: false,
                ok_players: false,
                players_errors: null,
                ok_masters: false,
                masters_errors: null,
                loading: false,
                error: null,
                profile: null,
                players: {},
                masters: {},
                fetch_error: {},
                limit: 5,
            }
        },
        created(){
            // fetching method here
            this.fetchData()
        },
         computed:{
                created_stamp: function(){
                    return moment(this.profile.created).format('YYYY-MM-DD [at] hh:mm')
                }
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData(){
                this.error = this.post = null 
                this.loading = true 
                const fetch_slug = this.profile_name

                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            
                    fetch(`http://localhost:8000/api/profiles/${fetch_slug}/?limit=${this.limit}`,requestOptions)
                    .then((res => {
                        if(res.status == 200){
                            return res.json()
                        }else {
                            throw res
                        }
                    }
                    ))
                    .then((response => {
                            //console.log(response);
                            this.ok = true;
                            this.profile = response;
                            
                    }))
                    .then(() =>{
                        fetch(`http://localhost:8000/api/profiles/${fetch_slug}/players/?limit=${this.limit}`, requestOptions)
                        .then((res=> {
                            if(res.status == 200)
                            {
                                return res.json()
                            }
                            else if(res.status == 404)
                            {
                                this.players_errors = res.json();
                                return
                            }
                            else{
                                throw res
                            }
                        }))
                        .then((res=>{
                        this.ok_players = true;
                        this.loading = false;
                        this.players = res
                        
                        }))
                        

                    })
                    .then(() =>{
                            fetch(`http://localhost:8000/api/profiles/${fetch_slug}/masters/`, requestOptions)
                            .then((res=> {
                            if(res.status == 200)
                            {
                                return res.json()
                            }
                            else if(res.status == 404)
                            {
                                this.masters_errors = res.json();
                                return
                            }
                            else{
                                throw res
                            }
                        }))
                        .then((res=>{
                                this.ok_players = true;
                                
                                this.masters = res
                                console.log(this.masters)
                                this.loading = false;
                        }))
                    })
                    
                    .catch(err => {
                         try{
                            this.fetch_error = err.json().toString()
                        }
                        catch(e)
                        {
                            this.fetch_error = err;
                        }
                    })
            }

        }
        
    }
</script>