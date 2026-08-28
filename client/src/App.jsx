import { useEffect, Component } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import PersonalTraining from './pages/public/PersonalTraining.jsx';
import Training from './pages/public/Training.jsx';
import WeightLoss from './pages/public/WeightLoss.jsx';
import StrengthConditioning from './pages/public/StrengthConditioning.jsx';
import WomensFitness from './pages/public/WomensFitness.jsx';
import Trainers from './pages/public/Trainers.jsx';
import CoreTeam from './pages/public/CoreTeam.jsx';
import TrainerDetail from './pages/public/TrainerDetail.jsx';
import Results from './pages/public/Results.jsx';
import Facilities from './pages/public/Facilities.jsx';
import Programs from './pages/public/Programs.jsx';
import Nutrition from './pages/public/Nutrition.jsx';
import BodyAssessment from './pages/public/BodyAssessment.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import FAQPage from './pages/public/FAQPage.jsx';
import Contact from './pages/public/Contact.jsx';
import BookConsultation from './pages/public/BookConsultation.jsx';
import Privacy from './pages/public/Privacy.jsx';
import Terms from './pages/public/Terms.jsx';
import NotFound from './pages/public/NotFound.jsx';

import AdminLogin from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Members from './pages/admin/Members.jsx';
import Plans from './pages/admin/Plans.jsx';
import POS from './pages/admin/POS.jsx';
import Attendance from './pages/admin/Attendance.jsx';
import Leads from './pages/admin/Leads.jsx';
import Appointments from './pages/admin/Appointments.jsx';
import AdminTrainers from './pages/admin/Trainers.jsx';
import AdminContent from './pages/admin/Content.jsx';
import AdminBlog from './pages/admin/Blog.jsx';
import AdminSettings from './pages/admin/Settings.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try { window.scrollTo(0, 0); } catch { /* older engines */ }
  }, [pathname]);
  return null;
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) { console.error('[fitx] page error:', error); }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
          <div className="card p-10 max-w-md w-full text-center">
            <h1 className="font-display font-bold text-2xl text-paper">Something broke on this page.</h1>
            <p className="text-sm text-muted mt-3 break-words">{String(this.state.error?.message || this.state.error)}</p>
            <button className="btn-primary w-full mt-6" onClick={() => window.location.reload()}>Reload</button>
            <Link to="/" className="block text-xs text-muted mt-4 hover:text-silver">Back to home</Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/training" element={<Training />} />
          <Route path="/personal-training" element={<PersonalTraining />} />
          <Route path="/weight-loss" element={<WeightLoss />} />
          <Route path="/strength-conditioning" element={<StrengthConditioning />} />
          <Route path="/womens-fitness" element={<WomensFitness />} />
          <Route path="/core-team" element={<CoreTeam />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:slug" element={<TrainerDetail />} />
          <Route path="/results" element={<Results />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/body-assessment" element={<BodyAssessment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="plans" element={<Plans />} />
          <Route path="pos" element={<POS />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leads" element={<Leads />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}
