  import { PUBLIC_CODA_KEY, PUBLIC_DD_API_KEY } from "$env/static/public";

export const load = ({ fetch, url }) => {
  
  const fetchEmployees = async () => {
    const searchParams = new URLSearchParams(url.search);
    const pageId = searchParams.get("pid") || "JPDW7_bTYb";
    const tableId = searchParams.get("tid") || "grid-h5ed1eQGwZ";
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
        eventType: "error",
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
          `tag:'employeesPage-'${pageId}-${tableId}`,
      ],
      };

      // await fetch(datadogEndpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'DD-API-KEY': datadogApiKey,
      //   },
      //   body: JSON.stringify(logPayload),
      // });

      throw error;
    }
  };

  return {
    employees: fetchEmployees(),
  };
};
