import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { site } from './config/site';
import { courses } from './data/courses';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Journey from './pages/Journey';
import Projects from './pages/Projects';
import Partnership from './pages/Partnership';
import Team from './pages/Team';
import Presentation from './pages/Presentation';
import NotFound from './pages/NotFound';

const pageTitles: Record<string, string> = {
  '/': 'Our Vision',
  '/roadmap': 'Learning Roadmap',
  '/courses': 'Courses',
  '/journey': 'Student Journey',
  '/projects': 'Student Project Showcase',
  '/partnership': 'Institutional Partnership',
  '/team': 'Our Team',
  '/presentation': 'Presentation',
};

function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const course = pathname.startsWith('/courses/')
      ? courses.find((item) => item.id === pathname.split('/')[2])
      : undefined;
    document.title = `${course?.title ?? pageTitles[pathname] ?? 'Page Not Found'} | ${site.name}`;
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="journey" element={<Journey />} />
          <Route path="projects" element={<Projects />} />
          <Route path="partnership" element={<Partnership />} />
          <Route path="team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="presentation" element={<Presentation />} />
      </Routes>
    </BrowserRouter>
  );
}
