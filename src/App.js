import { useEffect, useState, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout, ThanksForFeedack, NewProject } from './paths';


import AdminLayout from './layout/admin/AdminLayout';
import AdminHome from './Pages/admin/AdminHome';
import Requests from './Pages/admin/Requests';
import AllFeedbacks from './Pages/admin/AllFeedbacks';
import UIPage from './Pages/admin/UIPage';
import CasesProjects from './Pages/admin/CasesProjects';
import SingleRequestPage from './Pages/admin/singleRequest/SingleRequestPage';
import SingleReviewPage from './Pages/admin/signleFeedback/SingleReviewPage';
import SingleUIProject from './Pages/admin/SingleUIProject';
import AddNewProjectUI from './Pages/admin/AddNewProjectUI';
import SingleCaseStudyPage from './Pages/admin/SingleCaseStudyPage';
import HomeData from './Pages/admin/HomeData';
import AboutPageData from './Pages/admin/AboutPageData';
import ResumeData from './Pages/admin/ResumeData';
import LazyHome from './layout/lazyload/lazyHome/LazyHome';
import LazyUI from './layout/lazyload/lazyUI/LazyUI';
import SingleProjectLazy from './layout/lazyload/SingleProjectLazy';
import LazyAbout from './layout/lazyload/LazyAbout';
import LazyResume from './layout/lazyload/LazyResume';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './main.css';
import LazyAdddFeedback from './layout/lazyload/LazyAdddFeedback';
import ErrorPage from './Pages/visitor/errorPage/ErrorPage';


const Home = lazy(() => import('./Pages/visitor/home/Home'));
const UI = lazy(() => import('./Pages/visitor/uiDesigns/UIDesign'));
const CaseStudy = lazy(() => import('./Pages/visitor/caseStudy/CaseStudy'));
const SingleProject = lazy(() => import('./Pages/visitor/singleUIPage/SingleUIPage'))
const About = lazy(() => import('./Pages/visitor/about/About'));
const Resume = lazy(() => import('./Pages/visitor/resume/Resume'));
const AddFeedback = lazy(()=> import('./Pages/visitor/addFeedback/AddFeedback'));

function App() {

  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {

    const online = () => {
      setStatus(true);
    };
    const offline = () => {
      setStatus(false);
    };

    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {  
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };

  }, []);


  const NetRequired = ({ children }) => (
    status ? children : <h1>Lost Internet Connection...!</h1>
  );


  const HomePage = 
  <Suspense fallback={<LazyHome />}>
    <Home />
  </Suspense>;

  const UIDesignPage = 
  <Suspense fallback={<LazyUI header={true} />}>
    <UI />
  </Suspense>;

  const CaseStudyPage = 
  <Suspense fallback={<LazyUI header={false} />}>
    <CaseStudy />
  </Suspense>;

  const SingleProjectPage = 
  <Suspense fallback={<SingleProjectLazy />}>
    <SingleProject />
  </Suspense>;

  const AboutPage = 
  <Suspense fallback={<LazyAbout />}>
    <About />
  </Suspense>;

  const ResumePage = 
  <Suspense fallback={<LazyResume />}>
    <Resume />
  </Suspense>;

  const AddFeedbackPage = 
  <Suspense fallback={<LazyAdddFeedback />}>
    <AddFeedback />
  </Suspense>;

  return (
      <NetRequired>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='home' element={HomePage} />
            <Route path='ui/*' element={UIDesignPage} />
            <Route path='ui/:ID' element={SingleProjectPage} />
            <Route path='cases/*' element={CaseStudyPage} />
            <Route path='cases/:ID' element={SingleProjectPage} />
            <Route path='about-me' element={AboutPage} />
            <Route path='resume' element={ResumePage} />
          </Route>
          <Route path='add-feedback' element={AddFeedbackPage} />
          <Route path='add-feedback/thanks' element={<ThanksForFeedack />} />
          <Route path='new-project' element={<NewProject />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' index element={<AdminHome />} />
            <Route path='requests/*' element={<Requests />} />
            <Route path='requests/:ID' element={<SingleRequestPage />} />
            <Route path='allfeedbacks/*' element={<AllFeedbacks />} />
            <Route path='allfeedbacks/:ID' element={<SingleReviewPage />} />
            <Route path='uiprojects/*' element={<UIPage />} />
            <Route path='uiprojects/add' element={<AddNewProjectUI type='ui' state='new' />} />
            <Route path='uiprojects/:ID' element={<SingleUIProject type='ui' />} />
            <Route path='casesproejects/*' element={<CasesProjects  />} />
            <Route path='casesproejects/add' element={<AddNewProjectUI type='case-study' state='new' />} />
            <Route path='casesproejects/:ID' element={<SingleCaseStudyPage type='case-study' />} />
            <Route path='homedata' element={<HomeData />} />
            <Route path='aboutdata' element={<AboutPageData />} />
            <Route path='resumedata' element={<ResumeData />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path='/*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      </NetRequired>
    );
}

export default App;

// 
{/* <Route path='admin'>
<Route path='' element={<AdminLayout />}>
  <Route path='' index element={<AdminHome />} />
  <Route path='requests/*' element={<Requests />} />
  <Route path='requests/:ID' element={<SingleRequestPage />} />
  <Route path='allfeedbacks/*' element={<AllFeedbacks />} />
  <Route path='allfeedbacks/:ID' element={<SingleReviewPage />} />
  <Route path='uiprojects/*' element={<UIPage />} />
  <Route path='uiprojects/add' element={<AddNewProjectUI type='ui' state='new' />} />
  <Route path='uiprojects/:ID' element={<SingleUIProject type='ui' />} />
  <Route path='casesproejects/*' element={<CasesProjects  />} />
  <Route path='casesproejects/add' element={<AddNewProjectUI type='case-study' state='new' />} />
  <Route path='casesproejects/:ID' element={<SingleCaseStudyPage type='case-study' />} />
  <Route path='homedata' element={<HomeData />} />
  <Route path='aboutdata' element={<AboutPageData />} />
  <Route path='resumedata' element={<ResumeData />} />
</Route>
</Route> */}