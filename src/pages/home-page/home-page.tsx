import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, RootState} from '../../store/store';
import {loadHeroes, setLoadNewPersons} from '../../store/slices/hero-slice';
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
    if ( !loading && loadNewPersons && !error) {
      dispatch(loadHeroes(currentPage));
      dispatch(setLoadNewPersons(false));
    }
  }, [currentPage, loadNewPersons, loading, error, dispatch]);

  const loadMore = () => {
    dispatch(setLoadNewPersons(true));
  };

  return (
    <Layout>
      <HeroList heroes={heroes} isLastPage={isLastPage} loading={loading} loadMore={loadMore}/>
    </Layout>
  );
};

export default HomePage;