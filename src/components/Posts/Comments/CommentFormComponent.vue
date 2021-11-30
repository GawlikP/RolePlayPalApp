<template>
    <div id="CommentFormComponent"> 
        <div class="fluid mx-3 px-3 min-h-5 shadow-md bg-purple-200    rounded-xl ">
                <form @submit.prevent >
                <div v-on:click="changeFormDown()"  >
                            <p  class="font-bold lg:text-xl md:text-xl sm:text-md text-center    text-gray-800"> <i v-if="!isFormDown" class="fas fa-chevron-circle-down" ></i> <i v-if="isFormDown" class="fas fa-chevron-circle-up" ></i>  Dodaj nowy komentarz </p>
                        </div> 
                    <div v-bind:class="{'hidden': !isFormDown, 'flex': isFormDown}"  class="grid grid-cols-1   min-w-full " >
                        
                   
                        <div>
                            <div class=" mx-2  rounded-xl items-center justify-center">
                            <div class="rounded-md shadow-md -space-y-px my-1 rounded-xl ">    
                                <label for="Content" class=" font-bold lg:text-xl md:text-md sm:text-md text-center  block placeholder-gray-600 text-gray-900"> Tekst </label>
                                <textarea name="content" v-model="comment.content" class="form-textarea mt-1 rounded-xl  block w-full lg:text-xl md:text-md sm:text-md" rows="3" placeholder="Enter some long form content."></textarea>
                            </div>
                            </div>
                        </div>
                       
                        <div id="error message" v-if="error">
                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                               
                                <span class="text-bold lg:text-xl md:text-md sm:text-md text-left font-bold text-red-600 "><div v-for="(value, name) in error" :key="name">
                                    <i class="fas fa-exclamation-circle"></i> {{name}} : {{value}}<br> 
                                    </div>
                                 
                                 </span>
                            </div>
                        </div>
                    </div>
                        <div class="flex iems-center justify-center min-w-full lg:my-1 sm:my-8">
                            <button type="submit" v-on:click="addPost()" class="my-2 mx-2  sm:py-2  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center bg-purple-800  text-gray-200 hover:bg-purple-600 lg:text-xl sm:text-md font-bold shadow-md">  
                                <span type="text"  > Dodaj Komentarz </span> 
                            </button>
                        </div>
                        <div id="done" v-if="ok">
                        <div class="my-4 mx-2 bg-green-200 rounded-xl lg:my-4 sm:my-6">
                            <div class="rounded-md bg-green-200 shadow-md  -space-y-px ">
                               
                                <p class="text-bold lg:text-xl md:text-md sm:text-md text-left font-bold text-center text-green-600 "><i class="fas fa-check-circle"></i> Dodano twój komentarz!</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommentFormComponent',
  props: {
      post_absolute_url: String,

  },
  data ()  {
      return {
        isFormDown: false,
        comment: {
            content: '',
        },
        error: '',
        ok: false,
      }
  },
   mounted(){
        //this.getCategories()
    },
  methods: {
      changeFormDown(){
          this.isFormDown = !this.isFormDown;
      },
      addPost(){
           this.error = {}
           this.ok = false
       
        if(this.comment.content.length < 1) this.error['content'] = 'Proszę wypełnić to pole!';
                
        if (Object.getOwnPropertyNames(this.error).length >0) return
          const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Token ${this.$store.state.user.token}`},
                body: JSON.stringify({content: this.comment.content})
            }
            fetch(`http://localhost:8000/api/posts${this.post_absolute_url}comments/`,requestOptions)
            .then((res => {
                if(res.status == 201){
                    return res.json()
                }else {
                   throw res
                }
            }
            ))
            .then((response => {
                    console.log(response);
                    this.ok = true;
            }))
            .catch(err => {
                
                err.json().then(json => {
                    this.error = json
                });
            })
      }
  }
}
</script>