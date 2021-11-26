<template>
    <div id="PostCommentsComponent">
        
             <div v-on:click="changeFormDown()" >
                <p  class=" font-bold lg:text-xl md:text-xl sm:text-md text-center   placeholder-gray-600 text-purple-700"> <i v-if="!isFormDown" class="fas fa-chevron-circle-down" ></i> <i v-if="isFormDown" class="fas fa-chevron-circle-up" ></i>  Pokaż komentarze </p>
            </div> 
                    <div v-bind:class="{'hidden': !isFormDown, 'flex': isFormDown}"  class="grid grid-cols-1   min-w-full " > 
                        <CommentFormComponent  v-bind:post_absolute_url="post_absolute_url" />
                         <div v-for="comment in comments" v-bind:key="comment.id" >
                            <CommentViewComponent v-bind:post_absolute_url="post_absolute_url" v-bind:user="comment.user" v-bind:user_username="comment.user_username" v-bind:content="comment.content" v-bind:created="comment.created" />
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
            comments: []
        }
    },
    created() {
        this.getComments();
    },
    watch:{
        '$route':'getComments' 
    },
    methods: {
         changeFormDown(){
          this.isFormDown = !this.isFormDown;
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
              console.log(this.comments);
              
          }))
          .catch(err=> {
              console.log(err)
          })
        }
    }
}
</script>

