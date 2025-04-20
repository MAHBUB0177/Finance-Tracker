import axiosInstance from ".";




export const GetTransactionsInfo = () => {
    let url = `transactions`;
    return axiosInstance.get(url);
  };
