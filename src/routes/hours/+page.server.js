import { PUBLIC_GM_API_KEY, PUBLIC_DD_API_KEY } from "$env/static/public";

export const load = ({ fetch, url }) => {
  
  const fetchHours = async () => {
    const searchParams = new URLSearchParams(url.search);
    const placeId = searchParams.get("place_id") || "ChIJu8u_gHVhK4gREY8XyWcrJ8k";
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PUBLIC_GM_API_KEY}&fields=current_opening_hours`);

      if (!res.ok) {
        const error = new Error(`Request failed with status code ${res.status}`);
        error.response = res;
        throw error;
      }

      const data = await res.json();
    //   console.log('ssr');
    //   console.log(data.result.opening_hours);
    //   console.log('end ssr');

      return data.result.current_opening_hours;
    } catch (error) {
      // Log the error to DataDog
      const datadogApiKey = `${PUBLIC_DD_API_KEY}`;
      const datadogEndpoint = 'https://api.datadoghq.com/api/v1/events';
    //   const datadogTags = ['app:sdm-ssr', 'env:production'];

      const logPayload = {
        title: "Error fetching data from Coda API",
        text: error.message,
        aggregationKey: "",
        alert_type: "error",
        deviceName: "",
        host: "",
        priority: "normal",
        source: `${placeId}`,
        tags: [
          `environment:prod`,
          "app:SDM FOP",
          "service:Custom",
          `version:${placeId}`,
          "event:fetchData",
          `tag:'hoursPage-'${placeId}`,
      ],
      };

      await fetch(datadogEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': datadogApiKey,
        },
        body: JSON.stringify(logPayload),
      });

      throw error;
    }
  };

  return {
    hours: fetchHours(),
  };
};
