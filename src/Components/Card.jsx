import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Card({ id, name, image }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card w-80 glass cursor-pointerm">
      <figure className="bg-gradient-to-r from-purple-500 to-purple-900">
        <img
          src={image}
          alt={`${name}`}
          onClick={() => navigate(`/detail/${id}`)}
          className="w-full"
        />
      </figure>
      <div className="card-body bg-yellow-100">
        <h2 className="card-title text-green-900">{name.toUpperCase()}</h2>
        <div className="card-actions flex justify-between items-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/detail/${id}`)}
          >
            Details
          </button>
          <div
            className="ml-4 cursor-pointer text-2xl hover:animate-bounce"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
