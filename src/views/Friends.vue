<template>
  <div>
    <div>Friends</div>
    <div v-if="loading"
         class="d-flex justify-content-center">
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: 'Friends',
  components: {
    Loader
  },
  data() {
    return {
      loading: true
    }
  },
}
</script>

<style scoped>

</style>