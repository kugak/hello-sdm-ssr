import { PUBLIC_DD_API_KEY, PUBLIC_GM_API_KEY, PUBLIC_SUPERBASE_URL, PUBLIC_SUPERBASE_KEY} from "$env/static/public";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(PUBLIC_SUPERBASE_URL, PUBLIC_SUPERBASE_KEY, {
  persistSession: false
});


export const load = ({ fetch, url }) => {

  const fetchHours = async () => {
    const searchParams = new URLSearchParams(url.search);
    const placeId = searchParams.get("place_id") || "ChIJu8u_gHVhK4gREY8XyWcrJ8k";
    try {

  
      console.log(`Fetching hours for placeId: ${placeId}`);
  
      const { data: cachedData, error: cacheError } = await supabase
        .from('storehours')
        .select('storeHours, created_at')
        .eq('placeID', placeId)
        .maybeSingle();

      if (cacheError) {
        console.error('Error fetching data from Supabase:', cacheError);
        throw cacheError;
      }
  
      const cachedHours = cachedData?.storeHours;
      const createdAt = cachedData?.created_at;
  
      if (cachedHours && createdAt && Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000) {
        console.log(`Using cached hours from ${createdAt}`);
        
        return cachedHours;
      }
  
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PUBLIC_GM_API_KEY}&fields=current_opening_hours`);
  
      if (!res.ok) {
        throw new Error(`Request failed with status code ${res.status}`);
      }
  
      const data = await res.json();
      const hours = data.result.current_opening_hours;
  
      const { error: deleteError } = await supabase
        .from('storehours')
        .delete()
        .eq('placeID', placeId);
  
      if (deleteError) {
        console.error('Error deleting old data from Supabase:', deleteError);
        throw deleteError;
      }
  
      const { error: insertError } = await supabase
        .from('storehours')
        .insert({ placeID: placeId, storeHours: hours });
  
      if (insertError) {
        console.error('Error inserting new data to Supabase:', insertError);
        throw insertError;
      }
  
      console.log(hours);

      return hours;
    } catch (error) {
      console.error('Error fetching hours:', error);
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
