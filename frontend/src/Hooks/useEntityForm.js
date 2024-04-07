import { useEffect } from "react";
import useAsyncRequest from "./useAsyncRequest";
import request from "../requests/request";
import { useSelector } from "react-redux";

function useEntityForm({ entity, id, isEditing, reset }) {
  const token = useSelector((state) => state.auth.current.user.jwt);
  const { onRequest, isSuccess, isLoading, result } = useAsyncRequest();
  const fetchData = async () => {
    return await request.get({ entity: entity + "/" + id, token });
};
  useEffect(() => {
   
    if (id ) {
      onRequest(fetchData());
    }
  }, [id]);

  const createRequest = async (data) => {
    return await request.createAndUpload({
      entity: entity,
      token: token,
      jsonData: data,
    });
  };

  const patchRequest = async (data) => {
    return await request.updateAndUpload({
      entity: entity,
      token: token,
      id: id,
      jsonData: data,
    });
  };

  const onSubmit = async (formData) => {
    try {
      const callback = isEditing
        ? patchRequest(formData)
        : createRequest(formData);
      onRequest(callback);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  return { result: isEditing ? result: null, onSubmit, isLoading, isSuccess };
}

export default useEntityForm;
