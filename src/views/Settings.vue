<template>
  <div>
    <div>Settings</div>
    <div v-if="loading"
         class="d-flex justify-content-center">
      <Loader/>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: 'Settings',
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