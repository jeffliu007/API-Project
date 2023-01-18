import "./CreateSpotModal.css";
import { OpenModalButtonCreateForm } from "../OpenModalButton";
import SpotModalForm from "./SpotModalForm";

export const AddNewSpotModal = () => {
  return (
    <div className="Create-Spot-Button">
      <OpenModalButtonCreateForm
        buttonText="Skybnb your home"
        modalComponent={<SpotModalForm />}
        className="Create-Spot-Button"
      />
    </div>
  );
};

export default AddNewSpotModal;