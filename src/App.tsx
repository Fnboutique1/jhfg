import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PortalPage from '@/pages/PortalPage';
import ConnectionPage from '@/pages/ConnectionPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-[100dvh] flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/courses"
                element={
                  <PageWrapper>
                    <CoursesPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/courses/:slug"
                element={
                  <PageWrapper>
                    <CourseDetailPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <AboutPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <ContactPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/portal"
                element={
                  <PageWrapper>
                    <PortalPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/connection"
                element={
                  <PageWrapper>
                    <ConnectionPage />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
