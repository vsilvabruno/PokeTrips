import { useState, useEffect } from "react";
import tripsService from "../services/tripsService";

function useTripData() {
  const [tripInfo, setTripInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const result = await tripsService();
        setTripInfo(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, []);

  return { tripInfo, loading, error };
}

export default useTripData;