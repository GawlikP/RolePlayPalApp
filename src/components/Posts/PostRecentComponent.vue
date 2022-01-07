<template>
<div id="PostRecent" >
    <div v-if="loading">
          <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
                    <div></div>
                    <div class="fluid min-w-full justify-center centered  my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5"> 
                        <p class="text-white text-center text-3xl font-bold bg-purple-700 rounded shadow-md"> LOADING </p>
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
        
            <div id="rows" class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1 ">
                <div class="my-1 w-full col col-span-5 xl:col-span-1 lg:col-span-1 flex flex-col "> 
                    <p v-on:click="slide_fileters()" class="text-center text-xl font-bold text-white rounded bg-black"> 
                        Filtry
                    </p>
                    <ul v-bind:key="show_menu" v-bind:class="{'hidden': !show_menu, 'flex flex-col': show_menu}"
                    class="lg:flex lg:flex-col  w-full bg-gray-100 text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-xl shadow-xl">
                        <li class="flex flex-col items-center py-3">
                            <p class="w-full bg-black text-white text-center rounded-xl font-bold "> Tytuł  </p>
                            <input type="text" name="title" placeholder="tytuł" v-model="filter.title" class="w-full my-1 text-center rounded border-1 border-black bg-white text-black " />
                        </li>
                        <li class="flex flex-col items-center py-3">
                            
                            <p class="w-full bg-black text-white text-center rounded-xl font-bold "> Kategoria </p>
                            <select v-model="filter.category" class="block appearance-none text-md md:text-md sm:text-sm  w-full bg-white border border-purple-400 hover:border-purple-800 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option selected :value="{slug:''}">BRAK</option>
                                    <option v-for="category in categories" v-bind:value="category" v-bind:key="category.id">
                                        {{ category.name }}
                                    </option>
                            </select>
                            
                      
                        </li>
                        <li class="flex flex-col items-center py-3"> 
                            <button type="submit" v-on:click="this.page_number=1;getPosts()" class="  sm:py-2  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-md sm:text-sm font-bold shadow-md">  
                                <span > Filtruj </span> 
                            </button>
                        </li>
                                                   
                    </ul>
                </div> 
                    <div  class="min-w-full col-span-5  my-1 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5">
                    <div v-for="(post, index) in fetched_data.posts" v-bind:key="index"  class="flex flex-col">
                        <PostViewComponent v-bind:id="post.id" v-bind:title="post.title" v-bind:content="post.content" v-bind:pluses="post.pluses" v-bind:minuses="post.minuses" v-bind:author="post.author" v-bind:author_username="post.author_username" v-bind:absolute_url="post.get_absolute_url"/>
                    </div>
                    </div>
                <div class="my-1" ></div>
            </div>
        </div>
    <div  v-if="ok"  >
            <PostPaginationComponent @updatePage="changePage" v-bind:page_numbers="fetched_data.page_numbers" v-bind:act_page="page_number"/>
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
      //page_number: String,
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
            categories: [],
            filter: {
                title: "",
                category: {slug: ''},
            },
            show_menu: false,
            page_number: 1,
       
        }
    },
    created(){
        this.getPosts()
        this.getCategories()
    },
    watch:{
        '$route': 'getPosts',
        '$route': 'getCategories'
        //fetched_data: 'getPosts',
    },
    methods :{
        slide_fileters(){
            this.show_menu = !this.show_menu;
        },
        changePage(page){
            this.page_number = page; 
            this.getPosts();
            console.log('page: ' + page.toString())
        },
            getCategories(){
          const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
            }
            fetch(`http://localhost:8000/api/posts/categories/`,requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                   
                    this.categories = response;
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
      },
            getPosts: function(){
                this.error = "";
                this.ok = false;
                this.loading = true;
           
                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
        
            fetch(`http://localhost:8000/api/posts/?page_number=${this.page_number}&page_size=${this.page_size}&title=${this.filter.title}&category=${this.filter.category.slug}`,requestOptions)
            .then((res => {
                if(res.status == 200){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    console.log(response);
                    this.ok = true;
                    this.fetched_data = response;

                    this.loading = false;
             
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