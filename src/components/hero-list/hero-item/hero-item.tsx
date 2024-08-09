import React from "react";
import {useNavigate} from "react-router-dom";
import {Hero} from "../../../types/hero.dto";
import styles from "../hero-list.module.scss";

interface HeroItemProps {
  hero: Hero;
}

export const HeroItem: React.FC<HeroItemProps> = ({hero}) => {
  const navigate = useNavigate();

  const handleSelectHero = (id: number) => {
    navigate(`/${id}`);
  };

  return (
    <li
      key={hero.id}
      className={styles.heroItem}
      onClick={() => handleSelectHero(hero.id)}
    >
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
        alt={hero.name}
        className={styles.heroImage}
      />
      <p>{hero.name}</p>
    </li>
  );
};