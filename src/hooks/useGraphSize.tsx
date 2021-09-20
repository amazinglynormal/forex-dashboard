import { useEffect, useState } from "react";

const useGraphSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [graphSize, setGraphSize] = useState({
    width: 300,
    height: 600,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = windowSize;
    if (width < 1024) {
      setGraphSize({
        width: width - 50,
        height: width - 50,
      });
    }
  }, [windowSize]);

  return graphSize;
};

export default useGraphSize;
