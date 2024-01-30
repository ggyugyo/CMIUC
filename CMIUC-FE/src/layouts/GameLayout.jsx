// CSS 추가
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";

export const GameLayout = ({ children }) => {
  return (
    <div className={`relative w-[1900px] h-[900px] overflow-hidden`}>
      <ThemeProvider theme={original}>{children}</ThemeProvider>
    </div>
  );
};
