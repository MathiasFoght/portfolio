import Home from "@/app/views/home/page";
import Techstack from "@/app/views/techstack/page";
import Projects from "@/app/views/projects/page";
import Contact from "@/app/views/contact/page";
import About from "@/app/views/about/page";

export default function Initialize() {
  return (
    <div>
        <Home />
        < Techstack />
        < About />
        < Projects />
        < Contact />
    </div>
  );
}
