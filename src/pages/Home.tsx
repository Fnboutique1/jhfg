import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Courses from '@/sections/Courses';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="about">
        <About />
      </div>
      <Courses />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}
