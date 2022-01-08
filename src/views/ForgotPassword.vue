<template>
    <div id="ForgotPassword">
        <div class="container  min-h-screen min-w-full items-center justify-center" >
            <NavigationBar />    
            <div class="flex flex-col items-center justify-center  min-w-full ">
               <div class="py-5 md:py-3 w-3/4 border-1 border-black text-purple-700 ">
                    <p class="text-center font-bold text-md md:text-xl lg:text-2xl"> Podaj email z którym założyłeś swoje konto </p>
               </div>
               <div class="w-full lg:w-3/4 md:w-3/4  sm:w-full xs:w-full border-1 border-black text-purple-700 ">
                     <div class="rounded-md shadow-md -space-y-px">    
                        <input type="email" name="email" autocomplete="password" v-model="email" class="appearance-none text-center rounded relative block w-full px-2 py-2 border border-purple-800 placeholder-gray-600 text-gray-900 focus:text-left  focus:outline-none focus:ring-green-600 focus:text-centered focus:border-green-600 focus:z-10 lg:text-3xl md:text-2xl sm:text-xl" placeholder="Email" /> 
                     </div>
               </div>
               <div id="error message" class="w-full lg:w-3/4 md:w-3/4  sm:w-full xs:w-full border-1 border-black text-purple-700" v-if="error && error.error">
                     
                                        <div class="my-4 mx-2 bg-red-200 rounded-xl lg:my-4 sm:my-6">
                                            <div class="rounded-md bg-red-200 shadow-md  -space-y-px ">
                                            
                                                <span class="text-bold lg:text-2xl md:text-xl sm:text-lg text-left font-bold text-red-600 ">
                                                    <div v-for="(value, name) in error.error" :key="name">
                                                    <p v-if="value === 'Does not exists'" > Nie znaleziono pasującego konta! </p>
                                                    <p v-else ><i  class="fas fa-exclamation-circle"></i> {{value}}</p> 
                                                    </div>
                                                
                                                </span>
                                            </div>
                                        </div>
                </div> 
               <div class="w-full lg:w-3/4 md:w-3/4  sm:w-full xs:w-full border-1 border-black text-purple-700 ">
                      <button type="submit" v-on:click="sendMail()" class="my-4   sm:py-4  rounded-xl min-w-full bg-white border border-purple-800 boreder-1 items-center justify-center hover:bg-purple-900 hover:text-white lg:text-3xl sm:text-2xl font-bold shadow-md">  
                            <span > Wyślij  </span> 
                        </button>
               </div>
               <div v-if="ok" class="w-full lg:w-3/4 md:w-3/4  sm:w-full xs:w-full border-1 border-black text-green-100 bg-green-700 rounded-xl py-2  ">
                    <p class="text-center text-md lg:text-2xl md:text-xl sm:text-md"> Udało się! Sprawdź swoją skrzynkę pocztową </p>
               </div>
            </div> {{name}} :
        </div>
    </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {
    name: 'ForgotPassword',
    components: {
        NavigationBar
    },
    data() {
        return {
            email: '',
            error: {error: null},
            ok: false,
            response: null,
        }
    },
    methods:{
        sendMail(){
                this.ok = false;
                this.error.error = [];
                if(this.email === '') {this.error.error.push("Nie wypełniono pola email!"); return;}
                const requestOptions = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"email": this.email })
                }
                fetch(`http://localhost:8000/api/profiles/me/reset_password/email/${this.email}/`, requestOptions)
                .then((res)=> {
                    if(res.status == 201){
                        return res.json();
                    }else{
                        throw res;
                    }
                })
                .then((res) =>{
                        this.response = res;
                        this.ok = true;
                        this.error.error = null;
                })
                .catch((err) =>{
                     err.json().then(json => {
                        this.error = json;
                    });
                })
        }
    },


}
</script>