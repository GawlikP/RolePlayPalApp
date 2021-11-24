<template>
    <div id="Profile" >
            <NavigationBar />
        <div class="container  min-w-full my-1 py-1 centered justify-center grid grid-cols-1">
            <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                     <div></div>
                    <div class="text-center justify-center min-w-full my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5"> 
                            <p class="font-bold text-2xl text-purple-800 my-1 py-3 rounded rounded-2xl border border-2 bg-gray-300 "> Oto ustawienia twojego konta</p>
                           <div   class="font-bold text-2xl text-purple-900 my-4  rounded rounded-2xl border border-2 bg-gray-300 "> 
                                <p v-if="!profile_exists" class="text-red-700"> Nie stworzyłeś jeszcze swojego profilu! </p>
                                <p v-if="profile_exists" class="text-green-700"> Profil istnieje! </p>

                            </div>
                           <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropAccount}"  class="font-bold text-2xl text-purple-900 my-4  rounded rounded-2xl border border-2 bg-gray-300 "> 
                                <p v-on:click="this.dropAccount = !this.dropAccount"> Ustaw Profil </p>
                                 <form @submit.prevent >
                                    <div v-bind:class="{'hidden': !dropAccount, 'flex': dropAccount}"  class="grid grid-cols-1   min-w-full " >
                                        <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Zmień notkę</label>
                                                <input type="text" name="title" autocomplete="title" v-model="profile.note" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" :placeholder="[[profile.note]]" /> 
                                            </div>
                                            </div>
                                        </div>
                                         <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Zmień Opis</label>
                                                <textarea name="content" v-model="profile.description" class="form-textarea mt-1 block w-full lg:text-2xl md:text-xl sm:text-md" rows="3" :placeholder="profile.description"></textarea>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                                            <button type="submit" v-on:click="updateProfile()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-600 boreder-1 items-center justify-center bg-purple-600  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                <span type="text"  > Ustaw dane konta </span> 
                                            </button>
                                        </div>
                                        </div>
                                        <div id="error message" v-if="error">
                                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                            
                                                <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                                    </div>
                                                
                                                </span>
                                            </div>
                                        </div>
                                         
                                    </div>
                                        <div id="done" v-if="profile_update_ok">
                                        <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">  
                                                <p class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Zaktualizowano Profil!</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> 
                           
                           
                            <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropPassword}"  class="font-bold text-2xl text-purple-900 my-4 py-3 rounded rounded-2xl border border-2 bg-gray-300 "> 
                                <p v-on:click="this.dropPassword = !this.dropPassword"> Zmień hasło </p>
                                 <form @submit.prevent >
                
                                    <div v-bind:class="{'hidden': !dropPassword, 'flex': dropPassword}"  class="grid grid-cols-1   min-w-full " >
                                        
                                        <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Podaj nowe hasło</label>
                                                <input type="text" name="title" autocomplete="title" v-model="newpassword" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" placeholder="Hasło" /> 
                                            </div>
                                            </div>
                                        </div>
                                        <div class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                                            <button type="submit" v-on:click="addPost()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-600 boreder-1 items-center justify-center bg-purple-600  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                <span type="text"  > Zmien Hasło </span> 
                                            </button>
                                        </div>
                                        </div>
                                        <div id="error message" v-if="error">
                                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                            
                                                <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                                    </div>
                                                
                                                </span>
                                            </div>
                                        </div>
                                         
                                    </div>
                                    
                                        <div id="done" v-if="ok">
                                        <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                                            
                                                <p class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Dodano twój post!</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </form>
                            </div> 
                            <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropUsername}" class="font-bold text-2xl text-purple-900 my-4 py-3 rounded rounded-2xl border border-2 bg-gray-300 "> 
                                    <p v-on:click="this.dropUsername = !this.dropUsername"> Zmień nazwę użytkownika </p> 
                                        <form @submit.prevent >
                    
                                        <div v-bind:class="{'hidden': !dropUsername, 'flex': dropUsername}"  class="grid grid-cols-1   min-w-full " >
                                            
                                            <div>
                                                <div class=" mx-2  rounded-xl items-center justify-center">
                                                <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                    <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Podaj nową nazwe użytkownika</label>
                                                    <input type="text" name="title" autocomplete="title" v-model="newusername" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" placeholder="Nazwa Użytkownika" /> 
                                                </div>
                                                </div>
                                            </div>
                                            <div class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                                                <button type="submit" v-on:click="addPost()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-600 boreder-1 items-center justify-center bg-purple-600  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                    <span type="text"  > Zmien Nazwe Użytkownika </span> 
                                                </button>
                                            </div>
                                            </div>
                                            <div id="error message" v-if="error">
                                            <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                                <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                                
                                                    <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                                        <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                                        </div>
                                                    
                                                    </span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                            <div id="done" v-if="ok">
                                            <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                                                <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                                                
                                                    <p class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Dodano twój post!</p>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </form>
                                </div> 
                             <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropAvatar}" class="font-bold text-2xl text-purple-900 my-4 py-3 rounded rounded-2xl border border-2 bg-gray-300 "> 
                                    <p v-on:click="this.dropAvatar = !this.dropAvatar"> Avatar </p> 
                                        <form @submit.prevent >
                                            
                                        <div v-bind:class="{'hidden': !dropAvatar, 'flex': dropAvatar}"  class="grid grid-cols-1   min-w-full " >
                                            
                                                <img v-if="profile.get_image" class="object-none object-center bg-yellow-300 max-w-full" :src="profile.get_image"/>
                                                
                                                <label class="text-sm font-medium text-gray-900 block mb-2" for="user_avatar">Upload file</label>
                                                <input @change="handleFileUpload( $event )" class="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg"  aria-describedby="user_avatar_help" id="user_avatar" type="file">

                                            
                                            <div v-if="!profile_exists" class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                                                <p class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-red-700 border border-red-900 boreder-1 items-center justify-center text-gray-200 hover:bg-red-500 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                    <span type="text"  > PROFIL NIE ISTNIEJE! STWORZ PROFIL, ABY USTAWIC AVATAR! </span> 
                                                </p>
                                            </div> 

                                            <div v-if="profile_exists" class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                                                <button type="submit" v-on:click="sendAvatar()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-600 boreder-1 items-center justify-center bg-purple-600  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                    <span type="text"  > Zmien Avatar</span> 
                                                </button>
                                            </div>
                                            </div>
                                            <div id="error message" v-if="avatar_error">
                                            <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                                <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                                
                                                    <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 "><div v-for="(value, name) in avatar_error" :key="name">
                                                        <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                                        </div>
                                                    
                                                    </span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                            <div id="done" v-if="avatar_ok">
                                            <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                                                <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                                                
                                                    <p class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Zmieniono Avatar!</p>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </form>
                                </div> 
                    </div>
            <div> </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/NavigationBar.vue'
