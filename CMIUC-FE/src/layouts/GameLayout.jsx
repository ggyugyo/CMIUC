export const GameLayout = ({ children }) => {
  // const [background, setBackground] = useState(false)

  return (
    <div
      // className={`relative w-[1900px] h-[900px] bg-slate-300 overflow-hidden`}
      className={`relative w-[1900px] h-[900px] bg-slate-300 overflow-hidden`}
    >
      {children}
    </div>
  );
};
