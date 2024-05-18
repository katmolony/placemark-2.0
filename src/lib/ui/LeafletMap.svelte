<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";

  import { browser } from "$app/environment";

  export let id = "home-map-id";
  export let height = 60;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";

  let imap: LeafletMap;
  let baseLayers: any;

  let locationLayer: any;
  let businessLayer: any;

  const locationIconFA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#525dff" d="M112 316.9v156.7l22 33c4.8 7.1 15.2 7.1 20 0L176 473.6V316.9c-10.4 1.9-21.1 3.1-32 3.1s-21.6-1.1-32-3.1zM144 0C64.5 0 0 64.5 0 144s64.5 144 144 144 144-64.5 144-144S223.5 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.6-5.4 12-12 12s-12-5.4-12-12c0-50.7 41.3-92 92-92 6.6 0 12 5.4 12 12s-5.4 12-12 12z"/></svg>`;
  const businessIconFA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#B197FC" d="M298 214.3L285.8 96H328c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v48c0 13.3 10.7 24 24 24h42.2L86 214.3C37.5 236.8 0 277.3 0 328c0 13.3 10.7 24 24 24h136v104c0 1.2 .3 2.5 .8 3.6l24 48c2.9 5.9 11.4 5.9 14.3 0l24-48a8 8 0 0 0 .8-3.6V352h136c13.3 0 24-10.7 24-24 0-51.2-38-91.4-86-113.7z"/></svg>`;

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");
      baseLayers = {
        Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        Satellite: leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        })
      };
      let defaultLayer = baseLayers[activeLayer];
      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });

      locationLayer = leaflet.layerGroup().addTo(imap);
      businessLayer = leaflet.layerGroup().addTo(imap);

      // Add layers
      leaflet.control
        .layers(baseLayers, {
          Locations: locationLayer,
          Businesses: businessLayer
        })
        .addTo(imap);

      // Remove when layers switched off
      locationLayer.off("remove", function () {
        locationLayer.clearLayers();
      });
      businessLayer.off("remove", function () {
        businessLayer.clearLayers();
      });
    }
  });

  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    const marker = leaflet.marker([lat, lng]);
    marker.addTo(imap);
    const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }

  export async function addLocationMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    const locationIcon = leaflet.divIcon({
      html: locationIconFA,
      iconSize: [32, 32],
      className: "location-icon"
    });
    const locationMarker = leaflet.marker([lat, lng], { icon: locationIcon }).addTo(locationLayer); // Use location icon
    //  const marker = leaflet.marker([lat, lng], { icon: locationIcon }).addTo(locationLayer);
    const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    locationMarker.bindPopup(popup);
  }

  export async function addBusinessMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    const businessIcon = leaflet.divIcon({
      html: businessIconFA,
      iconSize: [32, 32],
      className: "business-icon"
    });
    const businessMarker = leaflet.marker([lat, lng], { icon: businessIcon }).addTo(businessLayer); // Use business icon
    const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    businessMarker.bindPopup(popup);
  }

  export function moveTo(lat: number, lng: number) {
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

{#if browser}
  <div {id} class="box" style="height: {height}vh" />
{:else}
  <div style="height: {height}px; background-color: #eaeaea;"></div>
{/if}
