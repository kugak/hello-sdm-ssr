<script>
    import { onMount, onDestroy, tick } from 'svelte';
    import { page } from "$app/stores";
    import careImg from "../../images/care.png";
    import appImg from "../../images/app.png";
    import pharmacyImg from "../../images/pharmacy.png";
    import onlineImg from "../../images/online.png";
    import qrImg from "../../images/qr-code.png";

  
    // URL Params
    const showClock = $page.url.searchParams.get("showClock") || "false";
    //console.log(showClock);
    
    let time = ''; // Declare the time variable
    let amPm = ''; // Declare the amPm variable
    let timeInterval = null; // Declare a variable to store the interval reference

    let clockDiv; // Declare the clockDiv variable to store the DOM element

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
    updateTime();

    // update time every 2 secs
    timeInterval = setInterval(() => {
      updateTime();
    }, 2000);
  });

  onDestroy(() => {
    clearInterval(timeInterval);
  });
  
  </script>
  
  <section class="pharmacy pharmacy__service">
    <div class="ph__container">
      <div class="ph__wrapper">
        <div class="ph__top-title">
          <h2 class="ph__title"><span class="text-white">Let us</span><br>help you</h2>
          <p class="sub-title text-white">Book an appointment</p>
        </div>
        <div class="main-wrapper">
            <div class="container">
                <div class="left-column">
                  <div class="icon"><img src={careImg} alt="Care Icon"></div>
                </div>
                <div class="right-column item-text">
                  <p>See our Care Concierge</p>
                </div>
              </div>
              <div class="container">
                <div class="left-column">
                  <div class="icon"><img src={pharmacyImg} alt="Pharmacy Icon"></div>
                </div>
                <div class="right-column item-text">
                  <p>Ask at the prescription counter</p>
                </div>
              </div>
              <div class="container">
                <div class="left-column">
                  <div class="icon"><img src={appImg} alt="App Icon"></div>
                </div>
                <div class="right-column item-text">
                  <p>Book on the PC Health<sup class="tm">TM</sup> app</p>
                </div>
              </div>
              <div class="container">
                <div class="left-column">
                  <div class="icon last-item"><img src={onlineImg} alt="Online Icon"></div>
                </div>
                <div class="right-column item-text">
                  <p>Book at shoppersdrugmart.ca/<br>pharmacistclinic</p>
                </div>
              </div>
    
        </div>
        

      </div>
    </div>
       <!-- QR -->
       <!-- <div class="qr_code">
        <img src={qrImg} alt="Online Icon">
      </div> -->
  </section>

 
  
  <!-- Time -->
  <div class="service__date">
    <div class="qr-code"></div>
    {#if showClock == "true"}
      <div id="time" bind:this="{clockDiv}">
        <span>{time}</span>
        <span class="ampm">{amPm}</span>
      </div>
    {/if}
  </div>
  <style>

    .text-white {
        color: #fff;
    }

    .main-wrapper {
    color: #fff;
    font-size: 2.7rem;
}

        .container {
      display: flex;
      width: 700px;
    }

    .left-column {
      display: flex;
      align-items: center;
    }

    .right-column {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
    }

    .icon {
      width: 65px; /* Adjust the width of the icon as needed */
      height: 65px; /* Adjust the height of the icon as needed */
      margin-right: 50px; /* Adjust the spacing between the icon and text as needed */
    }
    p.sub-title {
    text-align: center;
    font-size: 4rem;
    font-weight: 100;
    font-family: 'GT Eesti Pro Display Light';
}

sup.tm{
    font-size: 20px;
}

.last-item {
    margin-top: -0.9em;
}

.qr_code {
    left: -8vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    justify-content: flex-end;
    padding-bottom: 105px;
}

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
      color: #62B5E5;
      font-family: "GT Eesti Pro Display";
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item-text {
      font-family: "GT Eesti Pro Display Light";

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
  
    .ph__top-title {
      position: relative;
    }
  
    .ph__title {
      font-size: 11.2rem;
      font-weight: 100;
      margin-bottom: 4rem;
      line-height: .86;
      color: #62B5E5;
      text-align: center;
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
  
