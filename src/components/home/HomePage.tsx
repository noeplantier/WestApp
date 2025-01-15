import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source
          src="/videos/204565-924698132_small.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenu principal */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center my-2 p-6" id="main-container">
          <h1 className="text-white text-9xl font-bold" id="main-title">
            WestApp
          </h1>
          <h2 className="text-white font-semibold text-5xl mt-4">
            Quel est ton mood aujourd'hui ?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;