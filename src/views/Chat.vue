<template>
	<div id="Chat">
		<NavigationBar />
	<main>
	<div class="container mx-4 py-3">
		<p class="text-bold font-2xl text-red-800 mx-2"> Chat </p>
		<p class="font-xl text-blue-700 mx-4"> Name: {{name}} </p>
		<textarea class=" form-textarea mt-1 block w-full rounded rounded-xl border border-red-700"
		row="10"
		>{{chat_text}}
		</textarea>
			
		<input v-model="input_text" type="text" class="w-full mt-2 mb-6 py-3 border rounded-lg text-lg" id="inputs_area" />
		<button v-on:click="sendMessage()" value="Submit" class="mb-1 mx-2 w-full bg-purple-600 hover:bg-purple-800 text-gray-100 rounded">SEND</button>
		 
	</div>
	</main>
	</div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {
	name: 'Chat',
	components: {
		NavigationBar,
	},
	data(){
		return {
			connnection_status: 'connecting',
			name: this.$route.params.name,
			chatSocket: null,
			chat_text: "",
			input_text: "",
		}
	},	
	methods: {
		getMessage(data){
			this.chat_text += data.message;
		},
		sendMessage(){
			this.chatSocket.send(JSON.stringify({'message': this.input_text}))
			this.input_text = '';
		}
	},
	mounted: function() {
		this.chatSocket = new WebSocket('ws://localhost:8000'+'/ws/chat/' + this.name + '/'+`?authorization=${this.$store.state.user.token}`);
		let self = this;
		this.chatSocket.onmessage = function(e){
			const data = JSON.parse(e.data);
			//console.log(data.message)
			self.chat_text += (data.message + '\n'); 
			//this.getMessage(data) 
			
		}
		this.chatSocket.onclose = function(e){
			console.error('Chat socket closed!');
			this.chat_text += "CONNECTION FAILED";
			console.log(this.chatScoket)
		}
		this.chatSocket.onopen = function(e){
			//console.log(event)
			this.chat_text += "Connnected! \n"
		}
	},
	
}


</script>
