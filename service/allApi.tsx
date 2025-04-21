import axiosInstance from ".";




export const GetTransactionsInfo = () => {
    let url = `transactions`;
    return axiosInstance.get(url);
  };


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

  export const EditTransaction = (
    currentPageNumber: number,
    pageSize: number,
    payload: any
  ) => {
    const url = 'transactions';
  
    return axiosInstance.put(url, {
      params: {
        ...payload,
        _page: currentPageNumber,
        limit: pageSize,
        
      },
    });
  };


  

  export const GetTransactionById = (id: string | number) => {
    const url = `transactions/${id}`;  // Using path parameter instead of query parameter
    return axiosInstance.get(url); 
  };
  export const GetTransactionEditById = (editId: string | number, payload: any) => {
    const url = `transactions/${editId}`;
    return axiosInstance.patch(url, payload); // pass payload in the second argument
  };
  
  export const DeleteTransactionById = (id: string | number) => {
    const url = `transactions/${id}`;
    return axiosInstance.delete(url);
  };
  
  export const AddTransactionItem = (payload: any) => {
    const url = `transactions`;
    return axiosInstance.post(url, payload); // pass payload in the second argument
  };