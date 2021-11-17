<template>
    <div id="forum">
         <NavigationBar/>

      <div class="container  min-w-full my-1 py-1 centered justify-center grid grid-cols-1">
        <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
          <div></div>
          <div class="fluid min-w-full justify-center centered  my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5"> 
            <PostFormComponent />
          </div>
          <div> </div>
        </div>
        
        <PostRecentComponent v-bind:page_number="page"/>
       
      </div>
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
        }
    },
  components: {
    PostFormComponent,
    PostRecentComponent,
    NavigationBar,

    
  }
}
</script>