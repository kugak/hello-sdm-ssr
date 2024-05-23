import { PUBLIC_CODA_KEY, PUBLIC_DD_API_KEY, PUBLIC_SUPERBASE_URL, PUBLIC_SUPERBASE_KEY } from "$env/static/public";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(PUBLIC_SUPERBASE_URL, PUBLIC_SUPERBASE_KEY);

export const load = ({ fetch, url }) => {
  
  const fetchServices = async () => {
    const searchParams = new URLSearchParams(url.search);
    const pageId = searchParams.get("pid") || "JPDW7_bTYb";
    const tableId = searchParams.get("tid") || "grid-vfXh3vEkTg";
    try {
      const res = await fetch(`https://coda.io/apis/v1/docs/${pageId}/tables/${tableId}/rows?useColumnNames=true&valueFormat=rich&query=isPlaying:"true"`, {
        headers: {
          Authorization: `${PUBLIC_CODA_KEY}`,
        },
      });

      if (!res.ok) {
        const error = new Error(`Request failed with status code ${res.status}`);
        error.response = res;
        throw error;
      }

      const data = await res.json();
      // Sort the data.items array by index property
      data.items.sort((a, b) => a.index - b.index);
      //console.log(data);
      return data.items;
    } catch (error) {
      // Log the error to DataDog
      const datadogApiKey = `${PUBLIC_DD_API_KEY}`;
      const datadogEndpoint = 'https://api.datadoghq.com/api/v1/events';
      const datadogTags = ['app:sdm-ssr', 'env:production'];

      const logPayload = {
         title: "Error fetching data from Coda API",
        text: error.message,
        aggregationKey: "",
        alert_type: "error",
        deviceName: "",
        host: "",
        priority: "normal",
        source: `${pageId}-${tableId}`,
        tags: [
          `environment:prod`,
          "app:SDM FOP",
          "service:Custom",
          `version:${pageId}`,
          "event:fetchData",
          `tag:'servicesPage-'${pageId}-${tableId}`,
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

  const fetchSupabase = async () => {

    const searchParams = new URLSearchParams(url.search);
    const contentId = searchParams.get("content_id") || "clur0po918ow908u93i1df0lk";
    const lang = searchParams.get("lang") || "en";

    try {
      const { data, error } = await supabase
        .from('pagecontent')
        .select('content')
        .eq('content_id', contentId)
        .single();
        console.log(data);

      if (error) throw error;

      const { hasClock, localizations } = data.content;
      const localization = localizations.find(loc => loc.locale === lang);


      if (!localization) {
        throw new Error(`Localization for language ${lang} not found`);
      }
      
      console.log(hasClock);
      console.log(localization);

      return { hasClock, localization };
      


    } catch (error) {
      console.error('Error fetching titles from Supabase:', error);
      throw error;
    }
  };

  return {
    services: fetchServices(),
    supabaseContent: fetchSupabase(),
  };
};
