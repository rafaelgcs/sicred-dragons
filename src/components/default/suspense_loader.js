import { useEffect } from "react";
import NProgress from "nprogress";

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="lazy-loader">
      <div className="icon-lazy-load"></div>
    </div>
  );
}

export default SuspenseLoader;
