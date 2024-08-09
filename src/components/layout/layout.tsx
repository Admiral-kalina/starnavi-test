import styles from "./layout.module.scss"
import React, {ReactNode} from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
      <div className={styles.layout}>
        <h1 className={styles.title}>Star Wars Heroes</h1>
        {children}
      </div>
  );
};