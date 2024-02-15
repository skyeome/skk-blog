import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MarkdownIt from "markdown-it";
import type { IndexRatestListItemProps } from "./IndexRatestListItem.types";
import * as S from "./IndexRatestListItem.styles";

function IndexRatestListItem({ data }: IndexRatestListItemProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const md = new MarkdownIt();
  const markdownText = data.contents;
  const htmlText = md.render(markdownText);

  const maxLength = matches ? 80 : 58; // 최대 길이 설정
  // HTML에서 텍스트 추출
  let text = new DOMParser().parseFromString(htmlText, "text/html").body
    .textContent;
  if (text !== null && text.length > maxLength) {
    text = text.substring(0, maxLength) + "... 더보기"; // 글자수 제한
  }

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
                  : "//placeholder-image.jpg"
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
            <Typography
              variant="h3"
              my={{ xs: 1 }}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
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
