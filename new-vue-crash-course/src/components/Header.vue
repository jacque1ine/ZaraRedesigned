<template>
    <header>
        <h1>{{title}}</h1>
        <Button @toggle-add-task="$emit('toggle-add-task')" 
        :text="showAddTask ? 'Close' : 'Add Task'" 
        :color="showAddTask ? 'red' : 'green' " /> <!--capital B since it is a componenta-->
    </header>
</template>

<script>

import Button from './Button'

export default {
    name: 'Header', //you can pass props into components
    props: {
        title: String,
        showAddTask: Boolean
    }, 

    components: {
        Button,

    }

    
}
</script>

<style scoped>
    header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    }

</style>