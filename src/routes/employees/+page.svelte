<script>
  import beanBlue from "../../images/blue-bean-employees.png";
  import pharmaPlusOutline from "../../images/pharma-plus-outline.png";

  export let data;
  let employees = [];

  employees = data.employees;

  let pharmacyOwner = "";
  let pharmacyOwnerProfile = "";
  let pharmacyOwnerName = "";
  let pharmacyOwnerTitle = "";
  let pharmacistsList = [];
  let pharmacyTeam = [];
  let error = null;

  pharmacyOwner = employees.filter(
    (employee) =>
      employee.values &&
      employee.values.Classification === "```Pharmacy Owner```"
  );
  pharmacyOwner = pharmacyOwner[0].values;
  pharmacyOwnerProfile = pharmacyOwner.Image[0].url;
  pharmacyOwnerName = formatText(pharmacyOwner.Name);
  pharmacyOwnerTitle = formatText(pharmacyOwner.Title);
  console.log(pharmacyOwnerTitle);

  function formatText(input) {
    if (input.startsWith("```") && input.endsWith("```")) {
      return input.slice(3, -3);
    } else {
      return input;
    }
  }

  pharmacistsList = employees
    .filter(
      (employee) =>
        employee.values && employee.values.Classification === "```Pharmacist```"
    )
    .sort((a, b) => a.index - b.index);

  pharmacyTeam = employees
    .filter(
      (employee) =>
        employee.values &&
        employee.values.Classification === "```Pharmacy Team```"
    )
    .sort((a, b) => a.index - b.index);
</script>

