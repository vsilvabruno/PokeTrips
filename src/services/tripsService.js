const url = "/mockapi/trips.json";

async function getTripInfo() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch(error) {
        console.error("Problem fetching Trips data: " + error);
        return [];
    }
};

export default getTripInfo;