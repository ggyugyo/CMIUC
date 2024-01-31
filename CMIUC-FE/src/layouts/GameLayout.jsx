export const GameLayout = ({ children }) => {
  return (
    <div
      className={`relative w-[1900px] h-[900px] overflow-hidden flex justify-center items-center`}
    >
      {children}
    </div>
  );
};
