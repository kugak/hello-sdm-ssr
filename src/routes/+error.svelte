<script>
  import pharmaPlus from "../images/pharma-plus.png";
</script>

<div class="container">
  <img src={pharmaPlus} alt="logo" />
</div>

<style>
  /* @font-face {
    font-family: "GT Eesti Pro Display";
    src: url("/fonts/GTEestiProDisplay-Regular.woff2") format("woff2");
    font-weight: unset;
    font-style: unset;
    font-display: swap;
    font-weight: 100;
  } */

  @font-face {
    font-family: 'GT Eesti Pro Display Light';
    src: url('/fonts/GTEestiProDisplay-Light.woff') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
  :root {
    --primary-font: "GT Eesti Pro Display";
  }
  :global(body) {
    background-color: #1b4655;
    height: 100%;
    margin: 0;
    color: #fff;
    font-family: "GT Eesti Pro Display";
    font-weight: 100;
    overflow: hidden;
  }
  .container {
    display: flex;
    align-items: center;
    align-content: space-around;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  }
</style>
