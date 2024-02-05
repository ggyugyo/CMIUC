const customModalStyles = {
    content: {
      display: "flex",
      justifyContent: "center",
      width: "70%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "auto",
      padding: "0",
      border: "none",
    },
    overlay: {
      backgroundColor: "blue",
      zIndex: "9999",
    },
  };

export default function HeadLayout() {
  return (
    <span style={customModalStyles}>
      <h1>헤드 레이아웃</h1>
    </span>
  );
}