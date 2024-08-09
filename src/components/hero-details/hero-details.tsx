import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  addEdge,
  Connection,
} from 'react-flow-renderer';
import styles from './hero-details.module.scss';
import {ExpandedHero} from "../../types/hero.dto";

interface HeroDetailsProps {
  selectedHero: ExpandedHero | null;
}

export const HeroDetails: React.FC<HeroDetailsProps> = ({ selectedHero }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedHero) {
      // Create a node for the hero
      const heroNode: Node = {
        id: selectedHero.id.toString(),
        type: 'input',
        data: { label: selectedHero.name },
        position: { x: 250, y: 0 },
      };

      // Create nodes for films
      const filmNodes = selectedHero.films.map((film, index) => ({
        id: `film-${film.id}`,
        type: 'default',
        data: { label: `${film.title}` },
        position: { x: 150 + index * 160, y: 150 },
      }));

      // Create edges for films
      const filmEdges = selectedHero.films.map((film) => ({
        id: `e${selectedHero.id}-film-${film.id}`,
        source: selectedHero.id.toString(),
        target: `film-${film.id}`,
        type: 'smoothstep',
      }));

      // Create nodes and edges for starships
      const starshipNodes: Node[] = [];
      const starshipEdges: Edge[] = [];

      selectedHero.films.forEach((film) => {
        film.starships.forEach((starshipId) => {
          // Find if the starship is both in the film and piloted by the hero
          const starship = selectedHero.starships.find(
            (s) => s.id === starshipId && s.pilots.includes(selectedHero.id)
          );

          if (starship) {
            // Ensure unique nodes for starships
            const nodeExists = starshipNodes.some((node) => node.id === `starship-${starship.id}`);
            if (!nodeExists) {
              starshipNodes.push({
                id: `starship-${starship.id}`,
                type: 'default',
                data: { label: `${starship.name}` },
                position: { x: 150 + starshipNodes.length * 160, y: 300 },
              });
            }

            // Create edge from film to starship
            starshipEdges.push({
              id: `e${film.id}-starship-${starship.id}`,
              source: `film-${film.id}`,
              target: `starship-${starship.id}`,
              type: 'default',
            });
          }
        });
      });

      // Update the state with the new nodes and edges
      setNodes([heroNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);
    }
  }, [selectedHero]);

  const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds));

  const handleClick = () => {
    navigate('/');
  };

  return (
    <ReactFlowProvider>
      <div className={styles.graphWrapper}>
        <button onClick={handleClick} className={styles.backButton}>
          Back to Heroes
        </button>
        <ReactFlow  nodes={nodes} edges={edges} onConnect={onConnect} fitView />
      </div>
    </ReactFlowProvider>
  );
};
