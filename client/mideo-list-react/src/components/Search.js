import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        navigate(`/results?search=${searchValue}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '3em', color: 'white' }}>Find Movies and Series</h1>
            <input 
                type='text' 
                placeholder='Search' 
                style={{ width: '400px', height: '40px', fontSize: '1.5em' }} 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown} 
            />
        </div>
    );
}

export default Search;