import { Outlet } from 'react-router-dom';
import Header from '../components/site/Header.jsx';
import Footer from '../components/site/Footer.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
