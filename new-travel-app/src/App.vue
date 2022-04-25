<template>
  <div class="container">
    <the-navigation-bar />
    <router-view/>
  </div>
</template>

<script>

import TheNavigationBar from '@/components/TheNavigationBar.vue'

export default {
  components: { TheNavigationBar},
  
};
</script>

