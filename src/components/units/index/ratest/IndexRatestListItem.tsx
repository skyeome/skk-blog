import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { IndexRatestListItemProps } from "./IndexRatestListItem.types";
import * as S from "./IndexRatestListItem.styles";

function IndexRatestListItem({ data }: IndexRatestListItemProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  let summary = data.summary ?? "";
  const maxLength = matches ? 80 : 58; // 최대 길이 설정

  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength) + "... 더보기"; // 글자수 제한
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
                data.thumb === "" || data.thumb === undefined
                  ? "//placeholder-image.jpg"
                  : data.thumb
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
              {summary}
            </Typography>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
}

export default IndexRatestListItem;