<section class="pharmacy">
  <!-- top shape -->
  <div class="pharmacy__top-shape">
    <img src={beanBlue} alt="shape" />
  </div>
  <div class="ph__container">
    <div class="ph__header-content">
      <!-- Thumb -->
      <div class="ph__profile">
        <img src={pharmacyOwnerProfile} alt="Pharmacy Owner" />
      </div>
      <!-- Text -->
      <div class="ph__profile-text">
        {#if pharmacyOwnerTitle}
          <!-- Render this if pharmacyOwnerTitle has a value -->
          <h3>Pharmacist Owner</h3>
          <h2>{pharmacyOwnerName}</h2>
          <p class="credentials">{pharmacyOwnerTitle}</p>
        {:else}
          <!-- Render this if pharmacyOwnerTitle is empty -->
          <div class="no-owner-title-section">
            <h3>Pharmacist Owner</h3>
            <h2>{pharmacyOwnerName}</h2>
          </div>
        {/if}
      </div>
    </div>
    <!-- Pharmacist list -->
    <div class="pharmacist__list">
      <h2 class="list__title">Pharmacists:</h2>
      <!-- Separate rendering for pharmacists with titles -->
      {#if pharmacistsList.length > 0}
        <div class="pharmacist__container">
          {#each pharmacistsList as pharmacist}
            {#if pharmacist.values.Title}
              <div class="pharmacist__with-title">
                <div class="pharmacist__name">
                  {formatText(pharmacist.values.Name)}
                </div>
                <div class="pharmacist__credentials">
                  {#if formatText(pharmacist.values.Title)}
                    <!-- Check if Title has a value -->
                    <span class="credentials">
                      {formatText(pharmacist.values.Title)}
                    </span>
                  {/if}
                </div>
              </div>
            {/if}
          {/each}
          <div class="spacer"></div>
        </div>

        <div class="list__container">
          <!-- List of pharmacists without titles -->
          <div class="list__column">
            {#if pharmacistsList.length > 0}
              <!-- Display the fetched data -->
              {#each pharmacistsList as pharmacist}
                {#if !pharmacist.values.Title}
                  <div class="list__item">
                    {formatText(pharmacist.values.Name)}
                  </div>
                {/if}
              {/each}
            {:else if error !== null}
              <!-- Display error message -->
              <p>-</p>
            {:else}
              <!-- Display loading message or spinner -->
              <p>...</p>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Pharmacist team -->
    {#if pharmacyTeam.length > 0}
      <div class="pharmacist__team">
        <h2 class="list__title">Pharmacy Team:</h2>
        <div class="team__container">
          <!-- Display the fetched data -->
          {#each pharmacyTeam as team}
            <div class="team__member">
              {formatText(team.values.Name)}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- bottome shape -->
    <div class="pharmacy__bottom-shape">
      <img src={pharmaPlusOutline} alt="shape" />
    </div>
  </div>
</section>

<style>
  @font-face {
    font-family: "GT Eesti Pro Display";
    src: url("/fonts/GTEestiProDisplay-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "GT Eesti Pro Display Light";
    src: url("/fonts/GTEestiProDisplay-Light.woff") format("woff2");
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

  .pharmacy {
    padding-bottom: 250px;
  }

  .pharmacist__with-title {
    flex: 1 0 calc(45%);
    padding: 5px 20px 15px 0px;
    font-size: 2.7rem;
    font-family: "GT Eesti Pro Display Light";
    display: flex;
    flex-direction: column; /* Display the title below the name */
  }

  .pharmacist__name {
    font-size: 2.7rem;
    font-family: "GT Eesti Pro Display Light";
    margin-bottom: 5px;
  }

  .pharmacist__credentials {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: 100;
  }

  .ph__container {
    max-width: 870px;
    margin: 0 auto;
    padding: 0px 20px;
  }

  .ph__header-content {
    margin-top: -400px;
    position: relative;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 390px;
  }

  .ph__profile {
    min-width: 385px;
  }

  .ph__profile img {
    width: 385px;
    height: 385px;
    border-radius: 50%;
    border-top-right-radius: 260px;
    border-top-left-radius: 510px;
    border-bottom-left-radius: 260px;
    border-bottom-right-radius: 510px;
    background-size: cover;
    background-position: center;
  }

  .ph__profile-text {
    padding-left: 50px;
    font-weight: 100;
    line-height: 0;
  }
  .ph__profile-text h3 {
    font-size: 3rem;
    color: #62b5e5;
    font-weight: 100;
    /* padding-bottom: 2rem; */
  }
  .ph__profile-text > h2 {
    font-size: 3.7rem;
    color: #ffffff;
    font-weight: 100;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .ph__profile-text p {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: 100;
  }

  .list__item {
    flex: 0 0 calc(50% - 10px);
    padding: 5px 0px 15px 0;
    font-size: 2.7rem;
    font-family: "GT Eesti Pro Display Light";
  }

  .pharmacist__list,
  .pharmacist__team {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 40px;
    min-height: 450px;
  }

  .pharmacist__list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    min-height: 450px;
  }

  .pharmacist__container {
    display: flex;
    flex-wrap: wrap; /* Allow items to wrap to the next row */
    align-items: stretch;
    gap: 20px; /* Add a gap between the columns */
    margin-top: -10px;
    width: 100%;
  }

  .credentials {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: 100;
  }

  .spacer {
    height: 30px;
  }

  .list__title {
    font-size: 3rem;
    color: #62b5e5;
    margin-bottom: 30px;
    font-weight: 100;
    width: 100%;
  }

  .list__container {
    display: flex;
    width: 850px;
    flex-wrap: wrap; /* Create a two-column layout */
    gap: 20px;
    justify-content: flex-start; /* Align items to the top left */
    flex-direction: column;
  }

  .list__column {
    flex: 0 0 calc(50% - 10px);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pharmacist__team {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .team__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 800px;
  }

  .team__member {
    flex: 0 0 calc(29.33%);
    padding: 5px 0px;
    font-size: 2.7rem;
    font-family: "GT Eesti Pro Display Light";
  }

  .pharmacist__team {
    padding-top: 50px;
    padding-bottom: 220px;
  }
  .pharmacy__bottom-shape {
    position: absolute;
    bottom: 0;
    right: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 450px;
    max-width: 390px;
  }
</style>
