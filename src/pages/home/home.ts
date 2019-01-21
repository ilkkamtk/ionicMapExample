import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') element;

  latitude = 61.1701138;
  longitude = 21.7553787;

  constructor(
    public plt: Platform,
    public navCtrl: NavController, public geolocation: Geolocation) {

  }

  initMap() {

    let map: GoogleMap = GoogleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let coordinates: LatLng = new LatLng(this.latitude, this.longitude);

      let position = {
        target: coordinates,
        zoom: 17,
      };

      map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: coordinates,
        title: 'My Location',
      };

      const marker = map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition({ timeout: 30000 }).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.initMap();
      }).catch((error) => {
        console.log('Error getting location', JSON.stringify(error));
        this.initMap();
      });

    });
  }

}
