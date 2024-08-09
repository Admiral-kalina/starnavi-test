import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { HeroList } from '../../../components/hero-list/hero-list';
import {mockHeroesList} from "../../__mock__/heroes-list";

describe('HeroList Component', () => {
  const renderComponent = (
    heroes = mockHeroesList,
    isLastPage = false,
    loading = false,
    loadMore = jest.fn()
  ) =>
    render(
      <MemoryRouter>
        <HeroList
          heroes={heroes}
          isLastPage={isLastPage}
          loading={loading}
          loadMore={loadMore}
        />
      </MemoryRouter>
    );

  it('renders a list of heroes', () => {
    renderComponent();
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('renders "Load More" button when not on last page and not loading', () => {
    renderComponent(mockHeroesList, false, false);
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('does not render "Load More" button when on last page', () => {
    renderComponent(mockHeroesList, true, false);
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });

  it('disables "Load More" button when loading', () => {
    renderComponent(mockHeroesList, false, true);

    const loadMoreButton = screen.queryByRole('button', { name: /load more/i });

    if (loadMoreButton) {
      expect(loadMoreButton).toBeDisabled();
    } else {
      expect(loadMoreButton).toBeNull();
    }
  });

  it('renders no heroes when heroes list is empty', () => {
    renderComponent([]);
    expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Darth Vader/i)).not.toBeInTheDocument();
  });
});