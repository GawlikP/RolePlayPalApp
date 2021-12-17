<template>
    <div id="PostViewComponent" >
        <div class="container fluid px-3 min-w-full min-h-10 px-2 py-2 shadow-xl   rounded-xl ">
        
            <p></p> 
            <p class="font-bold break-all min-w-full text-purple-900" > <ProfileIcon v-bind:user_id="author" />  {{author_username}} </p>
            
            <span v-if="$store.state.user.id == author" v-on:click="edit=!edit"
            class=" fluid px-3 font-bold border border-1 bg-purple-800 text-white rounded-xl"> 
            Edytuj </span>
             <span v-if="$store.state.user.id == author" v-on:click="deletePost()"
            class=" fluid px-3 font-bold border border-1 bg-red-800 text-white rounded-xl"> 
            Usuń </span>
           
            <p class="break-all text-center font-bold text-xl text-gray-100 min-w-full bg-black rounded-xl ">
              <input v-if="edit" type="text" v-model="post.title" class="appearance-none text-center font-bold text-xl text-gray-100 min-w-full bg-black rounded-xl" /> <span v-else> T: {{title}} </span> 
            </p>
             <div id="error message" v-if="error">
                <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                  <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">          
                    <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 ">
                      <div v-for="(value, name) in error" :key="name">
                        <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            <p class="break-all mx-1 py-2"><textarea v-if="edit" v-model="post.content" class="min-w-full" >  </textarea> <span v-else>  {{content}}  </span></p>
              <button v-if="edit" type="submit" v-on:click="updatePost()" class="my-2 mx-2  sm:py-2  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-2xl sm:text-xl font-bold shadow-md">  
                <span  class="" > Edytuj </span> 
              </button>
              <div id="done" v-if="ok">
                <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                  <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                               
                    <p class="text-bold lg:text-xl md:text-xl sm:text-lg text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Zaktualizowano</p>
                  </div>
                </div>
              </div>
              <div id="done" v-if="deleted">
                <div class="my-4 mx-2 bg-red-700 rounded-xl lg:my-4 sm:my-6">
                  <div class="rounded-md bg-red-700 shadow-md  -space-y-px ">
                               
                    <p class="text-bold lg:text-xl md:text-xl sm:text-lg text-left font-bold text-center text-white "><i class="fas fa-check-circle"></i> Usunięto twój post</p>
                  </div>
                </div>
              </div>

              <PostReactionsComponent v-bind:pluses="pluses" v-bind:minuses="minuses" v-bind:absolute_url="absolute_url" />
                <PostCommentsComponent v-bind:post_absolute_url="absolute_url" />           
        </div>
    </div>
</template>

<script>
import PostReactionsComponent from '@/components/Posts/PostReactionsComponent.vue'
//import CommentViewComponent from '@/components/Posts/Comments/CommentViewComponent.vue'
import PostCommentsComponent from '@/components/Posts/Comments/PostCommentsComponent.vue'
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
export default {
  name: 'PostViewComponent',
  props: {
    id: Number,
    title: String,
    content: String,
    minuses: Number,
    pluses: Number,
    author: Number,
    author_username: String,
    absolute_url: String,
  },
  data(){
    return {
        user_id: 0,
        edit: false,
        post: {
          content: this.content,
          title: this.title
        },
        error: {},
        ok: false,
        deleted: false,
    }
  },
  methods:{
    updatePost(){
         this.error = {}
           this.ok = false
        if(this.post.title.length < 1) this.error['title'] = 'Proszę wypełnić to pole!';
        if(this.post.content.length < 1) this.error['content'] = 'Proszę wypełnić to pole!';
        if (Object.getOwnPropertyNames(this.error).length >0) return
          const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                body: JSON.stringify({title: this.post.title, content: this.post.content})
            }
            fetch(`http://localhost:8000/api/posts${this.absolute_url}`,requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    
                    this.ok = true;
                    this.post = response;
                    this.title = post.title;
                    this.content = post.content;
                    this.edit = false;
                    
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
    },
    deletePost(){
        this.error = {}
        this.ok = false
        if (Object.getOwnPropertyNames(this.error).length >0) return
          const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                body: JSON.stringify({deleted: true})
            }
            fetch(`http://localhost:8000/api/posts${this.absolute_url}`,requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    
                    this.deleted = true;
                    this.post = response;
                    this.title = post.title;
                    this.content = post.content;
                    this.edit = false;
                    
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
    }
  },
  components:{
    PostReactionsComponent,
    PostCommentsComponent,
    ProfileIcon
  }
}
</script>