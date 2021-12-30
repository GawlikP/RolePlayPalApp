<template>
	<div class="w-screen h-screen" id="Chat">
		<NavigationBar />
		<div class="w-full h-full bg-gray-100">
			<div v-if="loading">
					<p> Loading... </p>
			</div>
			<div v-else class="h-full grid grid-cols-4">
				<div class="max-h-full w-full col flex flex-col py-5 mx-3 bg-white">

					<div class=" w-full  bg-grey-lighter px-3 py-2 border-bottom  border-purple-300 ">
						<h3 class="w-full text-center text-xl text-black font-bold"> {{game_name}}</h3>
					</div>
					<ProfileIcon v-bind:user_id="this.response.game_master.id" />
						<div class=" grow overflow-y-scroll flex flex-col items-center mx-2 my-2 h-80 rounded shadow-xl" >						
							<p v-for="(index, value) in chat_data " :key="value" class="inline-block shadow  border py-1  lg:text-xl md:text-md sm:text-sm break-all  min-w-full" >
							<ProfileIcon v-bind:user_id="index.user_id" class=" sm:w-16 sm:w-16" /><b>{{index.username}}</b>:<span class="">{{index.message}}</span> 
							</p> 
						</div>
						<div class="  w-full  grid grid-cols-7 ">
							<input v-model="input_text" type="text" class="col-span-6 min-w-full appearance-none text-left rounded   border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 md:text-2xl sm:text-xl" id="inputs_area"/>
							<input type="submit" v-on:click="sendMessage()" value=">" class="col-span-1   w-full bg-purple-600 hover:bg-purple-800 text-gray-100 rounded"/>
						</div>
				</div>	
            
            
				<div class=" h-full w-full col col-span-3 bg-white fluid flex-col"> 
					<p class="min-w-full text-2xl"> {{actual_handout.name}} 
					</p>
					<img v-if="actual_handout" :src="actual_handout.get_image" alt="Game handout"
											class="object-contain max-w-full max-h-full" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar.vue'
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
import Profile from './Profile.vue'
export default {
	name: 'Chat',
	components: {
		NavigationBar,
		ProfileIcon
	},
	data(){
Profile
		return {
			//connection_status: 'connecting',
			room_key: this.$route.params.name,
			name: this.$route.params.name,
			game_name: "",
			chatSocket: {},
			chat_text: ``,
			input_text: "",
			chat_data: [],
			loading: true,
			connected: false,
			errors: {},
			response: {},
			chat_buffer: {},
			actual_handout: '',
		}
	},	
	mounted(){
		this.getGameData();
		this.setupChat();
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
		
	},
	
	methods: {
		setupChat(){
			this.loading = true;
			this.chatSocket = new WebSocket('ws://localhost:8000'+'/ws/chat/' + this.name + '/'+`?authorization=${this.$store.state.user.token}`);
			let self = this;
			this.chatSocket.onmessage = function(e){
				const data = JSON.parse(e.data);
				//console.log(data)
			
				self.chat_buffer = data.message;
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
						this.response = response;
						this.game_name = this.response.name;
						if(this.response.game_handouts.length > 0) this.actual_handout = this.response.game_handouts[0];
						this.loading = false;
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
					this.loading = false;
				})
				
		}
	},
	
	
}


</script>
