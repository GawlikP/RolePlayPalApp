<template>

<nav class="sticky mt-0  w-full z-40 top-0 items-center justify-between  py-4 bg-black ">
    <div class="container mx-2 flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto px-4  lg:static lg:block lg:justify-start">
        <a class="lg:text-2xl md:text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" >
          Role Play Pal
        </a>
        <button class="text-white color-pink-800 cursor-pointer text-xl leading-none px-3 py-1 border border-solid  rounded block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          =
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
              <i class="fas fa-home" style="bold"></i><router-link to="/forum">Forum</router-link> 
            </a>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="fab fa-weixin"></i><router-link to="/messages">Wiadomości</router-link>
            </a>
          </li>
          <li class="nav-item" v-if="!$store.state.user.isAuthenticated">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="fas fa-id-badge"></i><router-link to="/login">Logowanie</router-link>
            </a>
          </li>
          <li class="nav-item" v-if="!$store.state.user.isAuthenticated">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="fas fa-sign-in-alt"></i><router-link to="/register">Rejestracja</router-link>
            </a>
          </li>
          <li v-if="$store.state.user.isAuthenticated" class="nav-item">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="far fa-user-circle"></i><router-link to="/account">Konto</router-link>
            </a>
          </li>
          <li v-if="$store.state.user.isAuthenticated" class="nav-item">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="fas fa-dice-d6"></i><router-link to="/games">Rozgrywki</router-link>
            </a>
          </li>
          <li v-if="$store.state.user.isAuthenticated" class="nav-item">
            <a class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75" >
             <i class="fas fa-door-open"></i><router-link to="/logout">Wyloguj</router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default ({
     data() {
    return {
      showMenu: false
    }
    },
    methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  },
})
</script>