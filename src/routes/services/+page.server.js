export const load = ({ fetch }) => {
    const fetchServices = async() => {
        console.log('fetch ssr');
        const res = await fetch('https://coda.io/apis/v1/docs/JPDW7_bTYb/tables/grid-vfXh3vEkTg/rows?useColumnNames=true&valueFormat=rich&query=isPlaying:"true"', {
          headers: {
            Authorization: "Bearer c32f30d9-c49f-42cf-b445-ddcb6c950e97",
          },
        });
        const data = await res.json();
                console.log(data);

        return data.items;
        
    }

    return {
        services: fetchServices()
    }
}