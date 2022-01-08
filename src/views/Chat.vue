<template>
    <div id="Chat" class=" w-screen h-screen" ref="chatpanel">
        <NavigationBar />
        <div class="flex w-full h-full">
          
            <div class="min-w-full min-h-full mx-4  flex">

                <p v-if="loading"> Loading... </p>
                
                <div id="data_section" class="min-w-full min-h-full" v-if="!loading ">


                    <div class=" mx-auto  p-5 min-w-full">
                        <div  class="md:flex no-wrap md:-mx-2 " id="info-box" ref="infoBox">
                                                    
                            <div class="w-full md:w-3/12 md:mx-2">
                                                       
                                <div class="bg-white py3 border-t-4 border-b-2 shadow  border-purple-600 ">
                                    <div class="image overflow-hidden">
                                       
                                        </div>
                                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">Rozgrywka:</h1>
                                            <h3 class="text-gray-600 font-lg text-semibold leading-6"></h3>
                                            <p class="text-xl text-black hover:text-gray-600 leading-6 break-words">{{game.name}}</p>
											 <button class="text-black " v-on:click="getChatHeight()" >TEST</button>
                                            <ul
                                            class="max-h-5/6 bg-white text-gray-600 hover:text-gray-700 hover:shadow py-2 mt-3 divide-y rounded shadow-sm overflow-hidden">
                                            <li  >
													
													<div class="min-w-full grow overflow-y-scroll flex flex-col items-center  my-2  rounded shadow-xl" style="height: 500px"
													 :style="{'height': `${getChatHeight()}px`}" :key="chat_height">						
														<div v-for="(message, value) in chat_data " :key="value" class="inline-block min-w-full" >
															
															<p v-if="message.result === undefined && message.new_handout === ''" class="inline-block shadow flex  border py-1  lg:text-sm md:text-md sm:text-sm break-all  min-w-full"><ProfileIconResized v-bind:profile_slug="null" v-bind:profile_image="message.thumbnail" class=" sm:w-16 sm:w-16" /><span class=""><b>{{message.username}}</b>:{{message.message}}</span> </p> 
															<p v-if="message.result === undefined && message.new_handout" class="inline-block shadow flex flex-col border py-1  lg:text-sm md:text-md sm:text-sm break-all  min-w-full rounded-xl bg-violet-700 text-white">
																<p class="inline-block flex w-full font-bold"><ProfileIconResized v-bind:profile_slug="null" v-bind:profile_image="message.thumbnail" class=" sm:w-16 sm:w-16" /><span class=""><b>{{message.username}}</b></span></p>
																<p class="w-full text-center lg:text-xl md:text-md sm:text-md font-bold">{{message.message}}</p> 
															</p> 
															<p v-if="message.result" class="inline-block shadow flex flex-col bg-violet-800 text-white border py-1  lg:text-sm md:text-md sm:text-sm break-all  min-w-full rounded">
																<p class="inline-block flex"><ProfileIconResized v-bind:profile_slug="null" v-bind:profile_image="message.thumbnail" class=" sm:w-16 sm:w-16" /> <b>{{message.username}}</b>:<span class="font-bold"> WYKONAŁ RZUT</span></p>
																<p class="text-center font-bold"><span>Wynik: {{message.result}} </span></p> 
																<p class="font-bold py-1 text-center" v-for="(roll, value) in message.rolls" :key="value"> <i class="fas fa-dice-d20"></i> {{roll}}:{{message.rolls_end[value]}} </p>
															</p> 
															
														</div> 
													</div>
											</li>
											<li> 
												<div class="  w-full  grid grid-cols-7 ">
														<input v-model="input_text" type="text" class="col-span-6 min-w-full appearance-none text-left rounded   border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 md:text-2xl sm:text-xl" id="inputs_area"/>
														<input type="submit" v-on:click="sendMessage()" value=">" class="col-span-1   w-full bg-purple-600 hover:bg-purple-800 text-gray-100 rounded"/>
														</div>
											</li>
											<li v-if="game.game_master.id == this.$store.state.user.id">
												<div class="w-full mx-2  rounded-xl items-center justify-center py-2">
													<select v-model="actual_handout" class="block appearance-none lg:text-2xl md:text-xl sm:text-xl  w-full bg-white border border-purple-400 hover:border-purple-800 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
															<option v-for="handout in game.game_handouts" v-bind:value="handout" v-bind:key="handout.id">
																{{ handout.name }}
															</option>
													</select>
													
												</div>
											</li>
											
                                                                    
                                            </ul>
                                    </div>
                                        <div class="my-4"></div>
                                                            
                                </div>
                                                    
                                        <div class="w-full md:w-9/12 mx-2 h-full  flex flex-col">
                                                            
                                            <div class="bg-white p-3 shadow-sm rounded-sm max-h-70">
                                                <div class="flex text-center items-center space-x-2 font-semibold text-gray-900 leading-8 text-2xl">
                                                
                                                <span class="tracking-wide"> Handout</span>
                                                </div>
                                                <div class="text-gray-700 text-center">
                                                    <p class="text-2xl text-center font-bold break-words">
                                                        {{showing_handout.name}}
                                                    </p>
                                                </div>
                                                                    
                                            </div>  
                                            <div class="my-4"></div>
                                            <div class="bg-white mx-3 p-3 shadow-sm rounded-sm h-full w-full flex flex-col">
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                
                                                   
                                                </div>
                                                <div class="h-full min-w-full flex  ">
                                                   
                                                    <div  class="h-md rounded overflow-hidden flex  w-full shadow-lg  ">
                                                        <div  class="min-w-full flex flex-col">
                                                            
                                                            <img class="object-scale-down max-h-80 "
                                                            :src="showing_handout.get_image"
                                                            alt="Sunset in the mountains">
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                 <div class="flex flex-col items-center space-x-2 font-semibold text-gray-900 leading-8 text-3xl">
                                                    
                                                </div>
                                                                    
                                            </div>  
                                            <div class="my-4"></div>
                                            <div class="w-full bg-white p-3 shadow-sm rounded-sm">

                                                <div class="flex min-w-full">
                                                    <div>
                                                   
                                                        
                                                            
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
import Profile from './Profile.vue'
export default {
	name: 'Chat',
	components: {
		NavigationBar,
		ProfileIconResized
	},
	data(){
Profile
		return {
			//connection_status: 'connecting',
			room_key: this.$route.params.name,
			name: this.$route.params.name,
			game_name: "",
			chatSocket: null,
			chat_text: ``,
			input_text: "",
			chat_data: [],
			loading: true,
			connected: false,
			errors: {},
			game: {},
			chat_buffer: {},
			actual_handout: '',
			showing_handout: {},
			chat_height: 0,
			
		}
	},	
	created(){
		this.getGameData();
		this.setupChat();
	
	},
	mounted(){
		this.getChatHeight();
	},
	watch:{
		'$route': 'getGameData',
		'$route': 'setupChat',
		chat_buffer(newdata,olddata){
			if(newdata.message )
			{
				let mess = newdata.message
				this.chat_data.push(newdata);
				
			}
		},
		actual_handout(newdata, olddata){
			if(newdata != null){
				if(this.chatSocket != null && !this.loading )
				{	
					console.log("changed")
					this.updateHandout(newdata);
				}
			}
		},
		
		'$refs.infoBox.chatpanel ' () {
				console.log("test")
				let height = this.$refs.infoBox.clientHeight 
				console.log("height: " + height.toString())
				this.chat_height = height * 4/8;
		}
		
	},
	computed: {
		
	},
	methods: {
		getChatHeight(){
			if(this.$refs.chatpanel === undefined) {
				console.log('0')
				return 0;
			}
			let height = this.$refs.chatpanel.clientHeight 
			console.log("height: " + height.toString())
			this.height =  height * 4/8;
			return this.height;
		
		},
		setupChat(){
			this.loading = true;
			this.chatSocket = new WebSocket('ws://localhost:8000'+'/ws/chat/' + this.name + '/'+`?authorization=${this.$store.state.user.token}`);
			let self = this;
			this.chatSocket.onmessage = function(e){
				const data = JSON.parse(e.data);
				//console.log(data)
					console.log(data.message.thumbnail)
				self.chat_buffer = data.message;
				console.log(data.message.new_handout)
				if (data.message.new_handout){
				self.showing_handout = self.game.game_handouts.filter(function (el) {
					return el.id ==  data.message.new_handout
				})[0];}
				console.log(self.showing_handout)

				//this.getMessage(data) 
				
			}
			this.chatSocket.onclose = function(e){
				console.error('Chat socket closed!');
				self.chat_text += "CONNECTION FAILED";
				
				//self.connected = false;
				self.loading = false;
			}
			this.chatSocket.onopen = function(e){
				//console.log(event)
				self.chat_text += "Connnected! \n"
			//	self.connected = true;
				self.loading = false;
			}

			
		},
		getMessage(data){
			this.chat_data.append(data);
			this.chat_text += data.message;
		},
		sendMessage(){
			this.chatSocket.send(JSON.stringify({'message': this.input_text}))
			this.input_text = '';
		},
		updateHandout(handout){
		
			this.chatSocket.send(JSON.stringify({'message': 'Zmieniono Handout', 'handout': handout.id}))
		},
		getGameData(){
				this.loading = true;
				this.errors = {};
				this.ok = false;
				console.log("starting fetching")
				const requestOptions = {
					method: "GET",
					headers: {
						"Content-Type": "application/json", 
						Authorization: `Token ${this.$store.state.user.token}`,
					},
				}
				fetch(`http://localhost:8000/api/games/room_key/${this.$route.params.name}/`,requestOptions)
				.then((res => {
					if(res.status == 200){
						console.log("fetched data")
						return res.json()
					}else {
						console.log("wrong data fetched")
						throw res
					}
				}
				))
				.then((response => {
						
						this.ok = true;
						console.log("200 OK!")
						this.game = response;
						this.game_name = this.game.name;
						if(this.game.game_handouts.length > 0) {
							this.actual_handout = this.game.game_handouts[0];
							this.showing_handout = this.game.game_handouts[0];
						}
						console.log("data stored")
					
						
				}))
				.catch(err => {
				
					 try{
                    this.errors = err.json().toString()
                }
                catch(e){
                    this.errors = err;
                }
					console.log(this.errors)
					
				})
				
		}
	},
	
	
}


</script>
