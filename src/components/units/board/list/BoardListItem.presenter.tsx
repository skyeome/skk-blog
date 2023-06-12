import Link from "next/link";
import * as S from "../../index/ratest/IndexRatestList.styles";
import Image from "next/image";
// import type { IBoard } from "../../../../commons/types/generated/types";
import { getDate } from "../../../../commons/libraries/utils";
import { BoardListItemImg } from "./BoardList.styles";
import type { IBoardListItemProps } from "./BoardList.types";

export default function BoardListItem(props: IBoardListItemProps): JSX.Element {
  return (
    <S.RatestListItem key={props.boardId} counts={2}>
      <Link href={`/free/${String(props.boardId)}`}>
        <a>
          <BoardListItemImg>
            <Image
              objectFit="scale-down"
              layout="fill"
              src={
                String(props.el.images[0]) !== ""
                  ? String(props.el.images[0])
                  : "/placeholder-image.jpg"
              }
            />
          </BoardListItemImg>
          <S.RatestListItemTitle>{props.el.title}</S.RatestListItemTitle>
          <S.RatestListItemDate>
            {getDate(props.el.createdAt?.toDate())}
          </S.RatestListItemDate>
        </a>
      </Link>
    </S.RatestListItem>
  );
}
