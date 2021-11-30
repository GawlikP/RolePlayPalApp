<template>
    <div id="PostViewComponent" >
        <div class="container fluid px-3 min-w-full min-h-10 px-2 py-2 shadow-xl   rounded-xl ">
        
            <p></p> 
            <p class="font-bold break-all min-w-full text-purple-900" > <ProfileIcon v-bind:user_id="author" />  {{author_username}} </p>
            <p class="break-all text-center font-bold text-xl text-gray-100 min-w-full bg-black rounded-xl "> T: {{title}}  </p>
            <p class="break-all mx-1 py-2"> {{content}}  </p>
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
  components:{
    PostReactionsComponent,
    PostCommentsComponent,
    ProfileIcon
  }
}
</script>