import Vue from 'vue';
import Vuex from 'vuex';
import placeList from '@/assets/place-list.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // view達
    views: [{ value: "chart", text: "地図" }, { value: "list", text: "リスト" }],
    // 現在表示しているview
    currentView: "chart",
    // 全ての場所データリストJSON
    placeList: placeList,
    // 表示する場所データリスト(default: placeList)
    displayingPlaceList: placeList,
    // ダイアログ表示する場所データ
    selectedPlace: [],
  },

  getters: {
    selectedPlace: (state) => state.selectedPlace,
    /*
    絞り込みfilter「エリア」
    */
    filterOfArea: (state) => (area) => {
      if (area == "tokyo") {
        return state.placeList.filter(place => place.id > 1000 && place.id < 1999);
      } else if (area == "osaka") {
        return state.placeList.filter(place => place.id > 2000 && place.id < 2999);
      } else if (area == "nagoya") {
        return state.placeList.filter(place => place.id > 3000 && place.id < 3999);
      }
    },
    /*
    絞り込みfilter「カテゴリー」
    */
    filterOfCategory: (state) => (category) => {
      return state.placeList.filter(item => item.placeCategory == category);
    },
    /*
    絞り込みfilter「メンバー」
    */
    filterOfMember: (state) => (member) => {
      return state.placeList.filter(item => item.members.includes(member));
    }
  },

  mutations: {
    /*
    クリックされた場所データのIDを受け取り、該当する場所データを探す関数
    selectedPlaceに代入
    */
    setSelectedPlace(state, id) {
      state.selectedPlace = state.placeList.find(data => data.id === id);
    },
    /*
    viewの切り替えをする関数
    HeaderCompから表示するviewを引数で受け取ってcurrentViewに代入
    */
    setCurrentView(state, view) {
      state.currentView = view;
    },
    /*
    絞り込み後の場所データリストを反映させる関数
    引数listで絞り込み後のデータリストを受け取り、displayingPlaceListに代入
    */
    setFilteredList(state, list) {
      state.displayingPlaceList = list;
    },
    /*
    絞り込み検索のリセット関数
    */
    resetFilter(state) {
      state.displayingPlaceList = state.placeList;
    }
  },

  actions: {
    /*
    絞り込み検索を行う本体関数
    選択された条件がある場合、filterに通す
    */
    executeFilter({ commit }, { area, category, member }) {
      let resultArr = this.state.placeList;

      // もし条件が選択されている場合（値がある場合）、filterを実行する
      // resultArrを上書きしていく
      if (area != null) {
        const resultAreaArr = this.getters.filterOfArea(area);
        resultArr = resultArr.filter(item => resultAreaArr.includes(item));
      }
      if (category != null) {
        const resultCategoryArr = this.getters.filterOfCategory(category);
        resultArr = resultArr.filter(item => resultCategoryArr.includes(item));
      }
      if (member != null) {
        const resultMemberArr = this.getters.filterOfMember(member);
        resultArr = resultArr.filter(item => resultMemberArr.includes(item));
      }
      commit('setFilteredList', resultArr);
    },
  }
})
