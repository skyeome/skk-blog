import { Skeleton, Space } from "antd";
import Typography from "@mui/material/Typography";
import IndexRatestListItem from "./IndexRatestListItem";
import type { IindexRatestListProps } from "./IndexRatestList.types";
import * as S from "./IndexRatestList.styles";

export default function IndexRatestListUI({
  data,
}: IindexRatestListProps): JSX.Element {
  if (data === undefined)
    return (
      <S.Ratest>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
          <S.RatestListItem key={el}>
            <Space>
              <Skeleton.Image active />
            </Space>
            <br />
            <br />
            <Skeleton active />
          </S.RatestListItem>
        ))}
      </S.Ratest>
    );
  return (
    <S.Ratest>
      <Typography variant="h3" mb={2}>
        What's New
      </Typography>
      {data.map((el) => (
        <IndexRatestListItem key={el.id} data={el} />
      ))}
    </S.Ratest>
  );
}
