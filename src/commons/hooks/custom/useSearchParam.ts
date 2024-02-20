import { useRouter } from "next/router";

function useSearchParam(param: string) {
  const router = useRouter();
  // parameter 가져오기
  const paramName = router.query[param];
  let value = "";
  if (paramName === undefined) value = "";
  if (typeof paramName === "string") value = paramName;
  if (typeof paramName === "object") value = paramName[0];
  return value;
}

export default useSearchParam;
