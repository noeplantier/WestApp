import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ActivityCard } from './components/ActivityCard';
import { Chatbot } from './components/chatbot/Chatbot';
import { PremiumModal} from './components/premium/PremiumModal';
import './index.css';
import MainTitle from './components/title/MainTitle';
import { useEffect, useState } from 'react';
import Loader from './components/loader/Loader';
import { SAMPLE_ACTIVITIES } from './hooks/useActivities';
import Footer from './components/Footer';
import Clerk from '@clerk/clerk-react';


const App = () => {

  const [setIsLoading] = useState(true);

useEffect(() => {
  // Simulez un temps de chargement avant que l'application soit prête
  const timer = setTimeout(() => setIsLoading(false), 3000);
  return () => clearTimeout(timer);
}, []);

// if (isLoading) {
//   return <Loader />; // Affiche le loader pendant le chargement
// }


return (
  <div>
    <Header />
    <MainTitle />

    <div className="min-h-screen bg-gray-50" style={{ background: 'linear-gradient(to right,rgb(19, 75, 96),rgb(126, 176, 195) )'}}>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
     
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SAMPLE_ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      <PremiumModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </main>
      <Chatbot />
      <Footer/>
    </div>
    </div>
  );
}

export default App;
