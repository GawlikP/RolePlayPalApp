<template>
    <div id="InvitationsComponent">
        <div class="flex items-center justify-center min-w-full grid grid-cols-3 lg:my-4 sm:my-4">
            <ul id="tabs" class="inline-flex w-full px-1 pt-2 ">
                <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': filter=='canceled',  'text-gray-800': filter!=='canceled'}" class="px-4 py-2 -mb-px font-semibold  rounded-t " v-on:click="filter='canceled'">Odrzucone</li>
                <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': filter=='accepted',  'text-gray-800': filter!=='accepted'}" class="px-4 py-2 font-semibold  rounded-t " v-on:click="filter='accepted'" >Akceptowane</li>
                <li v-bind:class="{'text-purple-900 border-b-2 border-purple-400': filter=='pending',  'text-gray-800': filter!=='pending'}" class="px-4 py-2 font-semibold  rounded-t " v-on:click="filter='pending'" >Oczekujące</li>
            </ul>
           
           
        </div>
        <div v-if="loading">
            <p class="text-2xl"> Loading... </p>
        </div>
        <div v-if="!loading && !not_found" >
            <div id="rows" v-for="(invitation, index) in invitations" v-bind:key="index" class="container fluid px-3 min-w-full min-h-10 px-2 py-2 shadow-2xl   rounded-xl ">
        
                <p></p> 
                <p class="font-bold break-all min-w-full text-purple-900" > <ProfileIcon v-bind:user_id="invitation.game_master_sender.id" />Mistrz gry: {{invitation.game_master_sender.username}} </p>
                <p class="break-all text-center font-bold text-xl text-gray-100 min-w-full bg-black rounded-xl " > Gra: {{invitation.game_name}}  </p>
                <p class="break-all mx-1 py-2">Treść {{invitation.text}}  </p>
                <p class="break-all py-1 text-center text-md"> Gracze: {{invitation.game.players.length}}  </p>
                <div v-if="filter == 'pending'" class="flex items-center justify-center min-w-full lg:my-4 sm:my-2">
                            <button type="submit" v-on:click="Accept(invitation.id)" class="my-2 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-2xl sm:text-xl font-bold shadow-md">  
                                <span type="text" name="email" class="" placeholder="Email" > Akceptuj </span> 
                            </button>
                </div>
                <div v-if="filter == 'pending'"  class="flex items-center justify-center min-w-full lg:my-4 sm:my-4">
                            <button type="submit" v-on:click="Cancel(invitation.id)" class="my-2 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-red-800 boreder-1 items-center justify-center hover:bg-red-700 hover:text-white lg:text-2xl sm:text-xl font-bold shadow-md">  
                                <span type="text" name="email" class="" placeholder="Email" > Odrzuć </span> 
                            </button>
                </div>
                
            </div>
        </div>
        <div v-if="!loading && not_found" >
            <div id="Nothing_to_show" class="container fluid px-3 min-w-full min-h-10 px-2 py-2 shadow-2xl   rounded-xl ">
                <p class="break-all text-center font-bold text-2xl text-gray-100 min-w-full bg-black rounded-xl "> Nothing to show </p>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
export default ({
    name: 'InvitationsComponent',
    data(){
        return{
            loading: false,
            ok: false,
            errors: "",
            invitations: [],
            filter:"pending",
            not_found: false,
            not_found_response: {},
            response: {},
        }
    },
    created(){
        this.GetPending()
    },
     watch: {
        '$route': 'GetPending',
        '$route': 'GetAccepted',
        '$route': 'GetCanceled',
        filter: function (val) {
            if(val == 'accepted') this.GetAccepted();
            if(val == 'canceled') this.GetCanceled();
            if(val == 'pending') this.GetPending();
        }
    },
    methods: {
        GetPending(){
            this.error = "";
            this.loading = true;
            this.not_found = false;
            this.not_found_response = {};
            const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch('http://localhost:8000/api/games/invitations/me/?accepted=False&canceled=False', requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json();
                } 
                if(res.status == 404)
                {
                    this.not_found = true;
                    return res.json();
                }
                else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                 if(!this.not_found)
                    this.invitations = res;
                else 
                    this.not_found_response = res;
                this.loading = false;
                this.filter= "pending";
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
        },
        GetAccepted(){
            this.error = "";
            this.loading = true;
            this.not_found = false;
            this.not_found_response = {};
            const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch('http://localhost:8000/api/games/invitations/me/?accepted=True', requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json();
                }
                if(res.status == 404)
                {
                    this.not_found = true;
                    return res.json();
                }
                else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                 if(!this.not_found)
                    this.invitations = res;
                else 
                    this.not_found_response = res;
                this.loading = false;
                this.filter= "accepted";
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
        },
        GetCanceled(){
            this.error = "";
            this.loading = true;
            this.not_found = false;
            this.not_found_response = {};
            const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch('http://localhost:8000/api/games/invitations/me/?canceled=True', requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json();
                }
                if(res.status == 404)
                {
                    this.not_found = true;
                    return res.json();
                }
                else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                if(!this.not_found)
                    this.invitations = res;
                else 
                    this.not_found_response = res;
                this.loading = false;
                this.filter= "canceled";
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
        },
        Cancel(id){
            this.error = "";
            this.ok = false;
            const requestOptions = {
                    method: "POST",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch(`http://localhost:8000/api/games/invitations/${id}/cancel/`, requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json();
                    
                }else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                this.response = res;
                this.invitations = this.invitations.filter(function( obj ) {
                    return obj.id !== id;
                });
                this.response = res;
                this.filter='canceled'
                this.GetCanceled();
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
        },
        Accept(id){
             this.error = "";
            this.ok = false;
            const requestOptions = {
                    method: "POST",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            fetch(`http://localhost:8000/api/games/invitations/${id}/accept/`, requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json();
                }else{
                    throw res;
                }
            }))
            .then((res=> {
                this.ok = true;
                this.response = res;
                this.invitations = this.invitations.filter(function( obj ) {
                    return obj.id !== id;
                });
                this.filter='accepted'
                this.response = res;
                this.GetAccepted();
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
    components:{
          ProfileIcon 
      }
})
</script>
