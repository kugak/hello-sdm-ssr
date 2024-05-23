<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from "$app/stores";
  import pharmaPlus from "../../images/pharma-plus.png";

  // URL Params
  const showClock = $page.url.searchParams.get("showClock") || "false";

  export let data;
  let services = [];
  let { hasClock, localization } = data.supabaseContent;
  console.log('Clock? ' + hasClock);
  console.log('Localization Data:');
  console.log(localization);

  services = data.services;


  let error = null;
  let currentTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  let timeParts = currentTime.split(" "); // Split the time string by space
  let time = timeParts[0]; // Extract the time without AM/PM
  let amPm = timeParts[1]; // Extract the AM/PM designation
  let timeInterval = null; // Declare a variable to store the interval reference

  const updateTime = () => {
    // Update the time variables with the current time
    let currentTime = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    let timeParts = currentTime.split(" "); // Split the time string by space
    time = timeParts[0]; // Assign the value to the time variable
    amPm = timeParts[1].toUpperCase().replace(/\./g, ""); // Convert to uppercase and remove periods
  };
  
  onMount(() => {
    updateTime(); // Update the time initially

    // Update the time every second
    timeInterval = setInterval(() => {
      updateTime();
    }, 1000); // Update every second (1000ms)
  });

  // Clean up the interval when the component is destroyed
  onDestroy(() => {
    clearInterval(timeInterval);
  });

</script>

<section class="pharmacy pharmacy__service">
  <div class="ph__container">
    <div class="ph__wrapper">
      <div class="ph__top-title">
        <h3 class="ph__subtitle">Pharmacy</h3>
        <h2 class="ph__title">Care Clinic</h2>
      </div>
      <div class="services-list">
        {#if services.length > 0}
          <!-- Display the fetched data with fade-in effect -->
          {#each services as service}
            <p>{service.name}</p>
          {/each}
        {:else if error !== null}
          <!-- Display error message -->
          <p>Error fetching data: {error.message}</p>
        {:else}
          <!-- Display loading message or spinner -->
          <p />
        {/if}
      </div>

      <div class="pharma_logo">
        <img src={pharmaPlus} alt="logo" />
      </div>
    </div>
  </div>

  <!-- Time -->
  <div class="service__date">
    <div id="time">
      {#if hasClock == "true"}
      <span>{time}</span>
      <span class="ampm">{amPm}</span>
      {/if}

    </div>

  </div>
</section>

<style>
  @font-face {
    font-family: 'GT Eesti Pro Display';
    src: url("/fonts/GTEestiProDisplay-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

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
  }

  .pharmacy {
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    /* background: #1b4655; */
    max-height: 1920px;
    height: 100vh;
    min-height: 1480px;
  }

  .pharmacy__service {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-height: 100vh;
  }

  .ph__container {
    max-width: 870px;
    margin: 0 auto;
    padding: 0px 20px;
    height: 1700px;
  }

  .ph__wrapper p {
    font-size: 2.7rem;
    letter-spacing: 1px;
    line-height: 90px;
    color: #fff;
    font-weight: 300;
    text-align: center;
    /* padding: 30px 20px; */
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .ph__top-title {
    position: relative;
  }

  .ph__subtitle {
    margin: 0;
    padding: 0;
    text-align: center;
    /* -webkit-transform: translate(-122px, 187px);
    -ms-transform: translate(-122px, 187px); */
    transform: translate(-115px, 170px);
    font-size: 3.5rem;
    font-weight: 100;
  }

  .ph__title {
    font-size: 9.2rem;
    font-weight: 100;
    margin-bottom: 1rem;
  }

  .services-list {
    height: 950px;
    height: 950px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "GT Eesti Pro Display Light";
  }

  .service__date {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    column-gap: 20px;
  }

  .pharma_logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #time {
    background-image: url("../../images/bean-blue.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 550px;
    height: 400px;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    bottom: 0;
    right: 0;
    padding-right: 50px;
    padding-bottom: 80px;
    font-size: 3rem;
    color: #333;
    transition: transform 0.5s;
  }

  #time,
  #time span {
    font-size: 6.2rem;
    color: #1b4655;
  }
  #time span.ampm {
    font-size: 2.2rem;
    line-height: 72px;
    color: #1b4655;
  }
</style>
