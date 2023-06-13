import Image from "next/image";
import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./IndexRatestList.styles";
import type { IindexRatestListProps } from "./IndexRatestList.types";
import Link from "next/link";
import { Skeleton, Space } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  // infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

export default function IndexRatestListUI(
  props: IindexRatestListProps
): JSX.Element {
  return (
    <>
      <S.RatestTitle>What's New</S.RatestTitle>
      <Slider {...settings}>
        {props.data !== undefined
          ? props.data?.map((el) => (
              <S.RatestListItem key={el.id}>
                <Link href={`/free/${el.id}`}>
                  <a>
                    <Image
                      width={1024}
                      height={699}
                      src={
                        String(el.data().images[0]) !== ""
                          ? String(el.data().images[0])
                          : "/placeholder-image.jpg"
                      }
                    />
                    <S.RatestListItemTitle>
                      {el.data().title}
                    </S.RatestListItemTitle>
                    <S.RatestListItemDate>
                      {getDate(el.data().createdAt.toDate())}
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
      </Slider>
      <S.Ratest></S.Ratest>
    </>
  );
}
