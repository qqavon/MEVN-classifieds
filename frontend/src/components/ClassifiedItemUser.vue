<template>
    <div class="classifiedItemUser">
        <span> {{ classified.name }} </span>
        <button @click="go"><i class="fas fa-external-link-alt"></i></button>
        <button @click="$emit('delete', classified._id)" ><i class="far fa-trash-alt"></i></button>
    </div>    
</template>

<script>
export default {
    props: ['classified'],
    methods: {
        go() {
            this.$router.push({path: `/classified/${this.classified._id}`})
        }
    }
}
</script>

<style scoped>
    .classifiedItemUser {
        display: grid;
        grid-template-columns: 1fr auto auto;
        grid-gap: 5px;
        border: solid black 1px;
        padding: 2px;
        align-items: center;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    button {
        width: 25px;
        height: 25px;
        align-self: start;
        border-radius: 100%;
        border: solid black 1px;
        background-color: transparent;
        outline: none;
        transition: all .25s;
    }
    button:hover {
        background-color: #000;
    }
    button:hover > i {
        color: #fff;
    }
    span {
        word-break: break-all;
    }
</style>
