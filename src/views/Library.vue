<template>
  <main>
    <section class="py-3 text-left">
      <div class="container">
        <h1 class="fw-light">Библиотека</h1>
        <div class="sorter">
          <p class="sorter-name">Сортировать: </p>
          <a class="nav-link dropdown-toggle" id="sorterDropdown" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            {{sorter}}
          </a>
          <ul class="dropdown-menu" aria-labelledby="sorterDropdown">
            <li><a class="dropdown-item" @click="sortedCards('name')">По названию</a></li>
            <li><a class="dropdown-item" @click="sortedCards('date')">По дате</a></li>
          </ul>
        </div>
      </div>
    </section>

    <div v-if="loading"
         class="d-flex justify-content-center">
      <Loader />
    </div>

    <div class="album py-5 bg-light"
         v-else-if="games.length">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="game in games" :key="game.id">

            <Card
                v-bind:game="game"
                v-bind:game_cost="null"
                v-bind:boughtOut="null"
                v-bind:wishOut="null"
                v-bind:state="'library'"
            />

          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>В библиотеке пока нет игр.</div>
    <Pagination />
  </main>
</template>

<script>
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import { request } from '@/frontend'
import Loader from "@/components/Loader";

export default {
  name: 'Library',
  components: {
    Card,
    Pagination,
    Loader
  },
  data() {
    return {
      games: [],
      sorter: 'Не выбрано',
      loading: true
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
      }
      this.sorter = text;
    }
  },
  async mounted() {
    let games = await request('/api/select/library', 'POST');
    this.games = await games.json();
    this.loading = false;
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