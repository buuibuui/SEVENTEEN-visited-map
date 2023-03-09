<template>
    <v-form
        ref="form"
        class="form-container d-flex flex-column flex-md-row justify-md-space-between"
    >
        <div class="d-flex">
            <v-select
                class="select-area mx-2"
                v-model="selectedArea"
                :items="area"
                item-text="label"
                item_value="value"
                label="AREA"
                hint="エリアを選んでください"
                persistent-hint
            ></v-select>
            <v-select
                class="select-category mx-2"
                v-model="selectedCategory"
                :items="category"
                item-text="label"
                item_value="value"
                label="CATEGORY"
                hint="施設の種類を選んでください"
                persistent-hint
            ></v-select>
            <v-select
                class="select-member mx-2"
                v-model="selectedMember"
                :items="members"
                label="MEMBER"
                hint="メンバーを選んでください"
                persistent-hint
            ></v-select>
        </div>

        <div class="d-flex align-center">
            <v-btn
            outlined
            color="white"
            @click="filterPlaceList()"
            >絞り込む</v-btn>

            <v-btn
            class="ml-2"
            outlined
            color="white"
            @click="resetPlacesList()"
            >リセット</v-btn>

            <div
            class="result-text mx-3"
            >
                検索結果：{{ $store.state.displayingPlaceList.length }}件
            </div>
        </div>
    </v-form>
</template>

<!-- script -------------------------------------------------------->
<script>

export default {
    data: () => ({
        //絞り込み検索の項目リスト（メンバー）
        members: [
            "S.Coups",
            "Jeonghan",
            "Joshua",
            "Jun",
            "Hoshi",
            "Wonwoo",
            "Woozi",
            "The8",
            "Mingyu",
            "Dokyeom",
            "Seungkwan",
            "Vernon",
            "Dino"
        ],
        //絞り込み検索の項目リスト（場所）
        area: [
            { label: "東京エリア", value: "tokyo" },
            { label: "大阪エリア", value: "osaka" },
            { label: "名古屋エリア", value: "nagoya" }
        ],
        //絞り込み検索の項目リスト（施設分類）
        category: [
            { label: "道端", value: "roadside" },
            { label: "飲食店", value: "restaurant" },
            { label: "美術館", value: "museum" },
            { label: "公園", value: "park" },
            { label: "山", value: "mountain" },
            { label: "その他店", value: "others" },
        ],
        filteredList: [],
        selectedArea: null,
        selectedCategory: null,  
        selectedMember: null,
    }),
    computed: {
        placeList() { return this.$store.state.placeList },
    },
    methods: {
        /*
        絞り込み検索の本体関数を呼び出す関数
        storeのexcuteFilter関数を呼び出して、選択された条件をobjで渡す
        */
        filterPlaceList() {
            this.$store.dispatch('executeFilter', {
                area: this.selectedArea,
                category: this.selectedCategory,
                member: this.selectedMember
            })
        },
        /*
        絞り込み検索の条件をリセットする関数
        */
        resetPlacesList() {
            this.$refs.form.reset();
            this.$store.commit('resetFilter');
        }
    }
}
</script>

<style lang="scss" scoped>
.form-container {
    width: 100%;
}
.select {
    &-area, &-caregory, &-member {
        & > input {
            cursor: pointer;
        }
    }
}

.v-input {
    max-width: 200px;
}

.result-text {
    color: white;
}
</style>
