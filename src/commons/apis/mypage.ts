import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../libraries/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import type { BoardRatest } from "../../components/units/index/ratest/IndexRatestList.types";
import type { ProfileForm } from "../../components/units/mypage/EditProfileForm.types";
import { BoardConverter, UserInfoConverter } from "../libraries/firestore";
import { updatePassword, updateProfile } from "firebase/auth";

export const getMyInfo = async (writer?: string) => {
  const writerRef = doc(db, "User", writer ?? "").withConverter(
    UserInfoConverter
  );
  const writerSn = await getDoc(writerRef);
  if (writerSn.exists()) {
    const userData = writerSn.data();
    return userData;
  }
};

export const getMyRatestData = async (writer?: string) => {
  const data: BoardRatest[] = [];
  const q = query(
    collection(db, "Board"),
    where("writer", "==", writer),
    orderBy("createdAt", "desc"),
    limit(6)
  ).withConverter(BoardConverter);
  const querySnapshot = await getDocs(q);
  const datas = querySnapshot.docs;

  const userData = await getMyInfo(writer);
  if (userData !== undefined) {
    datas.forEach(async (doc) => {
      const post = doc.data();
      data.push({
        ...post,
        id: doc.id,
        writer: userData.nickname,
      });
    });
  }

  return data;
};

function removeEmptyValues(obj: { nickname?: string; desc?: string }) {
  if (obj.nickname === undefined || obj.nickname === "") delete obj.nickname;
  if (obj.desc === undefined) delete obj.desc;
  return obj;
}

export const updateMyInfo = async (
  data: ProfileForm & { uid: string; image?: string }
) => {
  const myInfoRef = doc(db, "User", data.uid).withConverter(UserInfoConverter);
  const updateData = removeEmptyValues({
    nickname: data.nickname,
    desc: data.desc,
  });
  const timestamp = new Date().getTime(); // 현재 시간을 밀리초로 변환

  if (data.image !== undefined) {
    // 이미지가 있는경우
    const res = await fetch(data.image);
    const blob = await res.blob();
    const storageRef = ref(storage, `images/${data.uid}_${timestamp}`);

    // 파일을 업로드 합니다.
    await uploadBytes(storageRef, blob);
    const avatar = await getDownloadURL(storageRef);
    // 프로필 정보에도 추가
    if (auth.currentUser !== null)
      await updateProfile(auth.currentUser, { photoURL: avatar });

    // 기존 아바타 이미지는 삭제
    const docSn = await getDoc(myInfoRef);
    if (docSn.exists()) {
      const fileName = docSn.data().avatarName;
      if (fileName !== undefined) await deleteProfileObject(fileName);
    }
    await updateDoc(myInfoRef, {
      avatarName: `${data.uid}_${timestamp}`,
      ...updateData,
    });
  } else {
    // 이미지가 없는경우
    await updateDoc(myInfoRef, updateData);
  }
  // 비밀번호를 변경할 경우
  if (data.password !== undefined && auth.currentUser !== null)
    await updatePassword(auth.currentUser, data.password);
};

// 이전 프로필 사진 파일만 삭제
export const deleteProfileObject = async (image: string) => {
  const imgRef = ref(storage, `images/${image}`);

  // 파일 삭제
  await deleteObject(imgRef);
};

// 파일 삭제 및 프로필 아바타 이미지 url 삭제
export const deleteProfileImage = async (data: {
  uid: string;
  image: string;
}) => {
  const docRef = doc(db, "User", data.uid);
  const imgRef = ref(storage, `images/${data.image}`);

  // 파일 삭제
  await deleteObject(imgRef);
  // 프로필 사진 url 삭제
  await updateDoc(docRef, {
    avatar: deleteField(),
    avatarName: deleteField(),
  });
};
