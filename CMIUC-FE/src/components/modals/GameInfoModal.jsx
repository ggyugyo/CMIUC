import React, { useState } from "react";
import Modal from "react-modal";

const GameInfoModal = ({ images, descriptions }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Modal isOpen={true}>
      <button onClick={handlePrevPage} disabled={currentPage === 0}>
        Previous
      </button>
      <img src={images[currentPage]} alt="Game Image" />
      <p>{descriptions[currentPage]}</p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === images.length - 1}
      >
        Next
      </button>
    </Modal>
  );
};

export default GameInfoModal;
