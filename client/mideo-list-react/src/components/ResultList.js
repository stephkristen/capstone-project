import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddModal from "./AddModal";

function ResultList({ watchable, index }) {
    const imdbId = watchable.imdbId;
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal= () => {
        setModalOpen(false);
    };
    
    return (
        <tr key={index} color="white">
            <td>
                <img
                    src={watchable.posterURLs.original}
                    alt={watchable.title}
                    style={{ width: "100px", height: "100px" }}
                    className="mb-3"
                />
            </td>
            <td>
                <h5>
                <Link to={`/details/${imdbId}`}>{watchable.title}</Link>
                </h5>
                <p>{watchable.type}</p>
                <p>IMDB Rating: {watchable.imdbRating}/100</p>
            </td>
            <td>
                <p>{watchable.overview}</p>
            </td>
            <td>
                <button className="btn btn-secondary" onClick={openModal}>
                    Add
                </button>
            </td>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Modal"
            >
                <AddModal closeModal={closeModal} watchable={watchable} />
            </Modal>
        </tr>
    );
}

export default ResultList;