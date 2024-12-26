import { useState } from "react";
import { TextField, Button} from "@mui/material";

interface SearchBarProps {
    active: boolean;
    onSearch: (searchTerm: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({active, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    
    
  
    return (
      <div style={{ margin: '20px' }}>
        <div>
          <TextField 
            id="search" 
            label="Enter Search Term"
            variant="outlined" 
            onChange={(e) => setSearchTerm(e.target.value)} 
            value={searchTerm} 
            style={{ borderRadius: '12px', lineHeight: '1', width: '300px' }}
          />
          <button onClick={() => { onSearch(searchTerm) }} disabled={!active} style={{marginInline: '10px', padding: '16px', width: '100px' }}>Search</button>
        </div>
      </div>
    );
  }
  
  export default SearchBar;