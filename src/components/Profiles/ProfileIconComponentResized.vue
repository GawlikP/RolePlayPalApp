<template>
<div id="ProfileIcon">
    <div v-if="profile_slug" class="flex space-x-2" v-on:click="$router.push({ name: 'Profile', params: { slug: profile_slug}})" >
        <div class="relative xl:w-12 xl:h-12 lg:w-10 lg:h-10  md:w-8 md:h-8  sm:h-8 sm:w-8 xs:w-8 xs:h-8 inline-block">
            <i v-if="profile_image === ''" class="text-center font-bold  min-w-full fas fa-user"></i><img  v-else class="xl:w-12 xl:h-12 lg:w-10 lg:h-10  md:w-8 md:h-8 sm:h-8 sm:w-8 xs:w-6 xs:h-6 mx-auto rounded-full" :src="profile_image" alt="user image" />   
        </div>
    </div>
    <div v-else class="flex space-x-2"  >
        <div class="relative xl:w-12 xl:h-12 lg:w-10 lg:h-10  md:w-8 md:h-8  sm:h-8 sm:w-8 xs:w-8 xs:h-8 inline-block">
            <i v-if="profile_image === ''" class="text-center font-bold  min-w-full fas fa-user"></i><img  v-else class="xl:w-12 xl:h-12 lg:w-10 lg:h-10  md:w-8 md:h-8 sm:h-8 sm:w-8 xs:w-6 xs:h-6 mx-auto rounded-full" :src="profile_image" alt="user image" />   
        </div>
    </div>
</div>
</template>
<script>


export default({
    name: 'ProfileIconComponentResized',
      props: {
        user_id: Number,
        profile_image: String,
        profile_slug: String,
    },
    
})
</script>
