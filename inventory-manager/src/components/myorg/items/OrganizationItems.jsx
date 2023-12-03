import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './OrganizationItems.css'
import {useParams} from "react-router-dom";
const OrganizationItems = ({ token }) => {
    // const [orgId, setOrgId] = useState(null);
    const [items, setItems] = useState([]);
    const { orgId } = useParams();
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [quantityFilter, setQuantityFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/all', {
                    orgId: orgId,
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setItems(response.data.data);
                    setFilteredItems(response.data.data);
                    // Extract categories and locations for filtering
                    const uniqueCategories = [...new Set(response.data.data.map(item => item[5]))];
                    const uniqueLocations = [...new Set(response.data.data.map(item => item[9]))];
                    setCategories(['', ...uniqueCategories]);
                    setLocations(['', ...uniqueLocations]);
                } else {
                    console.error('Error fetching organization items');
                }
            } catch (error) {
                console.error('Error fetching organization items:', error);
            }
        };

        // Set orgId based on your logic (e.g., from token or passed as a prop)
        // setOrgId(2);

        fetchData();
    }, [orgId, token]);

    const handleFilter = () => {
        let filteredItemsCopy = [...items];

        // Apply filters
        if (categoryFilter) {
            filteredItemsCopy = filteredItemsCopy.filter(item => item[5] === categoryFilter);
        }
        if (locationFilter) {
            filteredItemsCopy = filteredItemsCopy.filter(item => item[9] === locationFilter);
        }
        if (quantityFilter) {
            filteredItemsCopy = filteredItemsCopy.filter(item => item[4] >= parseInt(quantityFilter, 10));
        }
        if (searchFilter) {
            filteredItemsCopy = filteredItemsCopy.filter(item =>
                item[1].toLowerCase().includes(searchFilter.toLowerCase())
            );
        }

        setFilteredItems(filteredItemsCopy);
    };

    return (
        <div className="organization-items">
            <h2>Organization Items</h2>
            <div className="filters">
                <label>
                    Category:
                    <select onChange={(e) => setCategoryFilter(e.target.value)}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Location:
                    <select onChange={(e) => setLocationFilter(e.target.value)}>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Minimum Quantity:
                    <input
                        type="number"
                        value={quantityFilter}
                        onChange={(e) => setQuantityFilter(e.target.value)}
                    />
                </label>
                <label>
                    Search by Name:
                    <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </label>
                <button onClick={handleFilter}>Apply Filters</button>
            </div>
            <div className="items-list">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div key={index} className="item-item">
                            <div className="item-details">
                                <span><strong>Name:</strong> {item[1]}</span>
                                <span><strong>Description:</strong> {item[2]}</span>
                                <span><strong>Owner Email:</strong> {item[3]}</span>
                                <span><strong>Quantity:</strong> {item[4]}</span>
                                <span><strong>Category:</strong> {item[5]}</span>
                                <span><strong>Status:</strong> {item[6]}</span>
                                <span><strong>Location:</strong> {item[9]}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
};

export default OrganizationItems;
