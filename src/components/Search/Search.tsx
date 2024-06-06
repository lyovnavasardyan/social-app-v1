import React from 'react'

interface InputProps {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<InputProps> = ({ searchValue, setSearchValue }) => {
    return (
        <div>
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button>Search</button>
        </div>
    )
}

export default Search
