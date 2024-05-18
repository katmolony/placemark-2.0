<script lang="ts">
    import { currentSession } from "$lib/stores";
  </script>
  
  <nav class="navbar is-full-width">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/dashboard">
          <span class="icon mr-1"> <i class="fas fa-map-marker-alt"></i></span><span><strong>Placemark</strong>
            </span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="/dashboard"> Dashboard </a>
          <a class="navbar-item" href="/favourite"> Locations </a>
          <a class="navbar-item" href="/charts"> Charts </a>
          <a class="navbar-item" href="/maps"> Maps </a>
          <a class="navbar-item" href="/gallery"> Gallery </a>
          <a data-sveltekit-preload-data="tap" class="navbar-item" href="/logout"> Logout [{$currentSession?.name}]</a>
        </div>
        <div></div>
      </div>
    </div>
  </nav>