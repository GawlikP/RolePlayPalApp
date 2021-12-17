<template>

    <div id="CommentViewComponent" class="fluid min-w-full min-h-10 px-4 py-3 shadow-md  rounded-xl">
        <p class="font-bold flex "> <ProfileIcon v-bind:user_id="user" />   {{user_username}} </p>
        <p>  <button v-if="$store.state.user.id == user" v-on:click="edit=!edit"
            class="appearance-none bg-auto fluid my-1  px-3 font-bold text-sm text-purple-800  rounded-xl"> Edytuj </button>
             <button v-if="$store.state.user.id == user" v-on:click="$emit('deleted', id)"
            class="appearance-none bg-auto fluid my-1  px-3 font-bold text-sm text-red-800 rounded-xl"> Usuń </button> </p>
        <p class=" text-gray-700 text-xs my-2 font-bold"> Dodano: {{timestamp}} </p>
        <p  v-if="!edit" class="text-sm font-bold mx-2"> {{content}} </p>
        <textarea v-if="edit" class="resize-none text-sm font-bold mx-2 w-full " v-model="comment_content"></textarea>
        <button v-if="edit" type="submit" v-on:click="$emit('edited', id,comment_content); edit = false" class="my-2 mx-2  sm:py-2  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-2xl sm:text-xl font-bold shadow-md">  
                <span  class="" > Edytuj </span> 
        </button>
    </div>

</template>

<script>
import ProfileIcon from '@/components/Profiles/ProfileIconComponent.vue'
import moment from 'moment'
export default{
    name: 'CommentViewComponent',
    props: {
        post_absolute_url: String,
        user: Number,
        user_username: String,
        content: String,
        created: String,
        id: Number,
    },
    emits:['deleted', 'edited'],

    data(){
        return {
            response: {},
            errors: {},
            ok: {},
            moment: {},
            edit: false,
            comment_content: this.content,
        }
    },
    mounted() {
        this.moment = require('moment');
    },
    methods: {
     
    },
    computed:{
        timestamp: function(){
            return moment(this.created).format('YYYY-MM-DD [at] hh:mm')
        }
    },
    components:{
       
        ProfileIcon
    }
}
</script>

