interface IFetchBoardData {
  writer: string;
}

export const useQueryFetchBoard = async (): Promise<{
  data: IFetchBoardData;
}> => {
  return {
    data: {
      writer: "",
    },
  };
};
