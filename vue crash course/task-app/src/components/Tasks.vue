<template>
    <div :key="task.id" v-for="task in tasks">
        <!-- <h3>{{ task.test}}</h3> -->

        <task :task="task" />

    </div>
    
</template>

<script>

import Task from './Task'

export default {
    name: 'Tasks', 
    props:{
        tasks: Array
    }, 
     components: {
         Task
     }

}
</script>