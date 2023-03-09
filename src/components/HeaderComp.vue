<template>
    <div>
        <v-app-bar
            class="app-header"
            app
            elevation="4"
            extended
            extension-height="80"
            color="#92a8d0"
        >
            <img class="site-logo" src="/images/svtlogo-simple.svg" />

            <v-spacer></v-spacer>

            <!-- mapとlistの切り替えbutton -->
            <v-btn-toggle
                v-model="currentView"
                :color="btnActiveColor"
                tile
                group
                mandatory
            >
                <v-btn
                    class="mx-2"
                    v-for="view in views"
                    :key="view.value"
                    :value="view.value"
                    @click="sendCurrentView(view.value)"
                >
                {{ view.text }}
                </v-btn>
            </v-btn-toggle>

            <!-- 絞り込み検索のヘッダー部分 -->
            <template v-slot:extension>
                <filtering-bar-comp/>
            </template>
        </v-app-bar>
    </div>
</template>

<!-- script -------------------------------------------------------->
<script>
import FilteringBarComp from './FilteringBarComp.vue';

export default {
    components: {
        FilteringBarComp
    },
    data: () => ({
        btnActiveColor: "white"
    }),
    computed: {
        views() { return this.$store.state.views },
        currentView: {
            get: function() {
                return this.$store.state.currentView;
            },
            set: function(newView) {
                this.$store.state.currentView = newView;
            }
        },
    },
    methods: {
        sendCurrentView(view) {
            this.$store.commit('setCurrentView', view);
        }
    }
}
</script>

<!-- style -------------------------------------------------------->
<style lang="scss" scoped>
.site-logo {
    width:auto;
    height: 100%;
}

.app-header {
    background: linear-gradient(170deg,#f7caca,#f4d7d7, #a4b8dc, #93a9d1);
}

</style>
