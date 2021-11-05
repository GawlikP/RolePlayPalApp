<template>

    <div id="CommentViewComponent" class="fluid min-w-full min-h-10 px-4 py-3 shadow-md border border-purple-600 rounded-xl">
        <p class="font-bold"> {{user_username}}</p>
        <p class=" text-gray-700 text-xs font-bold"> Date: dsafsdafdsafdsaf </p>
        <p class="text-xl font-bold"> {{content}} </p>
    </div>

</template>

<script>
export default{
    name: 'CommentViewComponent',
    props: {
        post_absolute_url: String,
        user: String,
        user_username: String,
        content: String,
    },
    data(){
        return {
            comments: []
        }
    },
    mounted() {

    },
    methods: {
        getComments(){
              const requestOptions = {
              method: "GET",
              headers: {"Content-Type":"application/json",
                        "Authorization": `Token ${this.$store.state.user.token}`}
          }
          fetch(`http://localhost:8000/api/posts${this.absolute_url}comments/`, requestOptions)
          .then((res=>{
              if(res.status == 200) return res.json()
              else throw res
          }))
          .then((response =>{
     
              this.comments = response;
              
          }))
          .catch(err=> {
              console.log(err)
          })
        }
    }
}
</script>

