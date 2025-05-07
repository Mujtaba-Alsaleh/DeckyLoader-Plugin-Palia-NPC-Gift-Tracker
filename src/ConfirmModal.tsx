// ConfirmTestModal.tsx
import { ConfirmModal, TextField } from "@decky/ui";
import { callable } from "@decky/api";
import { FC, useState } from "react";

interface ConfirmEditModalProps {
  closeModal: () => void;
  giftIndex:number;
  npcName:string
}
const SaveModalData = callable<[string,number,string],any>("save_modal_entry")

const ConfirmEditModal: FC<ConfirmEditModalProps> = ({ npcName,giftIndex,closeModal }) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = async () => {
    //onConfirm(inputValue);  // send value back
    await SaveModalData(npcName,giftIndex,inputValue)
    
    closeModal(); // Close the modal
  };
  

  return (
    <ConfirmModal
      strTitle="Editing Gift"
      strDescription={`Enter new gift for ${npcName}, slot ${giftIndex + 1}`}
      strOKButtonText="Save"
      onCancel={closeModal}
      onOK={handleConfirm}
    >
      <TextField
        label="Insert new gift name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </ConfirmModal>
  );
};

export default ConfirmEditModal;
