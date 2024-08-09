import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store/store";
import {loadHeroDetails} from "../../store/slices/hero-slice";
import {HeroDetails} from "../../components/hero-details/hero-details";
import {Loader} from "../../components/loader/loader";
import {Layout} from "../../components/layout/layout";

const HeroPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {heroId} = useParams<{ heroId: string }>();

  const {
    selectedHero,
    loading,
    error
  } = useSelector((state: RootState) => state.heroes);

  useEffect(() => {
    if (!heroId || isNaN(parseInt(heroId, 10))) {
      navigate('/not-found-page');
      return;
    }
    const heroIdNumber = parseInt(heroId ?? '', 10);
    dispatch(loadHeroDetails(heroIdNumber));
  }, [dispatch, heroId, navigate,error]);

  return (
    <Layout>
      {loading ? (
        <Loader/>
      ) : (
        <HeroDetails selectedHero={selectedHero}/>
      )}
    </Layout>
  );
};

export default HeroPage;