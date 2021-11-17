<template>
    <div id="PostPaginationComponent">
        <div v-if="loading == true">
            <div  class="grid grid-cols-5 gap-2 py-1 min-w-full my-1">
                    <div></div>
                        <div class="flex min-w-full my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5  centered items-center justify-center "> 
                            <div class="lg:my-1 sm:my-8" v-for="index in end_page" :key="index">    
                                    <a  :href="'/forum/' +index" class="w-full px-5 py-2 rounded-xl bg-white border border-purple-800 boreder-1  bg-purple-800  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">  
                                        {{index + start_page-1 }} 
                                    </a>
                            </div>
                        </div>
                    <div> 
                </div>
            </div>
        </div>
        <div v-if="loading == false" >
             <div  class="grid grid-cols-5 gap-2 py-1 min-w-full my-1">
                 <div></div>
                    <div class="flex min-w-full my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5  centered items-center justify-center ">
                        <p class="w-full px-5 py-2 rounded-xl bg-white border border-purple-800 boreder-1  bg-purple-800  text-gray-200 hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-md">
                            LOADING
                        </p>
                    </div>
                 <div></div>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    name: 'PostPaginationComponent',
    props: {
      page_numbers: Number,
      act_page: String
    
  },
  mounted(){
        console.log(this.loading)
        if(parseInt(this.page_numbers) < this.max_page){
            this.start_page = 1;
            this.end_page = this.page_numbers;
        }
        if(parseInt(this.page_numbers) > this.max_page){
            this.start_page = parseInt(this.page_numbers) - this.max_page
            this.end_page =this.start_page + this.max_page
        }
        this.loading = true;
        console.log(this.loading)
  },
   data(){
        return {
            start_page: 1,
            end_page: -1,
            max_page: 5,
            loading:false
        }
    },
  })  
</script>