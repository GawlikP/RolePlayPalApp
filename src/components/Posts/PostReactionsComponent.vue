<template>
    <div id="PostReactionsComponent">
        <div v-if="my_reaction.id">
            <p class="text-center font-bold text-xl" > {{reactionsNumber}} </p>
          <p class="text-center font-bold text-xl"  >
            <button v-on:click="updateReaction(false)" v-bind:class="{'text-red-700 bg-red-400': !my_reaction.state,  'hover:text-red-100': my_reaction.state}"  class="rounded  border border-1 border-red-400 text-2xl px-4 hover:text-red-100 hover:bg-red-700">-</button>
            <button  v-on:click="updateReaction(true)" v-bind:class="{'text-green-700 bg-green-400': my_reaction.state,  'hover:text-green-100': !my_reaction.state}"   class="rounded border border-1 border-green-400 text-2xl   px-4 hover:text-green-100 hover:bg-green-700">+</button> 
            </p>
        </div>
        <div v-else>
            <p class="text-center font-bold text-xl" > {{reactionsNumber}} </p>
            <p class="text-center font-bold text-xl"  > <button v-on:click="addReaction(false)" class=" rounded px-4 text-2xl border border-1 border-red-400  hover:text-red-100 hover:bg-red-700">-</button><button v-on:click="addReaction(true)" class="rounded text-2xl  px-4 border border-1 border-green-400 hover:text-green-100 hover:bg-green-700">+</button>  </p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'PostReactionsComponent',
  props: {
      absolute_url: String,
      pluses: Number,
      minuses: Number
  },
  data() {
      return {
        reacted: -1,
        reactions: [],
        error: "",
        data: [],
        my_reaction: {},
        my_newest_reaction : null,
        
      }
  },
  mounted(){
      this.getMyReaction()
  },
  watch:{
      '$route':'getMyReaction()' 
  },
  computed: {
    // a computed getter
    reactionsNumber() {
      // `this` points to the vm instance
      if(this.my_newest_reaction !== null){
          if(this.my_newest_reaction== true) {return this.pluses - this.minuses +1;}
          else return ((this.pluses - this.minuses -1 > 0)? this.pluses - this.minuses -1: 0);
      }else 
      return this.pluses - this.minuses ;
    }
  },
  methods: {
      getMyReaction(){
          const requestOptions = {
              method: "GET",
              headers: {"Content-Type":"application/json",
                        "Authorization": `Token ${this.$store.state.user.token}`}
          }
          fetch(`http://localhost:8000/api/posts${this.absolute_url}reactions/me/`, requestOptions)
          .then((res=>{
              if(res.status == 200) return res.json()
              else throw res
          }))
          .then((response =>{
     
              this.my_reaction = response;
              
              
          }))
          .catch(err=> {
              this.error = err
          })
      },
      addReaction(type){
          const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Token ${this.$store.state.user.token}`, 
                    },
                body: JSON.stringify({state: type})
              }
              fetch(`http://localhost:8000/api/posts${this.absolute_url}reactions/`, requestOptions)
              .then((res => {
                  if(res.status == 201) return res.json();
                  else throw res
              }))
              .then((res =>{
                 
                    this.my_reaction = res;
                   this.my_newest_reaction =type;
              }))
              .catch(err =>{
                  this.error = err
              })
          },
          updateReaction(type){
          const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Token ${this.$store.state.user.token}`, 
                    },
                body: JSON.stringify({state: type})
              }
              fetch(`http://localhost:8000/api/posts${this.absolute_url}reactions/`, requestOptions)
              .then((res => {
                  if(res.status == 201) return res.json();
                  else throw res
              }))
              .then((res =>{
                 
                    this.my_reaction = res;
                    this.my_newest_reaction =type;
                   
              }))
              .catch(err =>{
                  this.error = err
              })
          
      }
      },
      
      
}
</script>