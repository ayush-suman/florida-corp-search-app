import { EntityDetail } from "../models/EntityDetail";

interface SearchResultProps {
    searchResults: EntityDetail[];
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResults }) => {
    return (
        <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={tdStyle}>ID</th>
              <th style={tdStyle}>Entity Name</th>
              <th style={tdStyle}>Document Number</th>
              <th style={tdStyle}>Status</th>
              <th style={tdStyle}>Date Filed</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((entity) => (
              <tr key={entity.id}>
                <td style={tdStyle}>{entity.id}</td>
                <td style={tdStyle}>{entity.entity_name}</td>
                <td style={tdStyle}>{entity.document_number}</td>
                <td style={tdStyle}>{entity.status}</td>
                <td style={tdStyle}>
                  {entity.date_filed
                    ? entity.date_filed 
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

const tdStyle: React.CSSProperties = {
    padding: '8px',
    color: 'black',
};

export default SearchResult;