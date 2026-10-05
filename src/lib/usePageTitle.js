import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Saurabh Kumar` : "Saurabh Kumar | Full Stack Developer";
  }, [title]);
}
