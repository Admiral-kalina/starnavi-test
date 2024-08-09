import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, RootState} from '../../store/store';
import {loadHeroes, setLoadNewPersons} from '../../slices/hero-slice';
import {HeroList} from '../../components/hero-list/hero-list';
import {Layout} from "../../components/layout/layout";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const {
    heroes,
    isLastPage,
    loading,
    error,
    currentPage,
    loadNewPersons
  } = useSelector((state: RootState) => state.heroes);

  useEffect(() => {
    if ( !loading && loadNewPersons && !loading && !error) {
      dispatch(loadHeroes(currentPage));
      // Reset loadNewPersons flag after dispatch
      dispatch(setLoadNewPersons(false));
    }
  }, [currentPage, loadNewPersons, loading, error, dispatch]);

  const loadMore = () => {
    // Trigger load of new persons by setting the flag to true
    dispatch(setLoadNewPersons(true));
  };

  return (
    <Layout>
      <HeroList heroes={heroes} isLastPage={isLastPage} loading={loading} loadMore={loadMore}/>
    </Layout>
  );
};

export default HomePage;