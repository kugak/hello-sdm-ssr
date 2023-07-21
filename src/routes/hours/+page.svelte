<script>
    import { onMount, onDestroy } from 'svelte';
    import { page } from "$app/stores";
  
    // URL Params
    const showClock = $page.url.searchParams.get("showClock") || "false";
    //console.log(showClock);
  
    export let data;
    let hours = data.hours;
    // let openNow = data.hours.open_now;
  
    let hoursArray = [];
    let time = ''; // Declare the time variable
    let amPm = ''; // Declare the amPm variable
    let timeInterval = null; // Declare a variable to store the interval reference

    let clockDiv; // Declare the clockDiv variable to store the DOM element    
  
    const updateTime = () => {
      let currentTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

    let timeParts = currentTime.split(" ");
    time = timeParts[0];
    amPm = timeParts[1];

    //console.log("Updated time:", currentTime);
  };    

    onMount(() => {
      updateTime();
      timeInterval = setInterval(() => {
        updateTime();
      }, 10000);

      hoursArray = hours.weekday_text.map(item => {
        const [day, timeRange] = item.split(': ');
        let start, end;
  
        if (timeRange === 'Open 24 hours') {
          start = 'Open 24 hours';
          end = '';
        } else {
          [start, end] = timeRange.split('–').map(time => time.replace(/\s+/g, ''));
        }
  
        const formattedStartTime = start === '12:00AM' ? 'Midnight' : start.toLowerCase();
        const formattedEndTime = end === '12:00AM' ? 'Midnight' : end.toLowerCase();
  
        return {
          day: day.trim().slice(0, 3).toUpperCase(),
          start: formattedStartTime,
          end: formattedEndTime
        };
      });
  
      let currentTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
  
      let timeParts = currentTime.split(" "); // Split the time string by space
      time = timeParts[0]; // Assign the value to the time variable
      amPm = timeParts[1]; // Assign the value to the amPm variable
    });
  
    const getDayOfWeek = (day) => {
      const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      return daysOfWeek[day];
    };

      onDestroy(() => {
    clearInterval(timeInterval);
  });
  
    let error = null;
  
  </script>
  
  {#if hoursArray.length > 0}
  <section class="pharmacy pharmacy__service">
    <div class="ph__container">
      <div class="ph__wrapper">
        <div class="ph__top-title">
          <h2 class="ph__title">Store <span class="text-white">&</span> Pharmacy Hours</h2>
        </div>
        <div class="container">
          <div class="store-hours">
            {#each hoursArray as { day, start, end }}
            <div class="day {day === getDayOfWeek(new Date().getDay()) ? 'today' : ''}">
              <span>{day}</span>
              <span>{start} {#if end} - {end} {/if}</span>
            </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>
  {:else}
  <p></p>
  {/if}
  
 <!-- Time -->
 <div class="service__date">
  <div class="qr-code"></div>
  <div id="time">
    {#if showClock == "true"}
    <span>{time}</span>
    <span class="ampm">{amPm}</span>
    {/if}
  </div>
</div>
  <style>
    
        .container {
      display: flex;
      justify-content: center;
      font-size: 3rem;
    }
        .store-hours {
      display: flex;
      flex-direction: column;
      gap: 25px;
      width: 600px;
      color: #62b5e5;
      font-family: 'GT Eesti Pro Display Light';


    }

    .store-hours .day {
      display: flex;
      justify-content: space-between;
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

    .day.today, .text-white {
    color: white;
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
  