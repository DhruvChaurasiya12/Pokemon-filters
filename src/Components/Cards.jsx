// src/components/Cards.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import Pagination from './Pagination';

const getId = (url) => url.split('/').slice(-2)[0];

export default function Cards() {
  const page       = useSelector((s) => s.pagination.page);
  const searchTerm = useSelector((s) => s.search.searchTerm);
  const filterType = useSelector((s) => s.filter.type);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterType) {
          const res  = await fetch(`https://pokeapi.co/api/v2/type/${filterType}`);
          const json = await res.json();
          setData(json.pokemon.map((p) => p.pokemon));
        } else {
          const res  = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=150`);
          const json = await res.json();
          setData(json.results);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, filterType]);

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {filtered.map((pokemon) => {
          const id       = getId(pokemon.url);
          const imageUrl =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return <Card key={id} id={id} name={pokemon.name} image={imageUrl} />;
        })}
      </div>
      {!filterType && <Pagination />}
    </>
  );
}
