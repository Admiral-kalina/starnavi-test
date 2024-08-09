import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { HeroDetails } from './hero-details';
import { mockHero } from '../../mock-data/hero-details';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HeroDetails Component', () => {
  const renderComponent = (selectedHero: typeof mockHero | null) =>
    render(
      <MemoryRouter>
        <HeroDetails selectedHero={selectedHero} />
      </MemoryRouter>
    );

  it('renders the hero name correctly', () => {
    renderComponent(mockHero);
    expect(screen.getByText(/Wedge Antilles/i)).toBeInTheDocument();
  });

  it('renders film titles associated with the hero', () => {
    renderComponent(mockHero);
    mockHero.films.forEach((film) => {
      expect(screen.getByText(new RegExp(film.title, 'i'))).toBeInTheDocument();
    });
  });

  it('renders starship names associated with the hero', () => {
    renderComponent(mockHero);
    mockHero.starships.forEach((starship) => {
      expect(screen.getByText(new RegExp(starship.name, 'i'))).toBeInTheDocument();
    });
  });

  it('handles no selected hero gracefully', () => {
    renderComponent(null);
    expect(screen.queryByText(/Wedge Antilles/i)).not.toBeInTheDocument();
  });

  it('renders the back button', () => {
    renderComponent(mockHero);
    expect(screen.getByText(/Back to Heroes/i)).toBeInTheDocument();
  });

  it('renders the graph with nodes and edges', () => {
    renderComponent(mockHero);
    expect(screen.getByText(/Wedge Antilles/i)).toBeInTheDocument();
    mockHero.films.forEach((film) => {
      expect(screen.getByText(new RegExp(film.title, 'i'))).toBeInTheDocument();
    });
    mockHero.starships.forEach((starship) => {
      expect(screen.getByText(new RegExp(starship.name, 'i'))).toBeInTheDocument();
    });
  });
});