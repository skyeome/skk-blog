import IndexRatestListUI from "./IndexRatestList.presenter";
import { useQuery } from "react-query";
import getRatestData from "../../../../commons/apis/home";

export default function IndexRatestList(): JSX.Element {
  const { data } = useQuery({
    queryKey: ["board", "latest"],
    queryFn: getRatestData,
  });
  return <IndexRatestListUI data={data} />;
}
