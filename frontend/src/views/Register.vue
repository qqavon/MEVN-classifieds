<template>
    <div class="register" @keyup.enter="register">
        <h1>Rejestracja</h1>
        <input type="text" placeholder="Nazwa użytkownika" v-model="userObj.username">
        <input type="password" placeholder="Hasło" v-model="userObj.password">
        <input type="password" placeholder="Powtórz hasło" v-model="userObj.passwordConfirmation">
        <button @click="register">Zarejestruj się</button>
        <span v-if="success" class="success">Pomyślnie zarejestrowano</span>
        <ul>
            <li
            v-for="(error, index) of errors"
            :key="index"
            > {{ error }} </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            userObj: {
                username: '',
                password: '',
                passwordConfirmation: ''
            },
            success: false,
            errors: []
        }
    },
    methods: {
        register() {
            this.errors = []

            Vue.axios.post(
                '/user/register',
                {
                    username: this.userObj.username,
                    password: this.userObj.password,
                    passwordConfirmation: this.userObj.passwordConfirmation,
                }
            )
            .then(res => {
                this.userObj.username = ''
                this.userObj.password = ''
                this.userObj.passwordConfirmation = ''

                this.success = true
                setTimeout(() => {
                    this.success = false
                }, 1500)
            })
            .catch(err => {
                this.errors = []
                this.errors = err.response.data.errors
            })
        }
    }
}
</script>

<style scoped>
    .register {
        display: grid;
        align-items: center;
        grid-gap: 15px;
        padding: 2em;
        width: 300px;
        justify-self: center;
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
        color: rgb(211, 28, 28);
        margin-top: 15px;
    }
    .success {
        color: limegreen;
        text-align: center;
    }
    @media screen and (max-width: 360px){
        .register {
            width: auto;
        }
    }
</style>
