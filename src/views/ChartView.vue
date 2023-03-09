<template>
    <div>
		<div id="google-map" class="google-map" ref="googleMap">
            <!-- Google Map表示 -->
        </div>
        <v-dialog
        v-model="isDialog"
        max-width="850"
        class="mx-auto"
        >
        <place-dialog/>
        </v-dialog>
    </div>
  </template>

<!-- script -------------------------------------------------------->
<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import PlaceDialog from '@/components/PlaceDialogComp.vue';

export default {
    components: { PlaceDialog },
    data: () => {
        return {
            google: null,
            map: null,
            geocoder: null,
            marker: [],
            isDialog: false,
            iconImg: '/images/diamond-shadow.png',
            mapConfig: { /* 初期設定*/
                zoom: 14,
                center: {
                    lat: 35.6596043,
                    lng: 139.6987104
                },
                disableDefaultUI: true, /* コントローラー諸々非表示*/
                styles: [
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#bdbdbd"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f6fd"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "color": "#a3bef0"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#525252"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ededed"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dee7f7"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    }
                ]
            },
        }
    },
	computed: {
        displayingPlaceList: {
            get: function() {
                return this.$store.state.displayingPlaceList;
            },
            set: function(newDisplayingPlaceList) {
                this.$store.state.displayingPlaceList = newDisplayingPlaceList;
            }
        },
    },
    async mounted() {
        // GoogleMap APIの読み込み
        const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
        const googleMapApi = await GoogleMapsApiLoader({
        apiKey: apiKey
        });
        this.google = googleMapApi;

        this.initializeMap();
        this.createMarkers();
		
    },
    watch: {
        displayingPlaceList() {
            this.marker.forEach(function(i) { i.setMap(null) });
            this.createMarkers();
        }
    },
    methods: {
        initializeMap() {
            const mapContainer = document.getElementById('google-map');
            this.map = new this.google.maps.Map(
                mapContainer, this.mapConfig
        )},
        /*
        Markerを作成する関数
        */
        createMarkers() {
            // displayingPlaceListの要素数だけ繰り返し
            for (let i = 0; i < this.displayingPlaceList.length; i++) {
                // もしlatlngの値が無い場合、Markerを作成しない
                if( this.displayingPlaceList[i]['lat'] != null && this.displayingPlaceList[i]['lng'] != null ) {
                    const markerLatLng = new this.google.maps.LatLng({
                        // それぞれのlatlngを設定
                        lat: this.displayingPlaceList[i]['lat'],
                        lng: this.displayingPlaceList[i]['lng']
                    });
                    // Markerを作成する
                    this.marker[i] = new this.google.maps.Marker({
                        position: markerLatLng,
                        map: this.map,
                        icon: {
                            url: this.iconImg,
                            scaledSize: new this.google.maps.Size(40, 40),
                        }
                    });
                    // それぞれのMarkerに合った情報ウィンドウを作成するために必要情報を渡す
                    this.markerInfoWindow(this.marker[i],this.displayingPlaceList[i]['id'], this.displayingPlaceList[i]['placeName']);
                }
            }
        },
        /*
        Markerの情報ウィンドウを作成する関数
        */
        markerInfoWindow(marker,id, name) {
            let infoWindow = new this.google.maps.InfoWindow({
                content: `<v-card class="custom-info-window">
                        <v-list-item-title class="text-subtitle-1 font-weight-medium mx-1">${name}</v-list-item-title>
                        </v-card>`,
            });
            this.google.maps.event.addListener(marker, 'mouseover', () => {
                infoWindow.open(this.map, marker);
            });
            this.google.maps.event.addListener(marker, 'mouseout', () => {
                infoWindow.close();
            });
            this.google.maps.event.addListener(marker, 'click', () => {
                this.isDialog = true;
                this.setSelectedPlaceID(id);
            });
        },
        /*
        storeのsetSelectedPlace()を呼び出して、クリックされた場所データのIDを渡す関数
        */
        setSelectedPlaceID(id) {
            this.$store.commit('setSelectedPlace', id);
        }
    }
}
</script>

<!-- style -------------------------------------------------------->
<style lang="scss" scoped>
.google-map {
  width: 100vw;
  height: 100vh;
}

</style>