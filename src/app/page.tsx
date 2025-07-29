import HomeSection from "@/app/sections/home/page";
import TechstackSection from "@/app/sections/techstack/page";
import AboutSection from "@/app/sections/about/page";
import ProjectsSection from "@/app/sections/projects/page";
import ContactSection from "@/app/sections/contact/page";

export default function Initialize() {
  return (
    <div>
        <HomeSection />
        < TechstackSection/>
        < AboutSection />
        < ProjectsSection />
        < ContactSection />
    </div>
  );
}
