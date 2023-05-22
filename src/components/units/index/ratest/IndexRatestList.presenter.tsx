import Image from "next/image";
import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./IndexRatestList.styles";
import type { IindexRatestListProps } from "./IndexRatestList.types";
import Link from "next/link";
import { Skeleton, Space } from "antd";

export default function IndexRatestListUI(
  props: IindexRatestListProps
): JSX.Element {
  return (
    <>
      <S.RatestTitle>What's New</S.RatestTitle>
      <S.RatestList>
        {props.data !== undefined
          ? props.data?.fetchBoards.map((el) => (
              <S.RatestListItem key={el._id}>
                <Link href={`/free/${el._id}`}>
                  <a>
                    <Image
                      width={1024}
                      height={699}
                      src={
                        el.images?.length === 0 ||
                        el.images === undefined ||
                        el.images === null
                          ? "/placeholder-image.jpg"
                          : `/${el.images[0]}`
                      }
                    />
                    <S.RatestListItemTitle>{el.title}</S.RatestListItemTitle>
                    <S.RatestListItemDate>
                      {getDate(el.createdAt)}
                    </S.RatestListItemDate>
                  </a>
                </Link>
              </S.RatestListItem>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
              <S.RatestListItem key={el}>
                <Space>
                  <Skeleton.Image active />
                </Space>
                <br />
                <br />
                <Skeleton active />
              </S.RatestListItem>
            ))}
      </S.RatestList>
      <S.Ratest></S.Ratest>
    </>
  );
}
