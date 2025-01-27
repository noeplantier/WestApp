import { useEffect, useRef } from 'react';

const Loader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Changez la valeur pour ajuster la vitesse
    }
  }, []);

  return (
    <div className="loader-container">
      <video ref={videoRef} className="loader-video" autoPlay loop muted >
        <source src="/videos/201528-915698783_small.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
};

export default Loader;