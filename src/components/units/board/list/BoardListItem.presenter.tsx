import Link from "next/link";
import * as S from "../../index/ratest/IndexRatestList.styles";
import Image from "next/image";
import type { IBoard } from "../../../../commons/types/generated/types";
import { getDate } from "../../../../commons/libraries/utils";
import { BoardListItemImg } from "./BoardList.styles";

interface IBoardListItemProps {
  el: IBoard;
  colCounts: number;
}
export default function BoardListItem(props: IBoardListItemProps): JSX.Element {
  return (
    <S.RatestListItem key={props.el._id} counts={2}>
      <Link href={`/free/${props.el._id}`}>
        <a>
          <BoardListItemImg>
            <Image
              objectFit="scale-down"
              layout="fill"
              src={
                props.el.images?.length === 0 ||
                props.el.images === undefined ||
                props.el.images === null
                  ? "/placeholder-image.jpg"
                  : `https://storage.googleapis.com/${props.el.images[0]}`
              }
            />
          </BoardListItemImg>
          <S.RatestListItemTitle>{props.el.title}</S.RatestListItemTitle>
          <S.RatestListItemDate>
            {getDate(props.el.createdAt)}
          </S.RatestListItemDate>
        </a>
      </Link>
    </S.RatestListItem>
  );
}
