import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { BoardListItemProps } from "./BoardList.types";
import * as Styled from "./BoardList.styles";

export default function BoardListItem({ el }: BoardListItemProps): JSX.Element {
  return (
    <Link href={`/free/${el.id}`}>
      <a>
        <Card>
          <CardActionArea>
            <Styled.BoardListItemImg>
              <Image
                objectFit="cover"
                layout="fill"
                src={
                  el.thumb === "" || el.thumb === undefined
                    ? "//placeholder-image.jpg"
                    : el.thumb
                }
              />
            </Styled.BoardListItemImg>
            <CardContent>
              <Styled.BoardListItemTitle variant="h3" mb={2}>
                {el.title}
              </Styled.BoardListItemTitle>
              <Styled.BoardListItemSummary variant="body2">
                {el.summary}
              </Styled.BoardListItemSummary>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Typography variant="body2" color="GrayText" p={1}>
              {el.writer +
                " • " +
                format(el.createdAt.toDate(), "yyyy. MM. dd", {
                  locale: ko,
                })}
            </Typography>
          </CardActions>
        </Card>
      </a>
    </Link>
  );
}
