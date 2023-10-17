'use client'
import { Provider } from "react-redux";
import {store,persistor, persitor_store} from "./state/store";
import { PersistGate } from "redux-persist/integration/react";



const ReactReducerProvider = ({children}) => {
    return ( 
   
        <Provider store={store}>
            {children}
        </Provider>);
}
 
export default ReactReducerProvider;