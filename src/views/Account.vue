<template>
    <div id="Profile" >
            <NavigationBar />
    <main >
        <div class="container z-40 min-w-full my-1 py-1 centered justify-center grid grid-cols-1">
            <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                     <div></div>
                    <div class="text-center justify-center min-w-full my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5 "> 
                            <p class="font-bold text-2xl text-purple-100 my-1 py-3 rounded rounded-2xl border border-2 bg-black "> Oto ustawienia twojego konta</p>
                           <div   class="font-bold text-2xl text-purple-900 my-4  rounded rounded-2xl border border-2 border-purple-600 bg-white "> 
                                <p v-if="!profile_exists" class="text-red-700"> Nie stworzyłeś jeszcze swojego profilu! </p>
                                <p v-if="profile_exists" class="text-green-700"> Profil istnieje! </p>

                            </div>
                           <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropAccount}"  class="font-bold text-2xl text-purple-900 my-4  rounded rounded-2xl border border-2 border-purple-600 bg-white shadow-lg"> 
                                <p v-on:click="this.dropAccount = !this.dropAccount"> Ustaw Profil </p>
                                 <form @submit.prevent >
                                    <div v-bind:class="{'hidden': !dropAccount, 'flex': dropAccount}"  class="grid grid-cols-1   min-w-full " >
                                        <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Zmień notkę</label>
                                                <input type="text" name="title" autocomplete="title" v-model="profile.note" class="appearance-none py-2 text-center rounded relative block w-full  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" :placeholder="[[profile.note]]" /> 
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
                                        <div class="flex items-center justify-center min-w-full lg:my-1 sm:my-8">
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
                           
                           
                            <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropPassword}"  class="font-bold text-2xl text-purple-900 my-4 py-3 rounded rounded-2xl border border-2 border-purple-600 bg-white shadow-lg"> 
                                <p v-on:click="this.dropPassword = !this.dropPassword"> Zmień hasło </p>
                                 <form @submit.prevent >
                
                                    <div v-bind:class="{'hidden': !dropPassword, 'flex': dropPassword}"  class="grid grid-cols-1   min-w-full " >
                                        
                                        <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Podaj nowe hasło</label>
                                                <input type="password" name="title" autocomplete="title" v-model="new_password" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" placeholder="Hasło" /> 
                                            </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class=" mx-2  rounded-xl items-center justify-center">
                                            <div class="rounded-md shadow-md -space-y-px my-1 lg:text-2xl md:text-xl sm:text-xl">    
                                                <label for="title" class=" font-bold lg:text-2xl md:text-xl sm:text-xl text-center  block placeholder-gray-600 text-gray-900"> Potwierdź stare hasło</label>
                                                <input type="password" name="title" autocomplete="title" v-model="old_password" class="appearance-none py-2 text-center rounded relative block w-full px-2  border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-2xl md:text-xl sm:text-xl" placeholder="Hasło" /> 
                                            </div>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center min-w-full lg:my-2 sm:my-1">
                                            <button type="submit" v-on:click="changePassword()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-600 boreder-1 items-center justify-center bg-purple-600  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                                <span type="text"  > Zmien Hasło </span> 
                                            </button>
                                        </div>
                                        </div>
                                        <div id="error message" v-if="change_password_errors && change_password_errors.error">
                                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                            
                                                <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 "><div v-for="(value, name) in change_password_errors.error" :key="name">
                                                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                                    </div>
                                                
                                                </span>
                                            </div>
                                        </div>
                                         
                                    </div>
                                    
                                        <div id="done" v-if="change_password_ok">
                                        <div class="my-2 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-2">
                                            <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                                            
                                                <p class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Zmiana hasła powiodła się</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </form>
                            </div> 
                            <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropUsername}" class="font-bold text-2xl text-purple-900 my-4 py-3 rounded rounded-2xl border border-2 border-purple-600 bg-white shadow-lg"> 
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
                             <div v-bind:class="{'hover:bg-purple-800 hover:text-gray-200': !dropAvatar}" class="fluid min-w-full font-bold text-2xl text-purple-900 my-1 py-2 rounded rounded-2xl border border-2 border-purple-600 bg-white objects-center justify-center shadow-lg"> 
                                    <p v-on:click="this.dropAvatar = !this.dropAvatar"  > Avatar </p> <br>
                                        <form @submit.prevent >
                                            
                                        <div v-bind:class="{'hidden': !dropAvatar, 'flex': dropAvatar}"  class="grid grid-cols-1   min-w-full justify-items-center  " >
                                                <div v-if="avatar_url==null" class="max-w-full max-h-100">
                                                    <img v-if="profile.get_image" class="object-contain h-48 w-full bg-white"  :src="profile.get_image"/>
                                                </div>
                                                <div v-else class="max-w-full max-h-100">
                                                    <img class="object-contain h-48 w-full bg-white " :src="avatar_url"/>
                                                </div>
                                                <label class="text-sm font-medium text-gray-900 block " for="user_avatar">Upload file</label>
                                                
                                                    <div class="py-2  bg-white px-2">
                                                        <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                                            <div class="md:flex">
                                                                <div class="w-full p-3">
                                                                    <div class="relative border-dotted h-48 rounded-lg border-dashed border-2 border-purple-700 bg-gray-100 flex justify-center items-center">
                                                                        <div class="absolute">
                                                                            <div class="flex flex-col items-center"> <i class="fa fa-folder-open fa-4x text-purple-700"></i> <span class="block text-gray-400 font-normal">Attach you files here</span> </div>
                                                                        </div> <input @change="handleFileUpload( $event )" type="file" class="h-full w-full opacity-0" name="">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
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
    </main>
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
            new_password: '',
            old_password: '',
            change_password_errors: {error: null},
            change_password_ok: false,
            change_password_response: null,
            newusername: '',
           
            profile_error: {},
            avatar: null,
            avatar_url: null,
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
            changePassword(){
                this.change_password_ok = false;
                this.change_password_errors.error = [];
                if(this.new_password === '') {this.change_password_errors.error.push({new_password: "Nie wypełniono pola!"}); return;}
                if(this.old_password === '') {this.change_password_errors.error.push({old_password: "Nie wypełniono pola!"}); return;}
                const requestOptions = {
                    method: "POST",
                    headers: {"Content-Type": "application/json","Authorization": `Token ${this.$store.state.user.token}`},
                    body: JSON.stringify({"new_password": this.new_password, "old_password": this.old_password})
                }
                fetch(`http://localhost:8000/api/profiles/me/set_password/`, requestOptions)
                .then((res)=> {
                    if(res.status == 201){
                        return res.json();
                    }else{
                        throw res;
                    }
                })
                .then((res) =>{
                        this.change_password_response = res;
                        this.change_password_ok = true;
                        this.change_password_errors.error = null;
                })
                .catch((err) =>{
                     err.json().then(json => {
                        this.change_password_errors = json;
                    });
                })
            },
            fetchData(){
                    const user = this.$store.state.user.username;
                    const requestOptions = {
                        method: "GET",
                        headers: {"Authorization": `Token ${this.$store.state.user.token}`},
                    }
                   fetch(`http://localhost:8000/api/profiles/me/`,requestOptions)
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
                    
                this.avatar = event.target.files[0]
                
                this.avatar_url = URL.createObjectURL(this.avatar);
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
                    fetch(`http://localhost:8000/api/profiles/me/`, requestOptions)
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
            fetch(`http://localhost:8000/api/profiles/me/`,requestOptions)
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
