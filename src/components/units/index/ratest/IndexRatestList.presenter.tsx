import Typography from "@mui/material/Typography";
import IndexRatestListItem from "./IndexRatestListItem";
import type { IindexRatestListProps } from "./IndexRatestList.types";
import * as S from "./IndexRatestList.styles";
import IndexRatestSkeleton from "./IndexRatestSkeleton";

export default function IndexRatestListUI({
  data,
}: IindexRatestListProps): JSX.Element {
  return (
    <S.Ratest>
      <Typography variant="h3" mb={2}>
        What's New
      </Typography>
      {data === undefined
        ? [1, 2, 3, 4, 5, 6].map((el) => <IndexRatestSkeleton key={el} />)
        : data.map((el) => <IndexRatestListItem key={el.id} data={el} />)}
    </S.Ratest>
  );
}
