import { useState, useEffect, useRef } from 'react';
import { CircularProgress } from "@mui/material";
import './App.css'
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult';
import { EntityDetail } from './models/EntityDetail';

function App() {
  const [readyState, setReadyState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<EntityDetail[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);


  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8764/api/v1/search/ws');
    socketRef.current.onopen = () => {
        setReadyState(true);
    }

    socketRef.current.onmessage = (event) => {
      console.log(event.data)
        if (event.data.search_term === searchTerm) {
            const newSearchResults = [...searchResults];
            if (event.data.entities) newSearchResults.push(...event.data.entities);
            if (event.data.new_entity) newSearchResults.push(event.data.new_entity);   
            setSearchResults(newSearchResults);
            setLoadingState(false);
            console.log(newSearchResults)
        }
    }
  })


  const handleSearch = async (currentSearchTerm: string) => {
    console.log("CURRENT: ", currentSearchTerm)
    if (currentSearchTerm !== searchTerm) {
        setSearchTerm(currentSearchTerm);
        setSearchResults([]);
        setLoadingState(true);
        const body = JSON.stringify({ search_term: currentSearchTerm })
        console.log(body)
        fetch('http://localhost:8765/api/v1/crawler/initiate_crawl',{ 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: body
        }).then(response => { 
          if (!response.ok) {
            console.error('Error while initiating crawl for :', currentSearchTerm);
          }
        }).catch(error => {
          console.error('Error while initiating crawl:', error);
        });
        try {
          const socket = socketRef.current
          console.log(socket)
          socket!.send(JSON.stringify(body))
          console.log(body, " sent")
        } catch (error) {
            console.error('Error while fetching search results:', error);
        }
    }
};

  return (
    <>
      <SearchBar active={readyState} onSearch={handleSearch}/>
      {loadingState && <CircularProgress />}
      <SearchResult searchResults={searchResults}/>
    </>
  )
}

export default App
