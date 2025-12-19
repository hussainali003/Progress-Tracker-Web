import Modal from "react-modal";
import ModalForm from "./ModalForm";

export default function HabitDetailModal({ isModalOpen, onClose }) {
  return (
    <Modal
      isOpen={isModalOpen}
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: {
          top: "5%",
          bottom: "5%",
          left: "30%",
          right: "30%",
          border: "none",
          padding: 0,
          backgroundColor: "#1A1A1A",
        },
      }}
    >
      <ModalForm onClose={onClose} />
    </Modal>
  );
}
