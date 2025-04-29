// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate }        from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm }            from '../redux/slices/SearchSlice';
import { setFilterType }            from '../redux/slices/filterSlice';

export default function Navbar() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const filterType = useSelector((s) => s.filter?.type || '');

  // form & dropdown state
  const [q, setQ]         = useState('');
  const [types, setTypes] = useState([]);

  // responsive & menu state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen]         = useState(false);

  // listen for resize to switch mobile/desktop
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // fetch Pokémon types once
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((r) => r.json())
      .then((j) => setTypes(j.results))
      .catch(console.error);
  }, []);

  // submit search
  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    dispatch(setSearchTerm(q.toLowerCase()));
    setQ('');
    navigate('/search');
    setOpen(false);
  };

  // change filter
  const onFilter = (e) => {
    dispatch(setFilterType(e.target.value));
    setOpen(false);
  };

  return (
    <nav className="bg-orange-600 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center px-4 py-2 justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold"
          onClick={() => {
            dispatch(setSearchTerm(''));
            dispatch(setFilterType(''));
            setOpen(false);
          }}
        >
          PokeNavigator
        </Link>

        {/* Center: Search + (desktop-only) Filter */}
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={onSearch} className="flex w-full max-w-[90%] sm:max-w-md lg:max-w-lg items-center">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name…"
              className="flex-grow h-10 px-3 rounded-l bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="h-10 w-10 bg-white rounded-r hover:bg-gray-100 flex items-center justify-center"
            >
              🔍
            </button>
          </form>
          {!isMobile && (
            <select
              value={filterType}
              onChange={onFilter}
              className="ml-2 h-10 px-3 rounded bg-white text-gray-800 focus:outline-none"
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Right: desktop auth or mobile hamburger */}
        <div className="ml-4">
          {isMobile ? (
            <button onClick={() => setOpen((o) => !o)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/registration" className="text-white hover:underline">
                Register
              </Link>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown: filter + auth */}
      {isMobile && open && (
        <div className="md:hidden bg-orange-600 px-4 pb-4 space-y-3">
          <select
            value={filterType}
            onChange={onFilter}
            className="w-full h-10 px-3 rounded bg-white text-gray-800 focus:outline-none"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
          </select>
          <Link to="/registration" onClick={() => setOpen(false)} className="block text-white hover:underline">
            Register
          </Link>
          <Link to="/login" onClick={() => setOpen(false)} className="block text-white hover:underline">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
