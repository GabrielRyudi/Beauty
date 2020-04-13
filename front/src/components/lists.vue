<template>
    <div class='list-card'>
        <b-container>
            <b-row class='lists-container'>
                <b-col class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelOne'></slot>
                    </div>
                    <slot name='one' class='slot-css'></slot>
                </b-col>
            </b-row>
            <b-row class='lists-container'>
                <b-col cols='8' class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelTwo'></slot>
                    </div>
                    <slot name='two'></slot>
                </b-col>
                <b-col cols='4' class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelThree'></slot>
                    </div>
                    <slot name='three'></slot>
                </b-col>
            </b-row>
            <b-row class='lists-container'>
                <b-col class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelFour'></slot>
                    </div>
                    <slot name='four'></slot>
                </b-col>
            </b-row>
            <b-row class='lists-container'>
                <b-col class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelFive'></slot>
                    </div>
                    <slot name='five'></slot>
                </b-col>
                <b-col cols='2' class='item-lista' style='text-align:center!important;'>
                    <div class='slot-label'>
                        <slot name='labelSix'></slot>
                    </div>
                    <slot name='six'></slot>
                </b-col>
                <b-col class='item-lista' style='text-align:center!important;'>
                    <div class='slot-label'>
                        <slot name='labelSeven'></slot>
                    </div>
                    <slot name='seven' ></slot>
                </b-col>
            </b-row>
            <b-row class='lists-container'>
                <b-col class='item-lista'>
                    <div class='slot-label'>
                        <slot name='labelEight'></slot>
                    </div>
                    <slot name='eight'></slot>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'lvLists',
        data:{
            return:{
                
            }
        },
        methods:{
        
        }
    }
</script>

<style>
    .lists-container{
        width: 100%;
        padding: 0;
        margin: 0!important;
    }

    .item-lista{
        padding: 5px;
    }

    .list-card{
        width: 100%;
        height: 100%;
        border:1px solid #3B3B98;
    }

    .item-lista > *{
        font-size: 1.3rem;
        font-family: 'Times New Roman', Times, serif;
    }

    .slot-label > *{
        font-size: 1rem;
        font-weight: bold;
        color:#2e86de;
        font-family: 'Times New Roman', Times, serif;
    }
</style>