<template>
    <div>
        <div v-if="loading">Ładowanie...</div>
        <div v-if="!loading">
            <div v-if="errors.length == 0" class="classifieds-item classifieds-item--single">
                <span class="classifieds-item-name">{{ classified.name }}</span>
                <span class="classifieds-item-category"> {{ formatCategory }} </span>
                <span class="classifieds-item-description"> {{ classified.description }} </span>
                <span class="classifieds-item-voivodeship"> {{ formatVoivodeship }} </span>
                <div class="classifieds-item-contact">
                    <span> Telefon: {{ userData.phone || "brak" }} </span>
                    <span> Email: {{ userData.email || "brak" }} </span>
                </div>
                <span class="classifieds-item-user"> {{ classified.user.username }} <i class="far fa-user"></i></span>
                <span class="classifieds-item-createdAt"> {{ formatDate }} <i class="far fa-calendar"></i></span>
                <!-- Dodać dane kontaktowe -->
            </div>
            <ul v-else class="classified_errors">
                <li class="classidied_errors_error"
                v-for="(error, index) of errors"
                :key="index"
                > {{ error }} </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            classified: {},
            userData: {},
            errors: [],
            loading: true
        }
    },
    methods: {
        loadClassified() {
            this.errors = []
            this.loading = true
            Vue.axios
                .get(`/classifieds/${this.$route.params.id}`)
                .then(res => {
                    if(res.data.classified == null) {
                        this.errors = ['Ogłoszenie nie istnieje']
                        return
                    }
                    this.classified = res.data.classified
                    this.userData = res.data.userData
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
    created() {
        this.loadClassified()
    },
    computed: {
        formatCategory() {
            switch( this.classified.category ) {
                case 0: this.categoryName = 'Wszystko'; break
                case 1: this.categoryName = 'Praca'; break
                case 2: this.categoryName = 'Nieruchomość'; break
                case 3: this.categoryName = 'Motoryzacja'; break
                case 4: this.categoryName = 'Dom i ogród'; break
                case 5: this.categoryName = 'Elektronika'; break
                case 6: this.categoryName = 'Dla dziecka'; break
                case 7: this.categoryName = 'Moda i uroda'; break
                case 8: this.categoryName = 'Rozrywka i rekreacja'; break
                case 9: this.categoryName = 'Zwierzęta'; break
                case 10: this.categoryName = 'Randki i przyjaciele'; break
                case 11: this.categoryName = 'Usługi i firmy'; break
                case 12: this.categoryName = 'Różne'; break
                default: this.categoryName = 'Nieznana'
            }
            return this.categoryName
        },
        formatVoivodeship() {
            switch ( this.classified.voivodeship ) {
                case 0: this.voivodeshipName = 'Wszystkie'; break
                case 1: this.voivodeshipName = 'Dolnośląskie'; break
                case 2: this.voivodeshipName = 'Kujawsko-pomorskie'; break
                case 3: this.voivodeshipName = 'Lubelskie'; break
                case 4: this.voivodeshipName = 'Lubuskie'; break
                case 5: this.voivodeshipName = 'Łódzkie'; break
                case 6: this.voivodeshipName = 'Małopolskie'; break
                case 7: this.voivodeshipName = 'Mazowieckie'; break
                case 8: this.voivodeshipName = 'Opolskie'; break
                case 9: this.voivodeshipName = 'Podkarpackie'; break
                case 10: this.voivodeshipName = 'Podlaskie'; break
                case 11: this.voivodeshipName = 'Pomorskie'; break
                case 12: this.voivodeshipName = 'Śląskie'; break
                case 13: this.voivodeshipName = 'Świętokrzyskie'; break
                case 14: this.voivodeshipName = 'Warmińsko-mazurskie'; break
                case 15: this.voivodeshipName = 'Wielkopolskie'; break
                case 16: this.voivodeshipName = 'Zachodniopomorskie'; break
                default: this.voivodeshipName = 'Nieznane'
            }
            return this.voivodeshipName
        },
        formatDate() {
            return new Date(this.classified.createdAt).toLocaleString()
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.loadClassified()
            next()
        })
    }
}
</script>

<style>
.classifieds-item-contact {
    display: grid;
    margin-top: 20px;
}
.classifieds-item-description {
    white-space: pre-line;
}
</style>
