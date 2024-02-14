import { useEffect } from "react";

export const PreventSetting = () => {
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const blockKeys = (event) => {
    if (event.keyCode === 116) {
      event.preventDefault();
    } else if (
      event.keyCode === 17 &&
      (event.keyCode === 67 || event.keyCode === 82)
    ) {
      event.preventDefault();
    }
  };

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
  };

  const blockF12Key = (e) => {
    if (e.keyCode === 123) {
      e.preventDefault();
      e.returnValue = false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", blockKeys);
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    document.addEventListener("keydown", blockF12Key);

    return () => {
      document.removeEventListener("keydown", blockKeys);
      window.removeEventListener("beforeunload", preventClose);
      window.removeEventListener("popstate", preventGoBack);
      document.removeEventListener("keydown", blockF12Key);
    };
  }, []);
};
