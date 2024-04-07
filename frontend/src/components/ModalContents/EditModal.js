import React from "react";

export default function EditModal({ onClose, handleImageChange }) {
  const onAction = (event) => {
    handleImageChange(event);
    onClose();
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1 className="text-lg font-semibold text-center">
        Manage Profile Image
      </h1>
      <p className="text-sm">Choose an action for your profile image:</p>
      <div className="flex gap-2">
        <label className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md cursor-pointer">
          Change
          <input
            id="dropzone-file"
            name="image"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(event) => onAction(event)}
          />
        </label>

        <button
          className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md"
          onClick={() => onAction(null)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
