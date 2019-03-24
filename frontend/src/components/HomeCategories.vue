<template>
    <div class="categories">
        <div class="category-list">
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <span class="category-item-name"> Praca </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-home"></i>
                </div>
                <span class="category-item-name"> Nieruchomości </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-car"></i>
                </div>
                <span class="category-item-name"> Motoryzacja </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-couch"></i>
                </div>
                <span class="category-item-name"> Dom i ogród </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <span class="category-item-name"> Elektronika </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-baby"></i>
                </div>
                <span class="category-item-name"> Dla dziecka </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-tshirt"></i>
                </div>
                <span class="category-item-name"> Moda i uroda </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-bicycle"></i>
                </div>
                <span class="category-item-name"> Rozrywka i rekreacja </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-paw"></i>
                </div>
                <span class="category-item-name"> Zwierzęta </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-users"></i>
                </div>
                <span class="category-item-name"> Randki i przyjaciele </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-user-tie"></i>
                </div>
                <span class="category-item-name"> Usługi i firmy </span>
            </div>
            <div class="category-item">
                <div class="category-item-icon">
                    <i class="fas fa-thumbtack"></i>
                </div>
                <span class="category-item-name"> Różne </span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>
.categories {
    padding: 0 50px;
    margin-bottom: 25px;
}
.category-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
}
.category-item {
    position: relative;
    display: grid;
    border: solid black 1px;
    border-radius: 5px;
    padding: .25em;
}
.category-item-icon {
    position: absolute;
    display: grid;
    align-items: center;
    justify-items: center;

    width: 40px;
    height: 40px;
    transform: translateX(-19px) translateY(-7px);

    font-size: 23px;
    border: solid black 1px;
    border-radius: 100%;
    background-color: #fff;
    z-index: 1;
}
.category-item-name {
    margin-left: 20px;
    justify-self: center;
    align-self: center;
    text-align: center;    
}

@media screen and (max-width: 550px) {
    .category-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 400px) {
    .category-list {
        grid-template-columns: 1fr;
    }
}
</style>
