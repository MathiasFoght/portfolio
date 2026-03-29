import { redirect, RedirectType } from "next/navigation";

export default function CvPage(): never {
  redirect("/cv.pdf");
}
