import Home from "@/app/views/home/page";
import About from "@/app/views/about/page";
import Projects from "@/app/views/projects/page";
import Contact from "@/app/views/contact/page";
import Technology from "@/app/views/tech/page";

export default function Initialize() {
  return (
    <div>
        <Home />
        < About />
        < Projects />
        < Technology />
        < Contact />
    </div>
  );
}
