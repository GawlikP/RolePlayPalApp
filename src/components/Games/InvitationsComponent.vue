<template>
    <div id="InvitationsComponent">

        </div>
</template>
<script>

export default defineComponent({
    name: 'InvitationsComponent',
    data(){
        return{
            loading: false,
            ok: false,
            errors: "",
            invitations: [],
        }
    },
    created(){
        this.fetchMethods()
    },
     watch: {
        '$route': 'fetchGames'
    },
    methods: {
        fetchMethods(){
            
        }
    }
})
</script>
