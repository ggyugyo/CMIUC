// import blueWall from "../assets/img/blue1.png";
import brownWall from "../assets/img/newBrown.png";


export const GameLayout = ({ children, backgroundImage }) => {
  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex justify-center items-center`}
      style={{
        backgroundImage: `url(${brownWall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};
