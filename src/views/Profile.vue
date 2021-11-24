<template>
    <div id="Profile" >
            <NavigationBar />
        <div class="container  min-w-full my-1 py-1 centered justify-center grid grid-cols-1">
            <div class="grid grid-cols-5 gap-2 py-1 flex min-w-full my-1">
            <div></div>
                 <div v-if="loading" class="loading my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5">
                    Loading...
                </div>

                <div v-if="error" class="error my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5">
                    {{ error }}
                </div>

                <div v-if="profile" class="font-bold text-xl my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5">
                    <p>{{ profile.user_username }}</p>
                    <p>{{ profile.description }}</p>
                    <p>{{ profile.note }}</p>
                    <p>{{ profile.slug }}</p>
                </div>
            <div> </div>
            </div>
        
        </div>
    </div>
</template>
<script> 
import NavigationBar from '../components/NavigationBar.vue'
    export default {
        name: 'Profile',
        
        components: {
            NavigationBar,
        },

        data(){
            return {
                profile_name: this.$route.params.slug,
                ok: false,
                loading: false,
                error: null,
                profile: null,
            }
        },
        created(){
            // fetching method here
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData(){
                this.error = this.post = null 
                this.loading = true 
                const fetch_slug = this.profile_name

                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                }
            
                    fetch(`http://localhost:8000/api/profiles/${fetch_slug}`,requestOptions)
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
                            this.profile = response;
                            this.loading = false;
                    }))
                    .catch(err => {
                        this.error = err.json().toString()
                    })
            }
        }
        
    }
</script>