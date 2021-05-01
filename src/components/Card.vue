<template>
  <div class="card shadow-sm">
    <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
         preserveAspectRatio="xMidYMid slice" focusable="false">
      <rect width="100%" height="100%" fill="#55595c">

      </rect>
      <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{game.name}}</text>
    </svg>

    <div class="card-body">
      <div>
        <h4>{{game.name}}</h4>
        <div v-if="bought !== null"
            class="cost-container">
          <div class="cost-name">Цена: </div>
          <div class="cost-money"
               v-bind:class="{'cost-old': parseInt(game_cost.discount) > 0}">
            {{parseFloat(game_cost.cost).toFixed(2)}}$
          </div>
          <div class="cost-money"
               v-if="parseInt(game_cost.discount) > 0">
            {{costWithDiscount = (parseFloat(game_cost.cost) * (1 - parseInt(game_cost.discount) / 100)).toFixed(2)}}$
          </div>
          <div class="cost-discount"
               v-if="parseInt(game_cost.discount) > 0">
            {{parseInt(game_cost.discount)}}%
          </div>
        </div>
      </div>
      <p class="card-text">{{game.description}}</p>
      <div v-if="bought !== null"
           class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-success"
                  v-bind:class="{'btn-outline-dark disabled': bought}"
                  @click.prevent="buyGame">{{bought ? 'Приобретено' : 'Купить'}}</button>
        </div>
      </div>
      <div v-if="wish !== null"
           class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-warning"
                  v-bind:class="{'btn-outline-dark disabled': wish}"
                  @click.prevent="wishGame">{{wish ? 'Уже в желаемом' : 'В желаемое'}}</button>
        </div>
      </div>
      <div v-if="bought === null"
           class="cost-money">Приобретено</div>
      <small class=" d-flex justify-content-end text-muted">{{game.date_of_release}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['game', 'game_cost', 'boughtOut', 'wishOut'],
  data() {
    return {
      costWithDiscount: -1,
      bought: this.boughtOut,
      wish: this.wishOut
    }
  },
  methods: {
    buyGame() {
      let cash = 600; // ЗДЕСЬ ДЕНЬГИ ***
      let cost = parseFloat(this.game_cost.cost);
      let costWithDiscount = this.costWithDiscount;
      if (costWithDiscount !== -1) {
        if (cash >= costWithDiscount) {
          this.bought = true;
          cash -= costWithDiscount;
        }
      } else if (cash >= cost) {
        this.bought = true;
        cash -= cost;
      }
      // Здесь обновить БД ***
    },
    wishGame() {
      this.wish = true;
      // Здесь обновить БД ***
    }
  }
}
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  user-select: none;
}

.card-text {
  margin: 0;
  overflow: hidden;
  height: 72px;
  text-overflow: ellipsis;
}

.cost-container {
  flex-wrap: nowrap;
}

.cost-name {
  display: inline-block;
}

.cost-money {
  display: inline-block;
  font-size: 1.2rem;
  color: olivedrab;
  margin-left: 5px;
}

.cost-old {
  text-decoration: line-through;
  color: #777767;
}

.cost-discount {
  display: inline-block;
  font-size: 1.4rem;
  color: #bf164c;
  margin-left: 5px;
}

.btn {
  margin-top: 5px;
}
</style>