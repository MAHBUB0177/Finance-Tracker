import axiosInstance from ".";




export const GetTransactionsInfo = () => {
    let url = `transactions`;
    return axiosInstance.get(url);
  };

  // export const GetAllTransaction = (currentPageNumber: number, pageSize: number, payload: any) => {
   

  //   let url =
  //   'transactions' +
  //   `?_page=${currentPageNumber}&limit=${pageSize}`;
  // return axiosInstance.get(url, payload);
  // };

  export const GetAllTransaction = (
    currentPageNumber: number,
    pageSize: number,
    payload: any
  ) => {
    const url = 'transactions';
  
    return axiosInstance.get(url, {
      params: {
        ...payload,
        _page: currentPageNumber,
        limit: pageSize,
        
      },
    });
  };
  
  