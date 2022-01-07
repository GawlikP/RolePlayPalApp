<template>
 <div id="Messages"  class="container min-h-full min-w-full">
        <NavigationBar />
        <div class="flex w-full h-full">
            <div id="ConfirmDeleteModal" v-if="error && error.errors && error.errors.messagecredential !== undefined" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center  h-modal md:h-full md:inset-0">
                <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center ">
                    <div class="bg-slate-800 bg-opacity-50 fluid justify-center  w-full  absolute top-0 right-0 bottom-0 left-0">
                        <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click="error=null"></i>
                        <div class="bg-white px-16 py-14 rounded-md text-center shadow-xl">
                            <h2> Czy chcesz mieć możliwość pisania do tego użytkownika i czytania jego wiadomości?</h2>
                           
                            <button v-on:click="error=null; updateCredentials('A')" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Tak</button>
                            <button v-on:click="error=null; updateCredentials('B')" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Nie</button>
                        </div>
                    </div>
                
                </div>
            </div>
             <div id="ConfirmDeleteModal" v-if="error && error.errors && error.errors.messagecredential === undefined" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center  h-modal md:h-full md:inset-0">
                <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center ">
                
                    <div class="bg-slate-800 bg-opacity-50 fluid justify-center   absolute top-0 right-0 bottom-0 left-0">
                        <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click="error=null"></i>
                        <div class="bg-white px-16 py-14 rounded-md text-center shadow-xl">
                            <h2> Błąd! </h2>
                            <div  v-for="(value,name ) in error.errors" :key="name" class="py-1"> 
                            <p class="text-2xl mb-4 font-bold text-slate-500">{{value}}</p>
                            </div>
                            <button v-on:click="error=null" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">OK</button>
                        </div>
                    </div>
                
                </div>
            </div>

            <div id="ConfirmDeleteModal" v-if="credentials_status=='B'" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center  h-modal md:h-full md:inset-0">
                <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center ">
                
                    <div class="bg-slate-800 bg-opacity-50 fluid justify-center  absolute top-0 right-0 bottom-0 left-0">
                        <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click="null;actual_profile=null; credentials_status=null;"></i>
                        <div class="bg-white px-16 py-14 rounded-md text-center shadow-xl">
                            <h2> Ten użytkownik został przez ciebie zablokowany!</h2>
                           
                            <button v-on:click="chat=null;actual_profile=null; credentials_status=null;" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">OK</button>
           
                        </div>
                    </div>
                
                </div>
            </div>
          <p v-if="!profile" class="text-2xl text-violet-700 w-full" > Stworz swoj profil! </p>
            <div v-else class="min-w-full min-h-full  container">
                <p v-if="loading"> Loading... </p>
                <div id="data-section" class="min-w-full min-h-full" v-if="!loading">
                    <div class=" mx-auto  p-5 min-w-full min-h-full">
                        <div class="h-full md:flex no-wrap md:-mx-2 ">
                                                    
                            <div class="w-full h-full md:w-3/12 md:mx-2">
                                                       
                                <div class="h-full bg-violet-200 p-3 border-t-4 border-violet-700">
                                            <h1 class="text-violet-900 font-bold text-xl leading-8 ">Wiadomości</h1>
                                            <ul
                                            class="h-full bg-violet-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                            <li class="h-20 flex flex-col py-1">
                                             
                                                 <ProfileSearchingComponent @send="loadChat"/>
                                            </li>
                                            <li class="h-10 flex flex-col py-3">
                                            <span>Ostatnie osoby:</span>
                                            </li>
                                            <li class="h-60 flex flex-col py-3">
                                               <p> TEST</p>
                                               <p> TEST 2 </p>
                                            </li>
                                             
                                                                    
                                            </ul>
                                    </div>
                                        <div class="my-4"></div>
                                                            
                                </div>
                                                    
                                        <div class="w-full h-full md:w-9/12 mx-2  flex flex-col">
                                                            
                                            <div class="bg-violet-800 text-violet-100  p-3 shadow-sm rounded-sm">
                                                <div class="flex items-center space-x-2 font-bold leading-8 text-3xl">
                                                <p class="w-full text-left"><i class="fas fa-comment-alt"></i> Chat</p>
                                                </div>
                                                <div class="text-gray-700">
                                                    <p class="text-2xl font-bold break-words">
                                                      
                                                    </p>
                                                </div>
                                               
                                                                    
                                            </div>  
                                            <div class="w-full h-96 my-1 bg-violet-100 text-violet-900 shadow-xl rounded-xl border-violet-800">
                                                    <div class="w-full h-full px-1 py-1"> 
                                                        <div class="h-80 w-full"> 
                                                                    <div v-if="chat_loading" class="h-full flex items-centered justify-center content-center text-violet-900"> <h1 class="text-3xl font-bold"><i class="fas fa-comment-dots"></i>...</h1> </div>
                                                                    <div v-if="!chat && !chat_loading" class="h-full flex items-centered justify-center content-center text-violet-900"> <h1 class="text-3xl font-bold">...</h1> </div>
                                                                    <div id="chat_container" class="w-full overflow-y-auto h-full flex flex-col" v-if="!chat_loading && chat && credentials_status == 'A'">
                                                                        <p v-for="(message, index) in chat" v-bind:key="index" v-bind:class="{'text-right': message.sender_user.id == profile.user, 'text-left': message.sender_user.id != profile.user}" class="py-1 w-full  right-0 px-1"><span class="inline-block  rounded fluid bg-violet-700 text-violet-100 px-1"> <div class="inline flex "><ProfileIconResized v-bind:profile_slug="message.sender_user.profile_slug" v-bind:profile_image="message.sender_user.profile_thumbnail" class="px-1"/>{{message.text}} </div></span></p>
                                                                        <p class="w-full py-5"></p>
                                                                    </div>
                                                        </div>
                                                        <div class="w-full flex flex-row">
                                                            <textarea id="username" type="text" name="username" autocomplete="off"  v-model="input_text" class="appearance-none text-left rounded relative block w-5/6 border border-purple-800 placeholder-violet-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600  lg:text-md md:text-sm sm:text-sm resize-none"  rows="1" ></textarea> 
                                                            <div class="w-1/6 flex text-center xl:text-xl md:text-xl sm:text-md font-bold"><i v-on:click="sendMessage()" class="far fa-paper-plane"></i> </div>
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
import NavigationBar from '@/components/NavigationBar.vue'
import ProfileIconResized from '@/components/Profiles/ProfileIconComponentResized.vue'
import ProfileSearchingComponent from '@/components/ui/ProfileSearchingComponent.vue'
import moment from 'moment'
export default {

    name: 'Messages',
    components: {
        NavigationBar,
        ProfileIconResized,
        ProfileSearchingComponent 
    },
   
    data() {
        return {
                loading: false,
                message: '',
                chat: null,
                chat_buffer: '',
                chat_loading: false,
                error: null,
                actual_profile: null,
                profile: null,
                chat_status: 'NOT CONNECTED',
                input_text: '',
                credentials_status: 'loading',
                credentials: null,
        }
    },
    created(){
        this.getProfile()
    },
    watch: {
        '$route':'getProfile',
        chat_buffer(newdata,olddata){
			if(newdata.message )
			{
				this.chat.push({text: newdata.message, sender_user:{id: newdata.user_id, profile_thumbnail: newdata.thumbnail}});
			}
		},
    },
    methods: {
        scrollToBottom() {
            const container = this.$el.querySelector("#chat_container");
            container.scrollTop = container.scrollHeight + 40;
        },
        getProfile(){
        this.loading = true;
        const requestOptions = {
          method: "GET",
          headers: {"Content-Type": "application/json",
          "Authorization": `Token ${this.$store.state.user.token}`}
        }
        fetch(`http://localhost:8000/api/profiles/me/`, requestOptions)
        .then((res) => {
          if(res.status == 200){
            return res.json();
          }else {
            throw res;
          }
        })
        .then((response) => {
          this.profile_fetched = true;
          this.profile = response;
        
          this.loading = false;
        })
        .catch((err) => {
          try{
            this.fetch_error = err.json().toString();
          } catch(e){
            this.fetch_error = err;
          }
        })
      },
        loadChat(profile){
            this.chat_loading = true;
            this.chat = null
            this.actual_profile = profile;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,}
        };
        fetch(`http://localhost:8000/api/private_messages/me/profile/${profile.slug}/`,requestOptions)
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    throw res;
                }
                })
                .then((res) => {
                
                
                     this.chat = res;
                     if(this.chat.errors) this.chat = [];
  
                     this.chat_loading = false
        
                    return this.chat
                
                })
                .then(() =>{
                    //if(this.chatSocket)this.chatSocket.close();
                    //this.setupChat();
                    this.checkCredentials(profile);
                })
                .catch((err) => {
                  this.chat = null
                        this.chat_loading = false;
                       
                            try {
                                  err.json().then(json => {
                                    this.error = json
                                });
                            } catch (e) {
                                this.error = err;
                            }
                });
        },
        setupChat(){
			this.chat_loading = true;
            let name = 'connect';
			this.chatSocket = new WebSocket('ws://localhost:8000'+'/ws/chat/private/' + name + '/'+`?authorization=${this.$store.state.user.token}&user1=${this.profile.slug}&user2=${this.actual_profile.slug}`);
			let self = this;
			this.chatSocket.onmessage = function(e){
				const data = JSON.parse(e.data);
				//console.log(data)
			
				self.chat_buffer = data.message;
                self.scrollToBottom()

				//this.getMessage(data) 
				
			}
			this.chatSocket.onclose = function(e){
				console.error('Chat socket closed!');
				self.chat_status += "CONNECTION FAILED";
				
				//self.connected = false;
				self.loading = false;
			}
			this.chatSocket.onopen = function(e){
				//console.log(event)
				self.chat_status += "Connnected! \n"
			//	self.connected = true;
				self.loading = false;
			}

			this.chat_loading = false;
            this.scrollToBottom()
		},
        sendMessage(){
      
			this.chatSocket.send(JSON.stringify({'message': this.input_text}))
			this.input_text = '';
            this.scrollToBottom();
		},
        checkCredentials(profile){
            this.credentials_status = 'loading';
            this.credentials = null;
            const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,}
            };
            fetch(`http://localhost:8000/api/private_messages/messagecredentials/me/profile/${profile.slug}/`,requestOptions)
                .then((res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        throw res;
                    }
                    })
                    .then((res) => {
                    
                    
                        this.credentials = res
                        
                        if(this.credentials.errors) this.credentials = {};
                        else {this.credentials_status = this.credentials.status;}
                        console.log(this.credentials_status)
                        this.chat_loading = false
                        return this.credentials
                    
                    })
                    .then(() =>{
                        if(this.chatSocket)this.chatSocket.close();
                        this.setupChat();
                    })
                    .catch((err) => {
                        this.chat = null
                        this.chat_loading = false;
                     
                            try {
                                  err.json().then(json => {
                                  
                                    this.error = json
                                });
                            } catch (e) {
                                this.error = err;
                            }
                    });   
		},
        updateCredentials(choice){
            
            this.credentials_status = 'loading';
            this.credentials = null;
            const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.$store.state.user.token}`,
            },
            body: JSON.stringify({"status":choice, "user_to": this.actual_profile.user})
            };
            fetch(`http://localhost:8000/api/private_messages/messagecredentials/me/`,requestOptions)
                .then((res) => {
                    if (res.status == 201) {
                        return res.json();
                    } else {
                        throw res;
                    }
                    })
                    .then((res) => {
                    
                    
                        this.credentials = res
                        
                        if(this.credentials.errors) this.credentials = {};
                        else {this.credentials_status = this.credentials.status;}
                        console.log(this.credentials)
                        this.chat_loading = false
                        return this.credentials
                    
                    })
                    .then(() =>{
                        if(this.chatSocket)this.chatSocket.close();
                        this.loadChat(this.actual_profile)
                    })
                    .catch((err) => {
                        this.chat = null
                        this.chat_loading = false;
                        this.actual_profile = null;
                            try {
                                  err.json().then(json => {
                                  
                                    this.error = json
                                });
                            } catch (e) {
                                this.error = err;
                            }
                    });   
        },
    }
}
</script>