import axios from "axios";
import { useState, useEffect } from "react";
import modificarUrl from "./modificarUrl";

const axioDatabase = (params: {
  startDate?: string; 
  endDate?: string; 
  origin?: string;
  destination?: string;
  maxPrice?: string;
}) => {
  const baseUrl = 'http://localhost:8080/api/flights/search';
  
  const url = modificarUrl(baseUrl, params);

  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Max Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((flight: any) => (
              <tr key={flight.id}>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.date}</td>
                <td>{flight.maxPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No se encontraron vuelos.</div>
      )}
    </div>
  );
};

export default axioDatabase;
