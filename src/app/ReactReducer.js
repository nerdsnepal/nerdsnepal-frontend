'use client'
import { Provider } from "react-redux";
import {store} from "./state/store";
import React from "react";
import { CssBaseline } from "@mui/material";


const ReactReducerProvider = ({children}) => {
    return ( 
        <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
            {children}
        </Provider>
     </React.Fragment>        
        );
}
 
export default ReactReducerProvider;