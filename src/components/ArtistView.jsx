import React from 'react';

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/album/${id}`;
            const response = await fetch(API_URL);
            const resData = await response.json();
            setArtistData(resData.results);
        }
        fetchData();
    });

    const navButtons = () => {
        return (
            <div>
                <button type="button" onClick={ () => navigate(-1) }>Back</button>
                |
                <button type="button" onClick={ () => navigate('/') }>Home</button>
            </div>
        )
    }

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');

    const renderAlbums = justAlbums.map((album, index) => {
        return (
            <div key={index}>
                <Link to={ `/album/${album.collectionId}` }>
                  <p>{ album.collectionName }</p>
                </Link>
            </div>
        )
    })
    const renderArtistName=() => {
        return artistData.length ? 
            <h2>{ artistData[0].artistName }</h2>
            :
            <h2>loading...</h2>
    }

    return (
        <div>
            { renderArtistName() }
            { navButtons() }
            { renderAlbums }
        </div>
    )
}