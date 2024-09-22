import { useState } from 'react';
import axios from 'axios';
import modificarUrl from '@/component/modificarUrl';

const Home = () => {
  const [startDate, setStartDate] = useState('2024-09-01');
  const [endDate, setEndDate] = useState('2024-10-10');
  const [filters, setFilters] = useState({
    origin: false,
    destination: false,
    maxPrice: false,
  });

  const [filterValues, setFilterValues] = useState({
    origin: '',
    destination: '',
    price: '',
  });

  const [flights, setFlights] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleCheckboxChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  const handleInputChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const params = {
      startDate,
      endDate,
      ...(filters.origin && { origin: filterValues.origin }),
      ...(filters.destination && { destination: filterValues.destination }),
      ...(filters.maxPrice && { price: filterValues.price }),
    };

    const url = modificarUrl('http://localhost:8080/api/flights/search', params);

    try {
      const response = await axios.get(url);
      setFlights(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center m-15 mx-28 my-28 p-15 border-3 border-black rounded-lg bg-slate-200 flex flex-col">
        <div className="p-7">
          <p className="text-4xl font-bold">Search Flights</p>
        </div>
        <div className='flex flex-col mx-9 w-39'>
          <label className="p-5">Start date:</label>
          <input
            type="date"
            id="start"
            value={startDate}
            min="2024-09-01"
            max="2024-12-31"
            className="text-center wx-30"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="p-5">End date:</label>
          <input
            type="date"
            id="end"
            value={endDate}
            min="2024-09-01"
            max="2024-12-31"
            className="text-center"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <form className="my-5 text-left">
            <input
              type="checkbox"
              className="m-3"
              name="origin"
              checked={filters.origin}
              onChange={handleCheckboxChange}
            />
            <label>Filter by Origin</label><br />
            {filters.origin && (
              <input
                type="text"
                className="m-3 p-2 border rounded"
                name="origin"
                placeholder="Enter origin city"
                value={filterValues.origin}
                onChange={handleInputChange}
              />
            )}
            <br></br>
            <input
              type="checkbox"
              className="m-3"
              name="destination"
              checked={filters.destination}
              onChange={handleCheckboxChange}
            />
            <label>Filter by Destination</label><br />
            {filters.destination && (
              <input
                type="text"
                className="m-3 p-2 border rounded"
                name="destination"
                placeholder="Enter destination city"
                value={filterValues.destination}
                onChange={handleInputChange}
              />
            )}
            <br></br>
            <input
              type="checkbox"
              className="m-3"
              name="maxPrice"
              checked={filters.maxPrice}
              onChange={handleCheckboxChange}
            />
            <label>Filter by Max Price</label><br />
            {filters.maxPrice && (
              <input
                type="text"
                className="m-3 p-2 border rounded"
                name="maxPrice"
                placeholder="Enter max price"
                value={filterValues.price}
                onChange={handleInputChange}
              />
            )}
          </form>
          <button
            className='bg-blue-500 text-center mx-20 m-3 p-1 rounded-lg'
            onClick={handleSearch}
          >
            Search Flights
          </button>
          <div className='text-center mx-20 flex justify-center '>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {flights && (
              <div>
              <h2 className="my-2 text-2xl font-bold">Available Flights</h2>
              <table className='mx-20 my-7'>
                <thead className='border-double border-4 border-black text-center'>
                  <tr>
                    <th className='px-7 py-3'>Origin</th>
                    <th className='px-7 py-3'>Destination</th>
                    <th className='px-7 py-3'>Date</th>
                    <th className='px-7 py-3'>Max Price</th>
                  </tr>
                </thead>
                <tbody className='border-solid border-4 border-black text-center'>
                  {flights.map((flight) => (
                    <tr key={flight.id} className='border-solid border border-b-black'>
                      <td>{flight.origin}</td>
                      <td>{flight.destination}</td>
                      <td>{flight.date}</td>
                      <td>{flight.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
