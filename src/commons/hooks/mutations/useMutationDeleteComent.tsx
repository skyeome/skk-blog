import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../libraries/firebase";

export const useMutationDeleteComment = (
  id: string
): {
  onClickDelete: () => Promise<void>;
} => {
  const onClickDelete = async (): Promise<void> => {
    void deleteDoc(doc(db, "BoardComment", id));
  };
  return {
    onClickDelete,
  };
};
