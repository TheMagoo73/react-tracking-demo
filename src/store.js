import React, { createContext, useReducer } from "react";

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPMENT_NUMBER':
            return {
                ...state,
                shipmentNumber: action.payload
            };
        case 'SET_SHIPMENT_INFO':
            return {
                ...state,
                shipmentInfo: action.payload
            }
        case 'SET_PARCEL_NUMBER':
            return {
                ...state,
                parcelNumber: action.payload
            }
        default:
            return state;
    }
}

const initialState = {
    shipmentNumber: '',
    parcelNumber: '',
    shipmentInfo: undefined
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;