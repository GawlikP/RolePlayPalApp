<template>
<div id="forum">
         <NavigationBar/>
    <main >

      <div  class="container  min-w-full centered justify-center grid grid-cols-1">
        <div v-if="!profile" class="fluid min-w-full centered justify-center grind grid-cols-5" >
          <div></div>
            <div class="md:col-span-3 lg:col-span-3 sm:col-span-5 min-w-full">
              <p class="text-red font-bold text-xl my-2 mx-2 background-red-300"> Setup Your Account! </p>
            </div>
          <div></div>
        </div>
        <PostRecentComponent v-bind:page_number="page"/>
       
      </div>
    </main>
</div>

</template>

<script>
// @ is an alias to /src
import PostFormComponent from '../components/Posts/PostFormComponent.vue'
import PostRecentComponent from '../components/Posts/PostRecentComponent.vue'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'Forum',
   
  data(){
        return {
            page: this.$route.params.page,
            ok: false, 
            loading: false,
            profile: {},
            fetch_error: {},
        }
  },
  mounted(){

  },
  watch:{

  },
  methods: {
      fetchProfile(){
        this.loading = true;
        const requestOptions = {
          method: "GET",
          headers: {"Content-Type": "application/json",
          "Authorization": `Token ${this.$store.user.token}`}
        }
        fetch(`http://localhost:8000/api/profiles/me/`, requestOptions)
        .then((res) => {
          if(res.status == 200){
            return res.json();
          }else {
            throw res;
          }
        })
        .then((response) => {
          this.profile_fetched = true;
          this.profile = response;
        })
        .catch((err) => {
          try{
            this.fetch_error = err.json().toString();
          } catch(e){
            this.fetch_error = err;
          }
        })
      }
  },
  components: {
    PostFormComponent,
    PostRecentComponent,
    NavigationBar,

    
  }
}
</script>