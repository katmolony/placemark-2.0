<script lang="ts">
    import SignupForm from "./SignupForm.svelte";
  </script>
  
  <section class="hero is-fullheight is-default is-bold" style="background-image: url('/signUpPage.jpg'); background-size: cover; background-position: center;">
    <div class="hero-head"></div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h1 class="title has-text-centered">Signup to Donation</h1>
            <div class="box">
              <SignupForm></SignupForm>
              <p class="has-text-centered">Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a></p>
            </div>
          </div>
          <div class="column is-6 is-offset-1">
            <!-- You can remove the <figure> and <img> tags -->
          </div>
        </div>
      </div>
    </div>
  </section>