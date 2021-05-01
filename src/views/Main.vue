<template>
  <main>
    <section class="py-3 text-left">
      <div class="container">
        <h1 class="fw-light">Главная</h1>
        <div class="sorter">
          <p class="sorter-name">Сортировать: </p>
          <a class="nav-link dropdown-toggle" id="sorterDropdown" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            {{sorter}}
          </a>
          <ul class="dropdown-menu" aria-labelledby="sorterDropdown">
            <li><a class="dropdown-item" @click="sortedCards('name')">По названию</a></li>
            <li><a class="dropdown-item" @click="sortedCards('date')">По дате</a></li>
            <li><a class="dropdown-item" @click="sortedCards('cost')">По цене</a></li>
          </ul>
        </div>
      </div>
    </section>
    <div class="album py-5 bg-light"
         v-if="games.length">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="game in games" :key="game.id">

            <Card
                v-bind:game="game"
                v-bind:game_cost="game.game_costs[0]"
                v-bind:boughtOut="!library.find(lib => lib.id === game.id)"
                v-bind:wishOut="!wishlist.find(wish => wish.id === game.id)"
            />

          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>В магазине пока нет игр.</div>
    <Pagination />
  </main>
</template>

<script>
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import { request } from '@/frontend'

export default {
  name: 'Main',
  components: {
    Card,
    Pagination
  },
  data() {
    return {
      games: [],
      library: [],
      wishlist: [],
      sorter: 'Не выбрано'
    }
  },
  methods: {
    sortedCards(value) {
      let text = '';
      if (value === 'name') {
        text = 'По названию';
        this.games.sort((g1, g2) => {
          let name1 = g1.name.toLowerCase(), name2 = g2.name.toLowerCase();
          if (name1 < name2) {
            return -1; // Сортируем строки по возрастанию
          }
          if (name1 > name2) {
            return 1; // Сортируем строки по убыванию
          }
          return 0 // Никакой сортировки
        });
      } else if (value === 'date') {
        text = 'По дате';
        this.games.sort((g1, g2) => {
          let date1 = new Date(g1.date_of_release), date2 = new Date(g2.date_of_release);
          return date2 - date1;
        });
      } else if (value === 'cost') {
        text = 'По цене';
        this.games.sort((g1, g2) => {
          let getCost = (g) => {
            let discount = parseInt(g.game_costs[0].discount);
            let cost = parseFloat(g.game_costs[0].cost);
            return isNaN(discount) ? cost : (cost * (1 - discount / 100));
          }
          return getCost(g1) - getCost(g2);
        });
      }
      this.sorter = text;
    }
  },
  async mounted() {
    let id = 3;
    let games = await request('/api/select/games');
    let library = await request('/api/select/library', 'POST', {id: id});
    let wishlist = await request('/api/select/wishlist', 'POST', {id: id});
    this.games = games;
    this.library = library;
    this.wishlist = wishlist;
  }
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