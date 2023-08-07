'use client'
import { Provider } from "react-redux";
import {store,persistor, persitor_store} from "./state/store";
import { PersistGate } from "redux-persist/integration/react";



const ReactReducerProvider = ({children}) => {
    return ( 
    //<Provider store={persitor_store}>
        <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor} >*/}
       {children}
        {/*</PersistGate>*/}
        {/*</Provider>*/}
        </Provider>);
}
 
export default ReactReducerProvider;