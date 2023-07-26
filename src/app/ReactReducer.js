'use client'
import { Provider } from "react-redux";
import store from "./state/store";

const ReactReducer = ({children}) => {
    return ( <Provider store={store}>{children}</Provider>);
}
 
export default ReactReducer;