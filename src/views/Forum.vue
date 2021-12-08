<template>
<div id="forum">
         <NavigationBar/>
    <main >

      <div class="container  min-w-full centered justify-center grid grid-cols-1">
        
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
        }
    },
  components: {
    PostFormComponent,
    PostRecentComponent,
    NavigationBar,

    
  }
}
</script>