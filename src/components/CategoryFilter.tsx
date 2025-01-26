import React from 'react';

const categories = [
  "Sport",
  "Culture",
  "Gastronomie",
  "Nature",
  "Musique",
  "Art",
  "Jeux",
  "Langue"
];

export function CategoryFilter() {
  return (

    <div className="text-center my-2 p-6" id="main-container">
<h2 className="text-gray-500 font-semibold text-8xl mt-4 mb-4" style={{ background: 'linear-gradient(to right, #333, #ccc)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
  Activités à proximité.
</h2>


          <div className="flex flex-wrap gap-2 py-4" style={{ marginLeft: "12rem" }}>
      {categories.map((category) => (
        <button
          key={category}
          className=" px-4 py-2 rounded-full text-sm bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
        >
          {category}
        </button>
        
      ))}
    </div>
    </div>
  );
}