import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MarkdownIt from "markdown-it";
import type { IndexRatestListItemProps } from "./IndexRatestListItem.types";
import * as S from "./IndexRatestListItem.styles";

function IndexRatestListItem({ data }: IndexRatestListItemProps) {
  const md = new MarkdownIt();
  const markdownText = data.contents;
  const htmlText = md.render(markdownText);

  // HTML에서 텍스트 추출
  const text = new DOMParser().parseFromString(htmlText, "text/html").body
    .textContent;

  return (
    <S.RatestListItem key={data.id}>
      <div>
        <Link href={`/free/${data.id}`}>
          <S.RatestItemThumb>
            <Image
              objectFit="cover"
              layout="fill"
              src={
                data.images[0] !== ""
                  ? data.images[0]
                  : "https://s3.ap-northeast-2.amazonaws.com/skkblog.com/placeholder-image.jpg"
              }
            />
          </S.RatestItemThumb>
        </Link>
      </div>
      <S.RatestItemDesc>
        <Typography variant="body2" color="GrayText">
          {data.writer}
          {` • `}
          {format(data.createdAt.toDate(), "yyyy. MM. dd", {
            locale: ko,
          })}
        </Typography>
        <Typography variant="h3" mt={2} mb={2}>
          {data.title}
        </Typography>
        <Typography variant="body2" color="GrayText">
          {text}
        </Typography>
      </S.RatestItemDesc>
    </S.RatestListItem>
  );
}

export default IndexRatestListItem;
