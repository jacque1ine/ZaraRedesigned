<template>
  <!-- <v-app>
    <v-main> -->

      <nav> 
         <router-link to="/">Home</router-link> |
        <router-link to="/adduser">Add User</router-link> | 
        <router-link to="/posts">Posts</router-link>
       
        
        
      
      </nav>

      <router-view/>
    <!-- </v-main>
  </v-app> -->
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
