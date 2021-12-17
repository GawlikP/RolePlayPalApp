<template>
<div id="PostRecent" >
    <div v-if="loading">
          <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                    <div></div>
                    <div class="fluid min-w-full justify-center centered  my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5"> 
                        <p> LOADING </p>
                    </div>
                    <div> </div>
                </div>
    </div>
    <div v-else>
        <div  v-if="error.length < 1"  >
            
                <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                    <div></div>
                    <div class="fluid min-w-full justify-center centered  my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5"> 
                        <PostFormComponent @updatePosts="addPost" />
                    </div>
                    <div> </div>
                </div>
        
            <div id="rows" v-for="(post, index) in fetched_data.posts" v-bind:key="index" class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                <div div="my-1"></div> 
                    <div class="min-w-full col-span-5  my-1 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5">
                    <PostViewComponent v-bind:id="post.id" v-bind:title="post.title" v-bind:content="post.content" v-bind:pluses="post.pluses" v-bind:minuses="post.minuses" v-bind:author="post.author" v-bind:author_username="post.author_username" v-bind:absolute_url="post.get_absolute_url"/>
                    </div>
                <div class="my-1" ></div>
            </div>
        </div>
    <div  v-if="ok"  >
            <PostPaginationComponent v-bind:page_numbers="fetched_data.page_numbers" v-bind:act_page="page_number"/>
    </div>
        <div v-if="error.length > 0">
            <div class="min-w-full my-1  xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5 ">
                <div class="container fluid mx-3 min-w-full min-h-10 px-2 py-2 items-center justify-center shadow-md text-3xl font-bold  border border-gray-600 rounded-xl ">
                    <p class="text-center">COS POSZLO NIE TAK </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import PostViewComponent from '@/components/Posts/PostViewComponent.vue'
import PostPaginationComponent from '@/components/Posts/PostPaginationComponent.vue'
import PostFormComponent from '@/components/Posts/PostFormComponent.vue'
export default {
  name: 'PostRecentComponent',
   props: {
      page_number: String,
      profile: Object,
  },
  data(){
        return {
            fetched_data: {
    
            },
            ok: false, 
            error: "",
            page_size: 5,
            loading: false,
       
        }
    },
    created(){
        this.getPosts()
        
    },
    watch:{
        '$route': 'getPosts',
        //fetched_data: 'getPosts',
    },
    methods :{
            getPosts: function(){
                this.error = "";
                this.ok = false;
                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
                console.log(requestOptions)
            fetch(`http://localhost:8000/api/posts/?page_number=${this.page_number}&page_size=${this.page_size}`,requestOptions)
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
                    this.ok = true;
                    this.fetched_data = response;
                    this.loading = false;
                    console.log(this.fetched_data);
            }))
            .catch(err => {
                 try{
                    this.error = err.json().toString()
                }
                catch(e){
                    this.error = err;
                }
            })
            },
            addPost: function(post){
                this.fetched_data.posts.push(post);
            }
    },
  components: {
    PostViewComponent, 
    PostPaginationComponent,
    PostFormComponent
  }
}
</script>