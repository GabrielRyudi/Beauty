<template>
    <div>
        <b-card 
            no-body
            class='simple-card mb-2'
            
        >
        <slot name='title'></slot>
        <slot name='content'></slot>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'simple-card',
        props:['header', 'bg-variant']
    }
</script>

<style>
    .simple-card{
        padding: 5px
    }
</style>