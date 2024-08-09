import React from 'react';
import styles from './hero-list.module.scss';
import { Loader } from "../loader/loader";
import { Hero } from "../../types/hero.dto";
import { HeroItem } from "./hero-item/hero-item";

interface HeroListProps {
  heroes: Hero[];
  isLastPage: boolean;
  loading: boolean;
  loadMore: () => void;
}

export const HeroList: React.FC<HeroListProps> = ({
  heroes,
  isLastPage,
  loading,
  loadMore,
}) => {
  return (
    <div className={styles.heroListWrapper}>
      <ul className={styles.heroList}>
        {heroes.map(hero => (
          <HeroItem key={hero.id} hero={hero} />
        ))}
      </ul>
      {loading && <Loader />}
      {!isLastPage && !loading && (
        <button
          className={styles.loadMoreButton}
          onClick={loadMore}
          disabled={loading}
        >
          Load More
        </button>
      )}
    </div>
  );
};
