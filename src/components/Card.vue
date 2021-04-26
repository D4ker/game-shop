<template>
  <div class="card shadow-sm">
    <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
         preserveAspectRatio="xMidYMid slice" focusable="false">
      <rect width="100%" height="100%" fill="#55595c">

      </rect>
      <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{card.name}}</text>
    </svg>

    <div class="card-body">
      <div>
        <h4>{{card.name}}</h4>
        <div class="cost-container">
          <div class="cost-name">Цена: </div>
          <div class="cost-money"
               v-bind:class="{'cost-old': card.discount > 0}">
            {{card.cost.toFixed(2)}}$
          </div>
          <div class="cost-money"
               v-if="card.discount > 0">
            {{costWithDiscount = (card.cost * (1 - card.discount / 100)).toFixed(2)}}$
          </div>
          <div class="cost-discount"
               v-if="card.discount > 0">
            {{card.discount}}%
          </div>
        </div>
      </div>
      <p class="card-text">{{card.description}}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-success"
                  v-bind:class="{'btn-outline-dark disabled': card.bought}"
                  @click.prevent="buyGame">{{card.bought ? 'Приобретено' : 'Купить'}}</button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-warning"
                  v-bind:class="{'btn-outline-dark disabled': card.wish}"
                  @click.prevent="wishGame">{{card.wish ? 'Уже в желаемом' : 'В желаемое'}}</button>
        </div>
        <small class="text-muted">{{card.year}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card'],
  data() {
    return {
      info: {
        name: 'Minecraft',
        cost: '124'
      },
      costWithDiscount: -1
    }
  },
  methods: {
    buyGame() {
      let cash = 130; // ЗДЕСЬ ДЕНЬГИ ***
      let cost = this.card.cost;
      let costWithDiscount = this.costWithDiscount;
      if (costWithDiscount !== -1 && cash > costWithDiscount) {
        this.card.bought = true;
        cash -= costWithDiscount;
      } else if (cash > costWithDiscount) {
        this.card.bought = true;
        cash -= cost;
      }
      // Здесь обновить БД ***
    },
    wishGame() {
      this.card.wish = true;
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

.card-body {
  height: 250px;
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