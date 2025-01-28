// src/tests/ActivityCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ActivityCard } from '../components/ActivityCard';

test('Filtrer les logements en fonction du prix', () => {
  const activity = {
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Randonnée en montagne',
    maxParticipants: 10,
    organizer: { name: 'Alice', avatar: '', email: '', id: '', bio: '' },
    participants: [],
    description: 'Une magnifique randonnée à travers les Alpes.',
    categories: ['Sport'],
    reviews: [],
    location: {
      city: 'Annecy',
      address: '123 Rue de la Montagne',
      latitude: 45.899,
      longitude: 6.129,
    },
  };

  render(<ActivityCard activity={activity} />);

  // Modifier le budget maximum
  const budgetInput = screen.getByLabelText(/Budget max/i);
  fireEvent.change(budgetInput, { target: { value: 80 } });

  // Vérifier que les logements affichés sont filtrés
  expect(screen.getByText(/Aucun logement disponible/i)).toBeInTheDocument();
});
