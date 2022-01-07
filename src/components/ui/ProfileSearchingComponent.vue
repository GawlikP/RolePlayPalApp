<template> 
<div class="text-center z-20 text-md min-w-full  text-violet rounded-xl">
    <div>
        <div class="rounded-xl items-center justify-center">
            <div class="rounded-md shadow-md -space-y-px">    
                    <div v-if="player ===''">
                    <input @focus="show_profile_list = true"  id="username" type="text" name="username" autocomplete="off"  v-model="profiles_search" class="appearance-none text-center rounded relative block w-full border border-purple-800 placeholder-violet-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600  lg:text-xl md:text-md sm:text-sm" placeholder="Wyszukaj Profilu" /> 
                        <div v-if="computing && show_profile_list"><p class="text-base fond-bold"> Searching... </p> </div>
                        <div v-if="!computing && show_profile_list" class="z-40">
                            <div id="dropdown" class=" min-w-full text-base  list-none divide-y bg-violet-600 rounded shadow w-44 ">
                                <ul class="py-1" aria-labelledby="username">
                                <div v-for="(profile, index) in profiles" v-bind:value="profile.slug" v-bind:key="profile.id">
                                <li v-on:click="this.player = profile; show_profile_list=false">
                                    <p v-if="index < 5"   class="flex bg-violet-600 text-sm hover:bg-violet-200 hover:text-gray-800 hover:font-extrabold text-gray-100 block  "><ProfileIconResized v-bind:profile_image="profile.get_thumbnail" v-bind:profile_slug="null" />  {{profile.slug}}</p>
                                </li>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p v-on:click="this.player=''" class="flex appearance-none text-center rounded relative block w-full px-2 py-2 border border-purple-800 placeholder-violet-600 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-xl md:text-md sm:text-sm"> <ProfileIconResized v-bind:profile_image="player.get_thumbnail" v-bind:profile_slug="null" />    {{player.slug}} </p>    
                    </div>
            </div>
        </div>
    </div> 

        <div v-if="player !== ''" class="flex items-center justify-center min-w-full lg:my-2 sm:my-1">
            <button type="submit" v-on:click="$emit('send',player)" class=" mx-1  sm:py-1  rounded-xl min-w-full bg-white border border-purple-800  items-center justify-center bg-violet-800  text-gray-200 hover:bg-violet-600 lg:text-md sm:text-sm font-bold shadow-md">  
                <span type="text"  > Wybierz </span> 
            </button>
        </div>
        <div v-if="sending_ok && send_status == 201">
            <p class="break-all text-center font-bold text-md text-green  min-w-full bg-white rounded-xl "> Wybierz </p>
        </div>
        <div v-if="send_status == 406" >
            <p class="break-all text-center font-bold text-md text-red-800  min-w-full bg-white rounded-xl "> Błąd! </p>
            <div>
                <span class="text-bold text-3xl text-left font-bold text-red-600 "><div v-for="(value, name) in send_response.errors" :key="name">
                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                    </div>
                </span>
            </div>
        </div>

    </div>
</template>
<script>
import ProfileIconResized from '@/components/Profiles/ProfileIconComponentResized.vue'
import moment from 'moment'
export default {
    name: 'ProfileSearchingComponent',
    components: {
        ProfileIconResized
    },
    emits: ['send'],
    data() {
        return {
                loading: false,
                profile_fetched: [],
                show_profile_list: [],
                profile_name: "",
                computing: false,
                profile: {},
                profiles: [],
                player: '',
                profiles_search: [],
                profile_name: "",
                sending: false,
                sending_ok: false,
                sending_errors: "",
                send_response: "",
                send_status: 0,
        }
    },
    watch: {
    
    profiles_search(val,newv){
        this.computing = true; 
        this.player = "";
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
}
</script>
