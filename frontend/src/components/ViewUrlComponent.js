import React, { useEffect, useState } from 'react'
import axios from "axios"

const ViewUrlComponent= () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios.get("http://localhost:3333/all");
        setUrls(result.data);
      };
      fetchUrlAndSetUrl();
    }, [urls]);

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Url Original</th>
            <th>Url Curta</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.origUrl}</td>
              <td>
                <a href={`${url.shortUrl}`} target='_blank'>{url.shortUrl}</a>
              </td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;