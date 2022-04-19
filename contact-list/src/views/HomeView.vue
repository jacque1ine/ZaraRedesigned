<template>
  <div class="home">
    <h1>home</h1>

    <div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-app>
</div>
 
  </div>
</template>



