<template>
    <div id="PostCommentsComponent">
        
             <div v-on:click="changeFormDown()" >
                <p  class=" font-bold lg:text-xl md:text-xl sm:text-md text-center   placeholder-gray-600 text-purple-900"> <i v-if="!isFormDown" class="fas fa-chevron-circle-down" ></i> <i v-if="isFormDown" class="fas fa-chevron-circle-up" ></i>  Pokaż komentarze </p>
            </div> 
                    <div v-bind:class="{'hidden': !isFormDown, 'flex': isFormDown}"  class="grid grid-cols-1   min-w-full " > 
                        <CommentFormComponent  v-bind:post_absolute_url="post_absolute_url" @updateComments="getComments" />
                        <div v-if="!update" class="my-3 ">
                            <div v-for="comment in comments" v-bind:key="comment.id" >
                                <CommentViewComponent @deleted="deleteComment" @edited="editComment" v-bind:post_absolute_url="post_absolute_url" v-bind:id="comment.id" v-bind:user="comment.user" v-bind:user_username="comment.user_username" v-bind:content="comment.content" v-bind:created="comment.created" />
                            </div>
                        </div>
                    </div>
        </div>
</template>

<script>
import CommentViewComponent from '@/components/Posts/Comments/CommentViewComponent.vue';
import CommentFormComponent from '@/components/Posts/Comments/CommentFormComponent.vue';
export default{
    name: 'PostCommentsComponent',
    props: {
        post_absolute_url: String
    },
    components:{
        CommentViewComponent,
        CommentFormComponent
    },
    data(){
        return {
            isFormDown: false,
            update:false,
            id_to_pop: 0,
            content: "",
            id_to_update: 0,
            comments: []
        }
    },
    created() {
        
    },
    watch:{
        '$route':'getComments',
        update(newval,oldval){
            if(newval == true)
            {
                let id = this.id_to_pop;
                if(id != 0){
                    this.comments = this.comments.filter(function( obj ){
                        return obj.id !== id
                    })
                    this.id_to_pop = 0;
                    this.update = false;
                }
                id = this.id_to_update;
                let content = this.content;
                if(id !=0){
                    this.comments = this.comments.filter(function (obj){
                        if (obj.id == id) obj.content = content;
                        return obj;
                    })
                    this.id_to_update = 0;
                    this.update = false;
                }
            }
        }
    },
    methods: {
         changeFormDown(){
          this.isFormDown = !this.isFormDown;
          this.getComments();
      },
        getComments(){
              const requestOptions = {
              method: "GET",
              headers: {"Content-Type":"application/json",
                        "Authorization": `Token ${this.$store.state.user.token}`}
          }
          fetch(`http://localhost:8000/api/posts${this.post_absolute_url}comments/`, requestOptions)
          .then((res=>{
              if(res.status == 200) return res.json()
              else throw res
          }))
          .then((response =>{
     
              this.comments = response;
              
              
          }))
          .catch(err=> {
              console.log(err)
          })
        },
        deleteComment(comment_id){
            
            const requestOptions = {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Token ${this.$store.state.user.token}`
                },
                body: JSON.stringify({deleted: true})
            }
            fetch(`http://localhost:8000/api/posts/comments/${comment_id}/`, requestOptions)
            .then((res=>{
                if(res.status == 201) return res.json()
                else throw res
            }))
            .then((response =>{
        
                //this.comments = response;
                this.response = response;
                
                console.log(response)
                this.id_to_pop = comment_id;
                this.update = true;
                
            }))
            .catch(err=> {
                console.log(err)
            })
        },
        editComment(comment_id,content){
            const requestOptions = {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Token ${this.$store.state.user.token}`
                },
                body: JSON.stringify({content: content})
            }
            fetch(`http://localhost:8000/api/posts/comments/${comment_id}/`, requestOptions)
            .then((res=>{
                if(res.status == 201) return res.json()
                else throw res
            }))
            .then((response =>{
        
                //this.comments = response;
                this.response = response;
                
                console.log(response)
                this.id_to_update = comment_id;
                this.content = content;
                this.update = true;
                
            }))
            .catch(err=> {
                console.log(err)
            })
        }

    }
}
</script>

