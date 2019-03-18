<template>
    <div class="search">
        <div class="nav-search">
            <input type="text" v-model="searchObj.name" placeholder="Podaj nazwę ogłoszenia (uwaga, strict)">
            <div>
                <span>Kategoria</span>
                <select v-model="searchObj.category">
                    <option value="0">Wszystko</option>
                    <option value="1">Praca</option>
                    <option value="2">Nieruchomość</option>
                    <option value="3">Motoryzacja</option>
                    <option value="4">Dom i ogród</option>
                    <option value="5">Elektronika</option>
                    <option value="6">Dla dziecka</option>
                    <option value="7">Moda i uroda</option>
                    <option value="8">Rozrywka i rekreacja</option>
                    <option value="9">Zwierzęta</option>
                    <option value="10">Randki i przyjaciele</option>
                    <option value="11">Usługi i firmy</option>
                    <option value="12">Różne</option>
                </select>
            </div>
            <div>
                <span>Województwo</span>
                <select v-model="searchObj.voivodeship">
                    <option value="0">Wszystkie</option>
                    <option value="1">Dolnośląskie</option>
                    <option value="2">Kujawsko-pomorskie</option>
                    <option value="3">Lubelskie</option>
                    <option value="4">Lubuskie</option>
                    <option value="5">Łódzkie</option>
                    <option value="6">Małopolskie</option>
                    <option value="7">Mazowieckie</option>
                    <option value="8">Opolskie</option>
                    <option value="9">Podkarpackie</option>
                    <option value="10">Podlaskie</option>
                    <option value="11">Pomorskie</option>
                    <option value="12">Śląskie</option>
                    <option value="13">Świętokrzyskie</option>
                    <option value="14">Warmińsko-mazurskie</option>
                    <option value="15">Wielkopolskie</option>
                    <option value="16">Zachodniopomorskie</option>
                </select>
            </div>
            <button @click="search"><i class="fas fa-search"></i></button>
        </div>
        <div v-if="pages > 1" class="pages">
            <span>Strona:</span>
            <ul class="pagination">
                <li v-if="currentPage-2 >= 1 && currentPage > 2" @click="gotoPage(1)"> 1 ... </li>
                <li v-if="currentPage-1 >= 1" @click="gotoPage(currentPage-1)" > {{ currentPage - 1 }} </li>
                <li class="currentPage"> {{ currentPage }} </li>
                <li v-if="currentPage+1 <= pages" @click="gotoPage(currentPage+1)"> {{ currentPage + 1 }} </li>
                <li v-if="currentPage+2 <= pages-1 && currentPage==1" @click="gotoPage(currentPage + 2)"> {{ currentPage + 2 }} </li>
                <li v-if="currentPage < pages && currentPage+1 != pages" @click="gotoPage(pages)" > ...{{ pages }} </li>
            </ul>
        </div>
        <h2>Lista ogłoszeń</h2>
        <div class="classifieds-list">
            <div class="loading" v-if="searching"></div>
            <div v-if="!searching">
                <transition-group name="rotation" tag="div" class="idk">
                    <classifieds-item
                    v-for="classified of classifieds"
                    :classified="classified"
                    :key="classified._id"
                    ></classifieds-item>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ClassifiedsItem from '../components/ClassifiedsItem.vue'

export default {
    components: {
        'classifieds-item': ClassifiedsItem
    },
    data() {
        return {
            searchObj: {
                name: '',
                voivodeship: 0,
                category: 0
            },
            searchString: '',
            searching: false,
            classifieds: [],
            pages: 0,
            currentPage: 1
        }
    },
    methods: {
        gotoPage(page) {

            if(this.currentPage != page) {
                this.currentPage = page
                this.search(false)
            }
        },
        search(clear = true) {
            this.searching = true

            if(clear) {
                this.searchString = ''
                this.currentPage = 1
                this.pages = 1

                if(this.searchObj.name.length > 1)
                    this.searchString += `q=${this.searchObj.name}`

                if(+this.searchObj.voivodeship.length)
                    this.searchString += `&voivodeship=${this.searchObj.voivodeship}`

                if(+this.searchObj.category)
                    this.searchString += `&category=${this.searchObj.category}`
            }

            Vue.axios.get(`/classifieds/?${this.searchString}&page=${this.currentPage}`)
            .then(result => {
                this.classifieds = result.data.classifieds
                this.pages = result.data.numOfPages
            })
            .catch(err => console.log(err))
            .finally(() => this.searching = false )
        }
    }
}
</script>

<style scoped>
@import url('../assets/transitions.css');

.search {
    display: grid;
    grid-template-columns: 1fr;
}
.nav-search {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;

    padding: 10px;

    z-index: 1;
}
.nav-search > input {
    grid-column: 1 / -1;
}
select {
    width: 100%;
}
.nav-search input, .nav-search select, .nav-search button {
    border: solid #222 1px;
    background-color: #fff;
    padding: 5px;
    outline: none;
}
.nav-search > button {
    grid-column: 1 / -1;
    width: auto;
    transition: all .6s;
}
.nav-search > button:active {
    background-color: #222;
}
.nav-search > button:active > i {
    color: #fff;
}

h2 {
    text-align: center;
}

.classifieds-list {
    padding: 5px;
    margin: 5px;
    display: grid;
}

.loading {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: solid black 2px;
    border-right: none;
    border-bottom: none;
    justify-self: center;
    animation: rotating 1s infinite;
    margin-bottom: 25px;
}

.pages {
    padding: 0 .75em;
}

.pagination {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45px, auto));
    list-style-type: none;
    align-items: center;
    justify-items: center;
}
.pagination li {
    display: grid;

    justify-content: center;
    align-content: center;

    padding: .25em .45em;
    cursor: pointer;
    border: solid black 1px;
}
.currentPage {
    background-color: black;
    color: white
}
@keyframes rotating {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
}
</style>