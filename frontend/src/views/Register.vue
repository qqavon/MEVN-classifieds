<template>
    <div class="search">
        <h1>Rejestracja</h1>
        <input type="text" placeholder="Nazwa użytkownika">
        <input type="password" placeholder="Hasło">
        <input type="password" placeholder="Powtórz hasło">
        <button>Zarejestruj się</button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .search {
        display: grid;
        align-items: center;
        grid-gap: 15px;
        padding: 2em;
    }
    input, button {
        outline: none;
    }
    input {
        border: solid black 1px;
        font-size: 1.15em;
        padding: .15em .35em;
    }
    button {
        justify-self: right;
        border: solid black 1px;
        width: 50%;
        background-color: #fff;
        padding: .35em .35em;
    }
    h1 {
        text-align: center;
    }
    a {
        text-decoration: underline;
    }
</style>
