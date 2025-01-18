
const Loader = () => {
  return (
    <div className="loader-container">
      <video className="loader-video" autoPlay loop muted>
        <source src="/videos/73847-549547533_small.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
};

export default Loader;