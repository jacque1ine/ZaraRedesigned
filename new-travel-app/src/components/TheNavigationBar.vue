  <template>
    <div id="nav">
    <!--router view is a component that changes when the page re-renders-->
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link>
   <router-link 
    v-for="destination in destinations" 
    :key="destination.id"
    :to="`/destination/${destination.id}`"
    >{{ destination.name }}
    </router-link>
    
    
  </div>
  </template>
  
<script>

import sourceData from '@/data.json'

export default {
  data(){
    return {
      destinations: sourceData.destinations,
    };
  },
  
 };
</script>

  
