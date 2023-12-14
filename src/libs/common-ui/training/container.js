import { useState, useEffect } from "react";
import { fetchTrainingList } from "../../api/commonapi";

const useTraining = () => {
  const [trainingList, setTrainingList] = useState();
  const [loading, SetLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const getTrainingList = async () => {
    const response = await fetchTrainingList();
    setTrainingList(response);
    SetLoading(false);
  };

  useEffect(() => {
    getTrainingList();
  }, []);

  return { trainingList, loading, formLoading, setFormLoading };
};
export default useTraining;
