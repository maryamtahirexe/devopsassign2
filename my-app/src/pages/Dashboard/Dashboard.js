import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card.js";
import { RingLoader } from "react-spinners";
import {
  getAllShops,
  deleteShop,
} from "../../redux/slices/shopSlice/shopSlice.js";
import {
  getAllApartments,
  deleteApartment,
} from "../../redux/slices/apartmentSlice/apartmentSlice.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    shops,
    loading: loadingShops,
    error: errorShops,
  } = useSelector((state) => state.shop);
  const {
    apartments,
    loading: loadingApartments,
    error: errorApartments,
  } = useSelector((state) => state.apartment);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllApartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllShops());
  }, [dispatch]);

const filteredShops = (shops || []).filter((shop) =>
  shop?.name?.toLowerCase().includes(searchQuery.toLowerCase())
);

const filteredApartments = (apartments || []).filter((apartment) =>
  apartment?.name?.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="flex">
      {/* Sidebar can be here */}
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Search Bar and Add Property Button Container */}
        <div className="flex items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="flex bg-slate-300 items-center rounded-lg p-3 w-4/5 mr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-300 w-full ml-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Add Property Button */}
          <Link to="/dashboard/add-property">
            <button className="text-primary font-bold bg-slate-300 rounded-lg p-3">
              Add Property
            </button>
          </Link>
        </div>

        {/* Shops Section */}
        <h2 className="text-xl font-semibold mb-4">Shops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loadingShops ? (
            <div className="flex justify-center items-center fixed inset-0 z-50">
              <RingLoader size={60} color="#191343" loading={true} />
            </div>
          ) : errorShops ? (
            <p>Error loading shops</p>
          ) : filteredShops.length === 0 ? (
            <p>No shops found.</p>
          ) : (
            filteredShops.map((shop) => (
              <Card
                key={shop._id}
                type="Shop"
                id={shop._id}
                name={shop.name}
                location={shop.location}
              />
            ))
          )}
        </div>

        {/* Apartments Section */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Apartments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loadingApartments ? (
            <div className="flex justify-center items-center fixed inset-0 z-50">
              <RingLoader size={60} color="#191343" loading={true} />
            </div>
          ) : errorApartments ? (
            <p>Error loading apartments: {errorApartments}</p>
          ) : filteredApartments.length === 0 ? (
            <p>No apartments found.</p>
          ) : (
            filteredApartments.map((apartment) => (
              <Card
                key={apartment._id}
                type="Apartment"
                id={apartment._id}
                name={apartment.name}
                location={apartment.location}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
