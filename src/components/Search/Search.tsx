import React from 'react'
import Button from '../SmallComponents/Button/Button'

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
            <Button
                size='small'
                usage='button'
                bgColor='white'
                color='black'
                text='Search'
                
            />
        </div>
    )
}

export default Search
