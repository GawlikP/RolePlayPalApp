<template>
<div id="SuccessGameHandoutModal" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
    <div class="relative px-4 w-full max-w-2xl h-full md:h-auto justify-center items-center">
        <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
                <h1 class="text-xl mb-4 font-bold text-slate-500">Succesfull!</h1>
                <button v-on:click="$emit('hide')" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'SuccessGameHandoutModal',
    emits: ["hide"]
}
</script>