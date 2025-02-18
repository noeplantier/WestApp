import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white py-16">
      {/* Conteneur principal avec espacement vertical */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Grille principale avec espacement optimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {/* À propos */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">WestApp</h3>
            <p className="text-gray-600 leading-relaxed">
              Rejoignez la communauté WestApp et connectez-vous avec des millions d'utilisateurs à travers le monde.
            </p>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">Informations légales</h3>
            <ul className="space-y-4">
              <li>
                <a href="/mentions-legales" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/confidentialite" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/cgu" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors inline-block">
                  Gestion des cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">Newsletter WestApp</h3>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Restez informé des dernières actualités et fonctionnalités
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>S'abonner</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
              {showAlert && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Merci pour votre inscription à la newsletter !</p>
                </div>
              )}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">Suivez-nous</h3>
            <div className="space-y-6">
              <div className="flex space-x-6">
                {/* Icons sociaux avec taille et espacement uniformes */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954,4.569c-.885.389-1.83.654-2.825.775,1.014-.611,1.794-1.574,2.163-2.723-.951.555-2.005.959-3.127,1.184-.896-.959-2.173-1.559-3.591-1.559-2.717,0-4.92,2.203-4.92,4.917,0,.39.045.765.127,1.124C7.691,8.094,4.066,6.13,1.64,3.161c-.427.722-.666,1.561-.666,2.475,0,1.71.87,3.213,2.188,4.096-.807-.026-1.566-.248-2.228-.616v.061c0,2.385,1.693,4.374,3.946,4.827-.413.111-.849.171-1.296.171-.314,0-.615-.03-.916-.086.631,1.953,2.445,3.377,4.604,3.417-1.68,1.319-3.809,2.105-6.102,2.105-.39,0-.779-.023-1.17-.067,2.189,1.394,4.768,2.209,7.557,2.209,9.054,0,13.999-7.496,13.999-13.986,0-.209,0-.42-.015-.63.961-.689,1.8-1.56,2.46-2.548l-.047-.02Z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.163c3.204,0,3.584.012,4.85.07,3.252.148,4.771,1.691,4.919,4.919.058,1.265.069,1.645.069,4.849,0,3.205-.012,3.584-.069,4.849-.149,3.225-1.664,4.771-4.919,4.919-1.266.058-1.644.07-4.85.07-3.204,0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849,0-3.204.013-3.583.07-4.849.149-3.227,1.664-4.771,4.919-4.919,1.266-.057,1.645-.069,4.849-.069Zm0-2.163c-3.259,0-3.667.014-4.947.072-4.358.2-6.78,2.618-6.98,6.98-.059,1.281-.073,1.689-.073,4.948,0,3.259.014,3.668.072,4.948.2,4.358,2.618,6.78,6.98,6.98,1.281.058,1.689.072,4.948.072,3.259,0,3.668-.014,4.948-.072,4.354-.2,6.782-2.618,6.979-6.98.059-1.28.073-1.689.073-4.948,0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0,5.838c-3.403,0-6.162,2.759-6.162,6.162s2.759,6.163,6.162,6.163,6.162-2.759,6.162-6.163c0-3.403-2.759-6.162-6.162-6.162Zm0,10.162c-2.209,0-4-1.79-4-4s1.791-4,4-4,4,1.79,4,4-1.791,4-4,4Zm6.406-11.845c-.796,0-1.441.645-1.441,1.44s.645,1.44,1.441,1.44c.795,0,1.439-.645,1.439-1.44s-.644-1.44-1.439-1.44Z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447,20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853,0-2.136,1.445-2.136,2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9,1.637-1.85,3.37-1.85,3.601,0,4.267,2.37,4.267,5.455v6.286ZM5.337,7.433c-1.144,0-2.063-.926-2.063-2.065,0-1.138.92-2.063,2.063-2.063,1.14,0,2.064.925,2.064,2.063,0,1.139-.925,2.065-2.064,2.065Zm1.782,13.019H3.555V9h3.564v11.452ZM22.225,0H1.771C.792,0,0,.774,0,1.729v20.542C0,23.227.792,24,1.771,24h20.451C23.2,24,24,23.227,24,22.271V1.729C24,.774,23.2,0,22.222,0h.003Z"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Contact : support@westapp.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright avec espacement optimal */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} WestApp. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;