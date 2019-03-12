<template>
    <div class="classifieds-item">
        <span class="classifieds-item-name">{{ classified.name }}</span>
        <span class="classifieds-item-category"> {{ formatCategory }} </span>
        <span class="classifieds-item-voivodeship"> {{ formatVoivodeship }} </span>
        <span class="classifieds-item-user"> {{ classified.user.username }} <i class="far fa-user"></i></span>
        <span class="classifieds-item-createdAt"> {{ formatDate }} <i class="far fa-calendar"></i></span>
        <span class="classifieds-item-description">Opis ogłoszenia Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut dolor tempora perferendis nulla. Possimus reprehenderit libero, eum quia pariatur commodi unde illum ex quaerat.</span>
    </div>
</template>

<script>
export default {
    props: ['classified'],
    data() {
        return {
            categoryName: '',
            voivodeshipName: ''
        }
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

.classifieds-item-voivodeship {
    position: absolute;
    
    transform: translateY(-18px) translateX(-5px);
    right: 0;
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
</style>
