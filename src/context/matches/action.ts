import { API_ENDPOINT } from "../../config/constants";
export const fetchMacthes = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log('Error fetching matches:',error);
    dispatch({ type: "FETCH_MATCHES_FAILURE", payload:'unable to get matches'});
  }
};