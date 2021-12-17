<template>
	<div id="Chat">
		<NavigationBar />
		<main class="w-screen h-screen bg-gray-100">

	
			<div v-if="loading">
					<p> Loading... </p>
			</div>
			<div v-else class="min-w-full min-h-full flex flex-row">
				
				<div class="max-h-full min-w-full items-stretch grid grid-cols-6   bg-white ">
					<div class="max-h-full col col-span-2 bg-grey font-sans  shadow-xl px-3 py-10 border-b border-grey">
							<form  @submit.prevent class="flex flex-col  max-h-full min-w-full  flex- -mx-px  shadow-xl bg-grey-lightest  z-5 " > 
								<div class=" my-px px-px w-full   bg-grey-lighter px-3 py-2 border-bottom  border-purple-300 "><h3 class="w-full text-center text-xl text-black font-bold"> {{game_name}}</h3></div>
								<div class="overscroll-contain overflow-y-scroll  my-px px-px w-full  max-h-80   bg-transparent " >
									<ProfileIcon v-bind:user_id="this.response.game_master.id" />
									<p v-for="(index, value) in chat_data " :key="value" class="inline-block flex shadow  border py-1  lg:text-xl md:text-md sm:text-sm break-all" >
										<ProfileIcon v-bind:user_id="index.user_id" class=" sm:w-16 sm:w-16" /><div class=""><b>{{index.username}}</b>:<span class="">{{index.message}}</span> </div>
									</p> 
									
									
								</div>
								<div class=" my-px px-px w-full  grid grid-cols-7 ">
									<input v-model="input_text" type="text" class="col-span-6 min-w-full appearance-none text-left rounded   border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 md:text-2xl sm:text-xl" id="inputs_area"/>
								<input type="submit" v-on:click="sendMessage()" value=">" class="col-span-1   w-full bg-purple-600 hover:bg-purple-800 text-gray-100 rounded"/>
								</div>
							</form>
					</div>
					<div class="col col-span-4 bg-red-700">
								<p> fadfsd </p>
					</div>
				</div>	
			</div>
	 
		</main>
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
			chat_text: `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et aliquet arcu, eget sodales diam. Fusce dui ipsum, condimentum sed mi ut, consectetur suscipit dolor. Maecenas tincidunt a odio id ullamcorper. Curabitur nec libero tristique, aliquet felis in, fermentum tellus. Duis tincidunt tellus augue, eget molestie nisi tristique eget. Nullam semper non elit eu dapibus. Quisque tristique laoreet diam vitae ullamcorper.

Phasellus pretium risus nunc, quis elementum massa placerat bibendum. Etiam quis nulla ut sem iaculis aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec purus tortor, vestibulum non est et, tincidunt porta velit. Nam luctus hendrerit lectus vitae ultricies. Quisque id enim eget massa interdum placerat. Nulla posuere leo id felis commodo iaculis. Pellentesque pharetra pulvinar molestie. Sed fermentum sapien in ultricies euismod. Vivamus maximus venenatis mattis. Maecenas lacus nisi, gravida a egestas vitae, tristique at augue. Nam at elementum nisl.

Proin pharetra auctor libero sit amet rutrum. Morbi quam tortor, hendrerit at augue at, varius scelerisque sem. Donec et lectus tellus. Mauris et leo tortor. Quisque id mollis erat. Pellentesque laoreet mauris sed ligula fermentum hendrerit. Sed pharetra sem sem, sed ultrices dolor volutpat vel. Suspendisse eu tempor eros, id efficitur dui. Aliquam erat volutpat. Proin eget consectetur turpis. In sed magna ultrices, facilisis justo in, viverra arcu. Cras cursus massa quis turpis bibendum, a porta eros condimentum. Suspendisse nulla lorem, porta sodales lectus quis, commodo pretium tortor. Nam libero velit, molestie vel varius quis, euismod quis magna. Sed nisi leo, laoreet eu mi sollicitudin, condimentum volutpat ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam et ipsum eget ipsum auctor lobortis. Duis elementum, sapien in aliquam rhoncus, urna tortor pretium nulla, in tincidunt risus elit vel risus. Cras vestibulum, dui ut varius bibendum, ligula justo luctus eros, quis sodales mi diam et est. Sed eu arcu elit. Vestibulum augue neque, tristique sed sem mattis, posuere ultrices purus. Sed viverra faucibus ipsum at fermentum. Cras congue consectetur tortor. Nam enim arcu, commodo id mattis a, posuere ac justo. Donec ac libero nec velit rhoncus condimentum. Morbi luctus odio venenatis commodo scelerisque.

Sed quis pellentesque est. Quisque rhoncus blandit diam eleifend venenatis. Donec mauris mauris, egestas sit amet mi eget, sollicitudin molestie arcu. Mauris lacinia rutrum dui, nec venenatis lorem varius quis. Nam vitae dolor ac augue porttitor lacinia vel in libero. Curabitur dictum est neque, eu cursus lorem congue nec. Curabitur nec nunc imperdiet, feugiat augue id, tincidunt enim. `,
			input_text: "",
			chat_data: [],
			loading: true,
			connected: false,
			errors: {},
			response: {},
			chat_buffer: {},
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
