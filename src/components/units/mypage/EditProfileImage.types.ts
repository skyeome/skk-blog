import type { Dispatch, SetStateAction } from "react";

export interface EditProfileImageProps {
  image?: string;
  newImage?: string;
  setImage: Dispatch<SetStateAction<string | undefined>>;
}
