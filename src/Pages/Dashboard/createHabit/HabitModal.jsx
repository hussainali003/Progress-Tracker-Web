import Modal from "react-modal";
import HabitForm from "./HabitForm";

export default function HabitModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
      <HabitForm onClose={onClose} />
    </Modal>
  );
}
