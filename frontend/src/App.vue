<template>
  <div id="app" class="light-theme">
    <nav>
      <router-link to="/">
        <div class="nav-link">
          <i class="fas fa-home"></i>
          <span class="nav-link-text">Strona główna</span>
        </div>
      </router-link>

      <router-link to="/">
        <div class="nav-link">
          <i class="fas fa-list-ul"></i>
          <span class="nav-link-text">Kategorie ogłoszeń</span>
        </div>
      </router-link>

      <router-link to="/search">
        <div class="nav-link">
          <i class="fas fa-search"></i>
          <span class="nav-link-text">Szukaj</span>
        </div>
      </router-link>

      <router-link to="/">
        <div class="nav-link">
          <i class="fas fa-plus"></i>
          <span class="nav-link-text">Dodaj ogłoszenie</span>
        </div>
      </router-link>

      <router-link to="/">
        <div class="nav-link">
          <i class="fas fa-user"></i>
          <span class="nav-link-text">Konto</span>
        </div>
      </router-link>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli');
@import url('assets/transitions.css');

body {
  margin: 0;
}

* {
  font-family: 'Muli', sans-serif;
  text-decoration: none;
}

.light-theme * {
  color: #111;
}
.light-theme nav {
  background-color: #fff;
}

#app {

}

nav {
  position: sticky;
  display: grid;
  grid-template-columns: repeat(5, 50px);
  align-items: center;
  justify-items: center;
  justify-content: right;

  top: 0;
  left: 0;
  padding: 7px 0;

  border-bottom: solid #ccc 2px;
  z-index: 10;
}
.nav-link > .nav-link-text {
  display: none;
}
.nav-link > i {
  font-size: 1.5em;
}

#nav a.router-link-exact-active {
  
}
</style>