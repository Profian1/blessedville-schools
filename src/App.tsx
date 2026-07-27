import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Academics from "./components/Academics";
import CampusTour from "./components/CampusTour";
import Facilities from "./components/Facilities";
import Achievements from "./components/Achievements";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import News from "./components/News";
import Events from "./components/Events";
import Admissions from "./components/Admissions";
import Faculty from "./components/Faculty";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileExperience from "./components/MobileExperience";

export default function App() {
  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <WhyChooseUs />
        <Academics />
        <CampusTour />
        <Facilities />
        <Achievements />
        <Gallery />
        <Testimonials />
        <News />
        <Events />
        <Admissions />
        <Faculty />
        <Contact />
      </main>
      <Footer />
      <MobileExperience />
    </div>
  );
}
