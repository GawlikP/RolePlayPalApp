<template>
    <div class="flex space-x-2" id="ProfileIcon" v-on:click="$router.push(`/profile/${profile.slug}`)" >
        <div v-if="!ok">
            <i class="fas fa-user"></i> 
        </div>
        <div v-if="ok" class="relative w-12 h-12">
                <img class="rounded-full border border-gray-100 shadow-sm" :src="profile.get_thumbnail" alt="user image" />
                    <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
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
                console.log(this.profile);
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
