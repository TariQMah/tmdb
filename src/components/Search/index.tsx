import React, { useCallback, useState } from "react";

const Index = ({ onSubmit }: any) => {
  const [search, setSearch] = useState("");
  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      onSubmit && onSubmit(search);
    },
    [onSubmit, search]
  );
  return (
    <div className="searchContainer">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Search for movies, TV shows and people to discover"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Index;
