<template>

    <div id="CommentViewComponent" class="fluid min-w-full min-h-10 px-4 py-3 shadow-md  rounded-xl">
        <p class="font-bold flex "> <ProfileIcon v-bind:user_id="user" />   {{user_username}} </p>
        <p>  <button v-if="$store.state.user.id == user" v-on:click="edit=!edit"
            class="appearance-none bg-auto fluid my-1  px-3 font-bold text-sm text-purple-800  rounded-xl"> Edytuj </button>
             <button v-if="$store.state.user.id == user" v-on:click="deletePost()"
            class="appearance-none bg-auto fluid my-1  px-3 font-bold text-sm text-red-800 rounded-xl"> Usuń </button> </p>
        <p class=" text-gray-700 text-xs my-2 font-bold"> Date: {{created}} </p>
        <p class="text-sm font-bold mx-2"> {{content}} </p>
    </div>

</template>

<script>
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
export default{
    name: 'CommentViewComponent',
    props: {
        post_absolute_url: String,
        user: Number,
        user_username: String,
        content: String,
        created: String,
    },
    data(){
        return {
            response: {},
            errors: {},
            ok: {},
        }
    },
    mounted() {

    },
    methods: {
      
    },
    components:{
      
        ProfileIcon
    }
}
</script>

