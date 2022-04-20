<template>
    <!--CLASS is btn since we have global styling for it in app.vue-->
    <button @click="onClick()" :style="{background: color}"
    class="btn">{{text}}</button> 

</template>

<script>
export default {
    name: 'Button', 
    props: {
        text: String, 
        color: String
    },

    methods: {
        onClick(){
            console.log("click")
        },

    }
}
</script>