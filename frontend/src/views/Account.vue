<template>
    <div class="account">
        <h2 class="account_title"> Konto </h2>
        <div class="user">
            <div class="user_data">
                <span>Nazwa użytkownika</span>
                <span> {{ userObj.username }} </span>
            </div>
            <div class="user_data">
                <span>Konto utworzone</span>
                <span> {{ formatDate }} </span>
            </div>
        </div>
        <div class="contact">
            <h3>Dane kontaktowe</h3>
            <button @click="editUserData" class="contact_button contact_button--edit" :class='{"contact_button--editing": editing}' ><i class="fas fa-edit"></i>Edytuj</button>
            <div class="contact_data">
                <div class="contact_data_container">
                    <span>Telefon</span>
                    <span v-if="!editing" class="contact_data_container_text"> {{ userObj.phone || "Brak" }} </span>
                    <input v-if="editing" class="contact_data_container_input" v-model="userObj.phone" type="text">
                </div>
            </div>
            
            <div class="contact_data">
                <div class="contact_data_container">
                    <span>Email</span>
                    <span v-if="!editing" class="contact_data_container_text"> {{ userObj.email || "Brak" }} </span>
                    <input v-if="editing" class="contact_data_container_input" v-model="userObj.email" type="text">
                </div>
            </div>

            <ul>
                <span v-if="success">Zaktualizowano dane</span>
                <li
                v-for="(error, index) of errors"
                :key="index"
                > {{ error }} </li>
            </ul>
        </div>
        <div v-if="loadedClassifieds">
            <h3>Twoje ogłoszenia</h3>
            <classified
            v-for="(classified, index) of classifieds"
            :key="index"
            :classified="classified"
            @delete="deleteClassified($event)"
            ></classified>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ClassifiedItemUser from '../components/ClassifiedItemUser.vue'

export default {
    components: {
        'classified': ClassifiedItemUser
    },
    data() {
        return {
            userObj: {
                phone: '',
                phoneC: '',
                email: '',
                emailC: '',
                username: '',
                cAt: ''
            },
            editing: false,
            loading: false,
            errors: [],
            success: false,
            classifieds: [],
            loadedClassifieds: false
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getUserData()
            next()
        })
    },
    methods: {
        getUserData() {
            this.loadedClassifieds = false
            this.classifieds = []
            Vue.axios.get('/userData')
            .then(ud => {
                const userData = ud.data.userData

                this.userObj.username = userData.user.username
                this.userObj.cAt = userData.user.createdAt
                this.userObj.email = this.userObj.emailC = userData.email
                this.userObj.phone = this.userObj.phoneC = userData.phone

                Vue.axios.get(`/classifieds/?user=${ud.data.userData.user._id}`)
                .then(c => {
                    this.classifieds = c.data.classifieds
                    this.loadedClassifieds = true
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editUserData() {
            this.editing = !this.editing
            const updatedData = {}
            this.errors = []

            if(this.editing == false) {
                if(this.userObj.email != this.userObj.emailC)
                    updatedData['email'] = this.userObj.email
    
                if(this.userObj.phone != this.userObj.phoneC)
                    updatedData['phone'] = this.userObj.phone
                    
                if(this.userObj.email != this.userObj.emailC || this.userObj.phone != this.userObj.phoneC) {
                    Vue.axios.put(
                        '/userData',
                        updatedData
                    )
                    .then(res => {
                        this.userObj.emailC = this.userObj.email
                        this.userObj.phoneC = this.userObj.phone

                        this.success = true
                        setTimeout(() => this.success = false, 1500)
                    })
                    .catch(err => {
                        this.errors = err.response.data.errors
                    })
                }
            }
        },
        deleteClassified(id) {
            this.classifieds.filter((v,i) => { if(v._id==id) {
                Vue.axios.delete(`classifieds/${id}`)
                .then(result => {
                    this.classifieds.splice(i, 1)
                })
                .catch(err => {
                    console.log(err)
                })
            }})
        }
    },
    computed: {
        formatDate() {
            return new Date(this.userObj.cAt).toLocaleString()
        }
    },
    created() {
        this.getUserData()
    }
}
</script>

<style scoped>
    .account {
        display: grid;
        padding: 5px;
    }
    .account_title {
        text-align: center;
    }
    .user, .user_data, .contact, .contact_data, .contact_data_container {
        display: grid;
    }
    .user, .contact {
        grid-template-columns: 1fr;
        grid-gap: .5em;
    }
    .contact {
        margin-top: 20px;
    }
    .user_data, .contact_data {
        text-align: left;
        border-radius: 5px;
        border: solid black 1px;

        padding: 5px;
    }
    .contact_button {
        outline: none;
        border: solid black 1px;
        border-radius: 5px;
        background-color: transparent;
        text-align: center;
        transition: all .5s;
    }
    .contact_button--edit {
        width: 4.5em;
        height: 3em;
    }
    .contact_button--editing {
        background-color: #000;
        color: #fff
    }
    .contact_button--editing > i {
        color: #fff;
    }
    .contact_data_container_text {
        word-break: break-all;
    }
    .contact_data_container_text, .contact_data_container_input{
        min-height: 1.5em;
        padding: 0;
        margin: 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0
    }
    li {
        color: rgb(143, 5, 5);
        margin-top: 15px;
    }
    li:first-child {
        margin-top: 0;
    }
</style>
