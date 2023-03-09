<template>
    <v-container class="list-container mb-5">
        <v-row
        v-if="displayingPlaceList.length == 0"
        >
            <v-col
            cols="12"
            class="d-flex flex-column align-center justify-center"
            >
                <v-img
                width="40%"
                :src=noResult
                ></v-img>
                <p class="text-h5 text-center mt-3">検索した条件に当てはまる場所が見つかりませんでした…</p>
            </v-col>
        </v-row>
        <v-row v-else dense>
            <!-- ↓card↓ -->
            <v-col
            v-for="place in displayingPlaceList"
            :key="place.id"
            cols="4"
            >
            <transition name="card">
                <v-card
                v-show="isShowCard"
                :placeData="place"
                @click.stop="cardOpen(place.id)"
                >
                    <v-img
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.4)"
                    :src="`${place.image.imageSrc ? `${place.image.imageSrc}` : noImage}`"
                    >
                        <v-card-title
                        class="text-subtitle-1 font-weight-medium"
                        >{{ place.placeName }}</v-card-title>
                        <v-card-text
                        class="text-caption"
                        >画像引用：{{ place.image.imageRef }}</v-card-text>
                    </v-img>
                </v-card>
            </transition>
            </v-col>

            <!-- ↓dialog↓ -->
            <v-dialog
            v-model="isDialog"
            max-width="850"
            class="mx-auto"
            >
            <place-dialog/>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<!-- script -------------------------------------------------------->
<script>
import PlaceDialog from '@/components/PlaceDialogComp.vue';

export default {
    components: { PlaceDialog },
    data: () => ({
        isShowCard: false,
        isDialog: false,
        noImage: '/images/no-image.jpeg',
        noResult: '/images/no-result.jpg'
    }),
    computed: {
        displayingPlaceList() { return this.$store.state.displayingPlaceList },
    },
    mounted() {
        this.isShowCard = true;
    },
    methods: {
        // クリックを感知する
        cardOpen(id) {
            this.isDialog = true;
            this.setSelectedPlaceID(id);
        },
        // クリックしたデータIDをstoreにあるsetSelectedPlace()に渡す
        setSelectedPlaceID(id) {
            this.$store.commit('setSelectedPlace', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    max-width: 950px;
    padding-top: 200px;
}

.card {
    &-enter {
        opacity: 0;
        transform: translateY(20px);
    }
    &-enter-active {
        transition: all 1s;
    }
}
</style>

