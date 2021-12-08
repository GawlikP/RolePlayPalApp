<template>
    <div id="GamesPaginationComponent">
        <div v-if="!loading">
            <div  class="grid grid-cols-5 gap-2 py-1 min-w-full my-1">
                    <div></div>
                        <div class="flex min-w-full my-1 col-span-5 xl:col-span-3 lg:col-span-3 md:col-span-5 sm:col-span-5  centered items-center justify-center "> 
                            <div class="lg:my-1 sm:my-8" v-for="index in max_page" :key="index">    
                                    <a  :href="'/games/' + (parseInt(index) + start_page-1)" v-bind:class="{'text-gray-100 bg-purple-800': parseInt(index)+start_page -1==parseInt(act_page)}" class="w-full px-5 py-2 rounded-xl    hover:bg-purple-600 lg:text-2xl sm:text-xl font-bold shadow-xl" >  
                                        {{parseInt(index) + parseInt(start_page-1)}} 
                                    </a>
                            </div>
                        </div>
                    <div> 
                </div>
            </div>
        </div>
        <div v-if="loading" >
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
    name: 'GamesPaginationComponent',
    props: {
      page_numbers: Number,
      act_page: String
    
  },
   created() {
        this.setPages();
    },
    watch:{
        '$route':'setPages' 
    },
    methods: {
            setPages(){
                this.loading = true;
                this.page_numbers 
  

                if(this.page_numbers < this.max_page)
                {
                    this.start_page = 1;
                    this.max_page = this.page_numbers;
                }else{
                    // ((a < b) ? 'minor' : 'major');
                    this.start_page = ((parseInt(this.act_page) - this.page_offset < 1)? 1: this.act_page- this.page_offset) 
                    this.max_page = ((parseInt(this.act_page) + this.page_offset > this.page_numbers)? this.page_numbers - this.start_page +1 : this.end_page)
                }
          
                this.loading = false;
            }
    },
   data(){
        return {
            start_page: 1,
            end_page: 7,
            max_page: 7,
            loading:true,
            page_offset: 3,
        }
    },
  })  
</script>