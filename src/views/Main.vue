<template>
  <main>
    <section class="py-3 text-left">
      <div class="container">
        <h1 class="fw-light">Новинки</h1>
        <div class="sorter">
          <p class="sorter-name">Сортировать: </p>
          <a class="nav-link dropdown-toggle" href="#" id="sorterDropdown" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            {{sorter}}
          </a>
          <ul class="dropdown-menu" aria-labelledby="sorterDropdown">
            <li><a class="dropdown-item" href="#" @click="sortedCards('pop')">По популярности</a></li>
            <li><a class="dropdown-item" href="#" @click="sortedCards('date')">По дате</a></li>
            <li><a class="dropdown-item" href="#" @click="sortedCards('cost')">По цене</a></li>
          </ul>
        </div>
      </div>
    </section>
    <div class="album py-5 bg-light"
         v-if="cards.length">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="card in cards" :key="card.id">

            <Card
                v-bind:card="card"
            />

          </div>
        </div>
      </div>
    </div>
    <div v-else>В магазине нет игр!</div>
    <Pagination />
  </main>
</template>

<script>
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Main',
  components: {
    Card,
    Pagination
  },
  data() {
    return {
      cards: [
        {name: 'Minecraft', cost: 124, discount: null, year: 2017, description: '"Копай шахты, строй свои города, ' +
              'развивайся, выживай. Майнкрафт - это моя жизнь.\n' +
              'Майнкраааааааааааааафт!!111"', bought: false, wish: true},
        {name: 'Goood', cost: 99, discount: 20, year: 2012, description: 'Heheheh', bought: false, wish: false},
        {name: 'LikyePochooooooy', cost: 1254, discount: null, year: 1995, description: 'Hello World', bought: true, wish: false},
        {name: 'Terraria', cost: 931, discount: 15, year: 2020, description: 'Test Text', bought: true, wish: true}
      ],
      sorter: 'По популярности'
    }
  },
  methods: {
    sortedCards(value) {
      let text = '';
      if (value === 'pop') {
        text = 'По популярности';
        this.cards;
      } else if (value === 'date') {
        text = 'По дате';
        this.cards;
      } else if (value === 'cost') {
        text = 'По цене';
        this.cards;
      }
      this.sorter = text;
    }
  },
}
</script>

<style scoped>
.sorter {
  flex-wrap: nowrap;
}

.sorter-name {
  display: inline-block;
  margin-right: 5px;
}

#sorterDropdown {
  padding: 0;
  display: inline-block;
}
</style>