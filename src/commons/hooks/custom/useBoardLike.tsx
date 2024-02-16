import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../libraries/firebase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../stores";
import type { ShowToastParams } from "./useToast";

export const useBoardLike = (
  showToast: ShowToastParams
): {
  likeCount: number;
  liked: boolean;
  onClickLikeBtn: () => void;
} => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [user] = useRecoilState(userState);

  const onClickLikeBtn = async (): Promise<void> => {
    const boardId = router.query.boardId as string;
    if (user === null) {
      showToast("error", "로그인 해주시면 좋아요가 가능합니다.");
      return;
    }
    if (!liked) {
      try {
        await setDoc(doc(db, `Board/${boardId}/Like`, user.uid), {
          likedAt: serverTimestamp(),
        });
        setLiked(true);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    } else {
      try {
        await deleteDoc(doc(db, `Board/${boardId}/Like`, user.uid));
        setLiked(false);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
  };
  const getLikeCount = async (): Promise<
    Array<QueryDocumentSnapshot<DocumentData>> | undefined
  > => {
    const boardId = router.query.boardId as string;
    const q = query(collection(db, `Board/${boardId}/Like`));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

  useEffect(() => {
    getLikeCount()
      .then((res) => {
        if (res !== undefined) {
          setLikeCount(res.length);
          // console.log(res.length);
          res.forEach((el) => {
            if (user !== undefined && user !== null && el.id === user.uid) {
              setLiked(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [liked]);

  return {
    likeCount,
    liked,
    onClickLikeBtn,
  };
};
