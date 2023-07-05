import { PUBLIC_DD_API_KEY, PUBLIC_GM_API_KEY } from "$env/static/public";

export const load = ({ fetch, url }) => {
  let cachedHours = null;
  let lastFetchTime = null;

  const fetchHours = async () => {
    const searchParams = new URLSearchParams(url.search);
    const placeId = searchParams.get("place_id") || "ChIJu8u_gHVhK4gREY8XyWcrJ8k";

    // Check if the cached hours are still valid (within 24 hours)
    if (cachedHours && lastFetchTime && Date.now() - lastFetchTime < 24 * 60 * 60 * 1000) {
      return cachedHours;
    }

    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PUBLIC_GM_API_KEY}&fields=current_opening_hours`);

      if (!res.ok) {
        const error = new Error(`Request failed with status code ${res.status}`);
        error.response = res;
        throw error;
      }

      const data = await res.json();
      const hours = data.result.current_opening_hours;

      // Cache the fetched hours and update the last fetch time
      cachedHours = hours;
      lastFetchTime = Date.now();

      return hours;
    } catch (error) {
      // Log the error to DataDog
      const datadogApiKey = `${PUBLIC_DD_API_KEY}`;
      const datadogEndpoint = 'https://api.datadoghq.com/api/v1/events';
      const logPayload = {
        title: "Error fetching data from Google Maps API",
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
