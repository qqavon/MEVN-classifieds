<template>
    <div class="add">
        <h2 class="add_title">Dodaj ogłoszenie</h2>
        <div>
            <span>Nazwa</span>
            <input class="add_input" type="text" placeholder="Nazwa" v-model="classified.name">
        </div>
        <div>
            <span>Opis</span>
            <textarea class="add_input add_input--area" rows="10" v-model="classified.description" placeholder="Opis" ></textarea>
        </div>
        <div>
            <span>Kategoria</span>
            <select class="add_input" v-model="classified.category">
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
            <select class="add_input" v-model="classified.voivodeship">
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
        <button class="add_button" @click="addNew">Dodaj ogłoszenie</button>
        <ul class="errors">
            <li
            v-for="(error, index) of errors"
            :key="index"
            class="errors_item"
            > {{ error }} </li>
        </ul>
        <span v-if="success">Dodano ogłoszenie</span>
    </div>    
</template>


<script>
import Vue from 'vue'

export default {
    data() {
        return {
            classified: {
                name: '',
                description: '',
                category: 0,
                voivodeship: 0
            },
            errors: [],
            success: false
        }
    },
    methods: {
        addNew() {
            this.errors = []
            console.log(this.classified)

            Vue.axios.post(
                '/classifieds',
                {
                    name: this.classified.name,
                    description: this.classified.description,
                    category: this.classified.category,
                    voivodeship: this.classified.voivodeship,
                }
            )
            .then(res => {
                console.log(res)
                this.classified.name = ''
                this.classified.description = ''
                this.classified.cateogry = "0"
                this.classified.voivodeship = "0"
                this.success = true
                setTimeout(() => this.success = false, 1500)
            })
            .catch(err => {
                this.errors = err.response.data.errors
            })
        }
    }
}
</script>

<style>
    .add {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 5px;

        padding: 10px;
    }
    .add > div {
        display: grid;
    }
    .add_title {
        text-align: center;
    }
    .add_input, .add_button {
        padding: 5px;
        margin: 0;
        border: solid black 1px;
        background-color: transparent;
        outline: none;
    }
    .add_button:active {
        background-color: black;
        color: white;
    }
    .add_input--area {
        resize: none;
    }
    .errors {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .errors_item {
        color: rgb(175, 17, 17)
    }
</style>