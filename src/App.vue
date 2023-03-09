<template>
  <v-app>
    <!-- header部分 -->
    <header-comp />

    <!-- main部分 -->
    <v-main class="pt-0">
        <template v-if="currentView == 'chart'">
            <chart-view/>
        </template>
        <template v-else-if="currentView == 'list'">
            <list-view/>
        </template>
    </v-main>
  </v-app>
</template>

<!-- script -------------------------------------------------------->
<script>
import HeaderComp from './components/HeaderComp.vue';
import ListView from './views/ListView.vue';
import ChartView from './views/ChartView.vue';

export default {
  name: 'App',
  components: {
    HeaderComp,
    ListView,
    ChartView
  },
  computed: {
    currentView() { return this.$store.state.currentView }
  }
};
</script>

<!-- style -------------------------------------------------------->
<style scoped>
</style>
