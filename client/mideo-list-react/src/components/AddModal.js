import Modal from 'react-modal';

function AddModal({ closeModal, watchable }) {
	const handleCancel = () => {
        closeModal();
    };

    return (
        <div className="modal-content">
            <h2>Add</h2>
            {/* Add your modal content here */}
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddModal;