<template>
    <div class="search" @keyup.enter="login()" >
        <h1>Logowanie</h1>
        <input
            type="text"
            placeholder="Nazwa użytkownika"
            v-model="userObj.username">

        <input
            type="password"
            placeholder="Hasło"
            v-model="userObj.password">
        <button @click="login()"> Zaloguj</button>
        <ul>
            <li
            v-for="(error, index) of errors"
            :key="index"
            > {{ error }} </li>
        </ul>
        <span>
            Nie posiadasz konta ?
            <router-link to="/register"> zarejestruj się!</router-link>
        </span>
    </div>
</template>

<script>
import Vue from 'vue'
import auth from '../auth.js'

export default {
    data() {
        return {
            userObj: {
                username: '',
                password: ''
            },
            errors: []
        }
    },
    methods: {
        login() {
            this.errors = []
            if(this.userObj.username == '', this.userObj.password == '') {
                this.errors.push('Wymagana nazwa użytkownika i hasło')
                return
            }

            Vue.axios.post(
                '/user/login',
                {
                    username: this.userObj.username,
                    password: this.userObj.password
                }
            )
            .then(res => {
                auth.setUserToken(res.data.token)
                this.$router.push('search')
                this.$emit('auth', true)
            })
            .catch(err => {
                this.errors = err.response.data.errors
            })
            .finally(() => {
                this.userObj.username = ''
                this.userObj.password = ''
            })
        }
    }
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
        font-size: 1em;
        padding: .15em .35em;
    }
    button {
        justify-self: right;
        border: solid black 1px;
        width: 50%;
        background-color: #fff;
        padding: .35em .35em;
        transition: all .25s;
    }
    button:hover {
        background-color: black;
        color: white;
    }
    h1 {
        text-align: center;
    }
    a {
        text-decoration: underline;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    li {
        color: rgb(211, 28, 28)
    }
</style>
