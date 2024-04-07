import { IMAGE_BASE_URL } from "../../utils/BASE_CONFIG";
import Modal from "../../global/Modal";
import CreateIcon from '@mui/icons-material/Create';
import EditModal from "../ModalContents/EditModal";

function FileInput({ onChange, value }) {
  let src;

  if (value) {
    if (typeof value === "string") {
      // If value is a string, check if it's not equal to 'undefined'
      if (value !== "undefined") {
        // Construct image URL from IMAGE_BASE_URL and value
        src = IMAGE_BASE_URL + value.replace("public/", "");
      } else {
        // If value is 'undefined', set src to null
        src = null;
      }
    } else {
      // If value is not a string (e.g., it's a File or Blob object), create a temporary URL
      src = URL.createObjectURL(value);
    }
  } else {
    // If value doesn't exist (i.e., it's null or undefined), set src to null
    src = null;
  }

  const handleChangeImage = (event) => {
    let file;
    if(event)
       file = event.target.files[0];
    else
      file = null;
    onChange(file);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {src ? (
        <div className="overflow-hidden w-52 h-52 relative">
          <Modal>
                <Modal.Open opens='file-input'>
                    <button type="button" className='text-primary rounded-full p-1 absolute right-0 shadow-lg shadow-slate-400	' >
                    <CreateIcon />
                    </button>
                </Modal.Open>
                <Modal.Window name='file-input'>
                  <EditModal handleImageChange={handleChangeImage}/>
                </Modal.Window>
            </Modal>
          <img
            src={src}
            alt="imagePreview"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-max-xl lg:w-3/6 h-44 cursor-pointer rounded-md bg-[#F5F7F9] border border-[#E5E5E5] text-[#313131] text-sm"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <br />
            <svg
              className="w-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="#5A6DFC"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            name="image"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            defaultValue={value}
            onChange={(event) => handleChangeImage(event)}
          />
          <br />
        </label>
      )}
    </div>
  );
}

export default FileInput;
