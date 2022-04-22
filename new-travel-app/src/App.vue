ad<template>
  <div id="nav">
    <!--router view is a component that changes when the page re-renders-->
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link>
    
  
  </div>

  
  <div class="container">
    <router-view/>
  </div>
</template>

