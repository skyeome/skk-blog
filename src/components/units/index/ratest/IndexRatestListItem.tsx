import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MarkdownIt from "markdown-it";
import type { IndexRatestListItemProps } from "./IndexRatestListItem.types";
import * as S from "./IndexRatestListItem.styles";
import Grid from "@mui/material/Grid";

function IndexRatestListItem({ data }: IndexRatestListItemProps) {
  const md = new MarkdownIt();
  const markdownText = data.contents;
  const htmlText = md.render(markdownText);

  // HTML에서 텍스트 추출
  const text = new DOMParser().parseFromString(htmlText, "text/html").body
    .textContent;

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      mb={3}
    >
      <Grid item xs={4} sm={3}>
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
      </Grid>
      <Grid item xs={8} sm={9}>
        <Typography variant="body2" color="GrayText">
          {data.writer +
            " • " +
            format(data.createdAt.toDate(), "yyyy. MM. dd", {
              locale: ko,
            })}
        </Typography>
        <Link href={`/free/${data.id}`}>
          <a>
            <Typography variant="h3" my={{ xs: 1, sm: 2 }}>
              {data.title}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {text}
            </Typography>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
}

export default IndexRatestListItem;
