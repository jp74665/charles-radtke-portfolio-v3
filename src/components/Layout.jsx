import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-ink">
      <Navbar />
      <main className="flex-grow flex flex-col bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
