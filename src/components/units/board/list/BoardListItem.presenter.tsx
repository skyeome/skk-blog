import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { BoardListItemImg } from "./BoardList.styles";
import type { IBoardListItemProps } from "./BoardList.types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box/Box";

export default function BoardListItem({
  el,
}: IBoardListItemProps): JSX.Element {
  return (
    <Box key={el.id} mb={1}>
      <Link href={`/free/${el.id}`}>
        <a>
          <BoardListItemImg>
            <Image
              objectFit="cover"
              layout="fill"
              src={
                el.images[0] !== ""
                  ? el.images[0]
                  : "https://s3.ap-northeast-2.amazonaws.com/skkblog.com/placeholder-image.jpg"
              }
            />
          </BoardListItemImg>
          <Typography variant="body2" color="GrayText">
            {/* {el.writer}
            {` • `} */}
            {format(el.createdAt.toDate(), "yyyy. MM. dd", {
              locale: ko,
            })}
          </Typography>
          <Typography variant="h3" mt={2} mb={2}>
            {el.title}
          </Typography>
        </a>
      </Link>
    </Box>
  );
}
