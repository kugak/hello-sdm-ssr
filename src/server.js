
export async function get({ fetch }) {
  let services = [];
  let error = null;
  let lastUpdated = null;
  let currentTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  let currentDay = '';
  let timeParts = currentTime.split(' ');
  let time = timeParts[0];
  let amPm = timeParts[1];
  let showContent = false;

  try {
    const response = await fetch(`https://coda.io/apis/v1/docs/JPDW7_bTYb/tables/grid-vfXh3vEkTg/rows?useColumnNames=true&valueFormat=rich&query=isPlaying:"true"`, {
      headers: {
        'Authorization': 'Bearer c32f30d9-c49f-42cf-b445-ddcb6c950e97'
      },
    });
    services = await response.json();
    lastUpdated = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    showContent = true;
    console.log('Data fetched successfully', { services });
  } catch (e) {
    error = e;
    console.log(e);
    console.error('Error fetching data from Coda API', { error: e });
  }

  return {
    body: {
      services,
      error,
      lastUpdated,
      time,
      amPm,
      showContent,
    }
  };
}
