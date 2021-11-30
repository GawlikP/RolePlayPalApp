<template>
    <div class="flex space-x-2" id="ProfileIcon" v-on:click="$router.push(`/profile/${profile.slug}`)" >

        <div class="relative w-12 h-12 inline-block">
            <i v-if="!ok" class="text-4xl text-center font-bold  min-w-full fas fa-user"></i><img  v-if="ok" class="w-12 h-12 mx-auto rounded-full" :src="profile.get_thumbnail" alt="user image" />   
        </div>
    </div>
</template>
<script>


export default({
    name: 'ProfileIcon',
      props: {
        user_id: Number
    },
    data() {
        return {
            profile: {
                id: -1,
                get_image: 'nope',
                get_thumbnail: 'nope',
                note: 'none',
                role: false,
                slug: 'none'
                },
                ok:false
        }
    },
    created(){
        this.fetchData()
    },
    watch:{
        '$route': 'fetchData'
    },
    methods :{
        fetchData() {
            const requestOptions = {
                method: "GET",
                headers: {'Authorization':  `Token ${this.$store.state.user.token}`},

            }
            fetch(`http://localhost:8000/api/profiles/user/${this.user_id}/`, requestOptions)
            .then((res => {
                if(res.status == 200) return res.json()
                throw res
            }))
            .then((res =>{
                this.ok = true;
                this.profile = res;
           
            }))
            .catch(err =>{
                try{
                    this.fetch_error = err.json().toString()
                }
                catch(e){
                    this.fetch_error = err;
                }
            })
        },
        
    }
})
</script>