export default{
    name: 'Profile',
    components: {
        NavigationBar
    },
    data(){
        return{
            ok: false,
            avatar_ok: false,
            profile_update_ok: false,
            profile_exists: false,
            dropAccount: false,
            dropPassword: false,
            dropUsername: false,
            dropAvatar: false,
            newpassword: '',
            newusername: '',
           
            profile_error: {},
            avatar: null,
            avatar_error: '',
            profile: {
                description: '',
                role: false,
                note: '',
            },
            fetch_error: {},

            error: '',

        }
    },
    created(){
            // fetching method here
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
    methods :{
            fetchData(){
                    const user = this.$store.state.user.username;
                    const requestOptions = {
                        method: "GET",
                        headers: {"Authorization": `Token ${this.$store.state.user.token}`},
                    }
                   fetch(`http://localhost:8000/api/profiles/${user}/`,requestOptions)
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
                            this.profile_exists =  true;
                           
                            this.profile = response;

                          
                    }))
                    .catch(err => {
                        try{
                            this.fetch_error = err.json().toString()
                        }
                        catch(e)
                        {
                            this.fetch_error = err;
                        }
                    })
            },
         handleFileUpload(event){
                    console.log(event)
                this.avatar = event.target.files[0]
                console.log(this.avatar)
            },
        updateProfile(){
                this.profile_error = "";
                if(!this.profile_exists)
                {
                    const requestOptions = {
                        method: "POST",
                        headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                        body: JSON.stringify({description: this.profile.description, note: this.profile.note, role: this.profile.role})
                    }
                    fetch(`http://localhost:8000/api/profiles/`, requestOptions)
                    .then((res =>{
                        if(res.status == 201){
                            return res.json()
                        }else{
                            throw res;
                        }
                    })).then((res => {
                            console.log(res)
                             this.profile_update_ok = true;
                            this.profile = res
                            this.profile_exists = true;
                    }))
                    .catch(err => {
                        try{
                            this.profile_error = err.json().toString()
                        }
                        catch(e)
                        {
                            this.profile_error = err;
                        }
                    })
                }else {
                    const requestOptions = {
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                        body: JSON.stringify({description: this.profile.description, note: this.profile.note, role: this.profile.role})
                    } 
                    fetch(`http://localhost:8000/api/profiles/${this.$store.state.user.username}/`, requestOptions)
                    .then((res =>{
                        if(res.status == 200){
                            return res.json()
                        }else{
                            throw res;
                        }
                    })).then((res => {
                            console.log(res)
                            this.profile_update_ok = true;
                            this.profile = res
                    }))
                    .catch(err => {
                        try{
                            this.profile_error = err.json().toString()
                        }
                        catch(e)
                        {
                            this.profile_error = err;
                        }
                    })
                }
                
        },
        sendAvatar(){
                this.error = "";
            this.ok = false;
            let fd = new FormData();
            fd.append('image', this.avatar);

            const requestOptions = {
                method: "PUT",
                headers: {"Authorization": `Token ${this.$store.state.user.token}`},
                body: fd
            }
            fetch(`http://localhost:8000/api/profiles/${this.$store.state.user.username}/`,requestOptions)
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
                    this.avatar_ok = true;
                    
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.avatar_error = json
                });
            })
        }
    }

}
</script>
