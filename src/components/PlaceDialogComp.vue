<template>
    <v-card
	class="pa-6"
	>
		<v-row
		class="d-flex justify-space-around align-center mx-0 my-3"
		>
			<v-col
				cols="5"
				class="pl-2"
			>
				<!-- 場所名 -->
				<v-card-title
					class="text-h5 font-weight-bold"
				>
				{{ selectedPlace.placeName }}
				</v-card-title>

				<!-- 区切り線 -->
				<v-divider class="ma-4"></v-divider>

				<!-- 画像引用 -->
				<p class="ml-4 caption">画像引用：{{ selectedPlace.image.imageRef }}</p>

				<!-- 住所 -->
				<p class="my-3 ml-4 subtitle-2">
					<v-icon color="#93a9d1">mdi-map-marker</v-icon>
					{{ selectedPlace.address }}
				</p>

				<!-- 訪れたメンバーのタイトル -->
				<p class="my-3 ml-4 subtitle-2">
					<v-icon color="#93a9d1">mdi-account</v-icon>
					訪れたメンバー
				</p>
				<!-- 訪れたメンバーのリスト -->
				<ul class="ml-4">
					<li
						class="text-uppercase mb-1"
						v-for="member in selectedPlace.members"
						:key="`${ selectedPlace.id }-${ member }`"
					>
					{{ member }}
					</li>
				</ul>
			</v-col>

			<v-col
				cols="7"
				class="pa-3"
			>
				<v-img
					:src="`${selectedPlace.image.imageSrc ? `${selectedPlace.image.imageSrc}` : noImage}`"
				></v-img>
			</v-col>
		</v-row>
		<!-- 注意書き -->
		<v-alert
			outlined
			dense
			color="orange"
			icon="mdi-alert"
		>
		一般の方も利用する場所です。<strong>施設のルール・公共マナーをを守って</strong>楽しく巡りましょう。
    </v-alert>
    </v-card>
</template>

<!-- script -------------------------------------------------------->
<script>
export default {
	computed: {
		// placeList() { return this.$store.getters.placeList },
		selectedPlace() { return this.$store.getters.selectedPlace },
	},
	data: () => ({
        noImage: '/images/no-image.jpeg',
    })
}
</script>

<style scoped>
ul {
	list-style-type: none;
}
</style>
