<template>
    <div id="GameHandoutFormModal"  class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
    <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center items-center">
        
        <div class="relative bg-white rounded-lg shadow bg-purple-200  dark:bg-gray-700 justify-center items-center">
         <i  class="absolute text-purple-700 text-2xl fas fa-times-circle z-10" v-on:click=" $emit('hide');"></i>
            <form @submit.prevent class="flex flex-col my-4 mx-4 text-purple-800">
                    <div>  </div>
                    <div class="bg-5 rounded-2xl text-center items-center justify-center">
                        <p class="mt-2 text-center text-3xl font-bold text-gray">
                            Dodaj Handout
                        </p>
                    </div>
                    <div>
                        <div class="my-4 mx-2  rounded-xl bg-purple-900 items-center justify-center">
                        <div class="rounded-md shadow-md -space-y-px">    
                            <input type="text" name="name" autocomplete="name" v-model="name" class="appearance-none text-center rounded relative block w-full px-2 py-2 border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 lg:text-3xl md:text-2xl sm:text-xl" placeholder="Nazwa" /> 
                        </div>
                        </div>
                    </div>
                     <label class="text-sm font-medium text-gray-900 block " for="user_avatar">Upload file</label>
                                                
                        <div class="py-2  bg-white px-2">
                            <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                <div class="md:flex">
                                    <div class="w-full p-3">
                                        <div class="relative border-dotted h-64 rounded-lg border-dashed border-2 border-purple-700 bg-gray-100 flex justify-center items-center">
                                            <div class="absolute">
                                                <div  class="flex flex-col items-center">
                                                     <i v-if="image == null" class="fa fa-folder-open fa-4x text-purple-700"></i>
                                                     <img v-else class="h-48  object-contain  bg-white " :src="image_url"/>
                                                      <span class="block text-gray-400 font-normal">Attach you files here</span> 
                                                </div>
                                               
                                            </div> <input @change="handleFileUpload( $event )" type="file" class="h-full w-full opacity-0" name="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <div id="error message" v-if="error">
                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4  sm:my-6">
                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                               
                                <span class="text-bold text-3xl text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                    </div>
                                 
                                 </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-center min-w-full lg:my-1 sm:my-8">
                        <button type="submit" v-on:click="$emit('add', image, name);" class="my-4 mx-4  sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-3xl sm:text-2xl font-bold shadow-md">  
                            <span type="text" name="email" class="" placeholder="Email" > Dodaj </span> 
                        </button>
                    </div>
                    
                        </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'GameHandoutFormModal',
    data(){
        return {
            image: null,
            image_url: null,
            avatar_error: '',
            name: "",
        }
    },
    emits: ["hide", "add"],
    methods:{
        handleFileUpload(event){
                    
                this.image = event.target.files[0]
                
                this.image_url = URL.createObjectURL(this.image);
            },
    }
}
</script>