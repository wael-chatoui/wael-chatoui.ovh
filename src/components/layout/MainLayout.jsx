import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useViewMode } from '../../context/ViewModeContext';

const MainLayout = () => {
  const { isTechnical } = useViewMode();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isTechnical ? 'bg-[#0B1120]' : 'bg-slate-900'
    }`}>
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />

      {/* Decorative background grid for technical view */}
      {isTechnical && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
