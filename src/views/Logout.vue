<template>
    <div id="Logout">
        <NavigationBar />
         <div class="container  min-h-screen min-w-full items-center justify-center" >
           
                <div class="grid grid-cols-3 gap-4 flex min-w-full my-8">
                <div></div>
                <div class="grid grid-cols-1 gap-4 flex min-w-full my-8 md:col-span-3 lg:col-span-1 col-span-3">
                
                    <div>  </div>
                    <div class="bg-5 rounded-2xl text-center items-center justify-center">
                        <p class="mt-2 text-center text-3xl font-bold text-gray">
                            Wyloguj się:
                        </p>
                        <p>
                            <button v-on:click="logOut()" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-3xl sm:text-2xl font-bold shadow-md" > 
                                Wyloguj 
                            </button>    
                        </p>
                        <div id="done" v-if="ok">
                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                               
                                <p class="text-bold text-4xl text-left font-bold text-center text-red-600 "><i class="fas fa-check-circle"></i> Wylogowano! </p>
                            </div>
                        </div>
                    </div>
                    </div>
                          
                    </div>
                
                <div></div>
                    
                </div>
        
        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/NavigationBar.vue'
export default ({
    name: 'Logout',
    data(){
        return {
            data: [],
            ok: false,
        }
    },
    methods: {
        logOut(){
            this.$store.commit({type:'logOutUser'});

        }
    },
    components: {
        NavigationBar
    },
})
</script>
