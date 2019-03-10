<template>
    <div class="classifieds-item">
        <span class="classifieds-item-name">{{ classified.name }}</span>
        <span class="classifieds-item-category"> {{ classified.category }} </span>
        <span class="classifieds-item-user"> {{ classified.user.username }} <i class="far fa-user"></i></span>
        <span class="classifieds-item-createdAt"> {{ classified.createdAt }} <i class="far fa-calendar"></i></span>
        <span class="classifieds-item-description">Opis ogłoszenia Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut dolor tempora perferendis nulla. Possimus reprehenderit libero, eum quia pariatur commodi unde illum ex quaerat.</span>
    </div>
</template>

<script>
export default {
    props: ['classified'],
    data() {
        return {
            // loading: true
            // description: ''
        }
    }
}
</script>

<style>
.classifieds-item {
    position: relative;
    display: grid;
    border: solid black 1px;

    padding: 5px;
    margin-top: 25px;
}
.classifieds-item:first-child {
    margin-top: 0;
}
.classifieds-item-name {
    word-break: break-all;
    border-bottom: solid black 1px;
    margin-bottom: 5px;
}
.classifieds-item-category {
    position: absolute;
    
    transform: translateY(-18px) translateX(-5px);
    background-color: #fff;
    border: solid black 1px;
    z-index: 1;
}
.classifieds-item-user {
    text-align: right;
    font-size: .9em;
}
.classifieds-item-user > i {
    font-size: .8em;
}
.classifieds-item-createdAt {
    text-align: right;
    font-size: .75em;
}
.classifieds-item-createdAt > i, .classifieds-item-user > i {
    margin-left: 5px;
}
.classifieds-item-description {

}
</style>
