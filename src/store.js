import React, { createContext, useReducer } from "react";

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPMENT_NUMBER':
            return {
                ...state,
                shipmentNumber: action.payload
            };
        case 'GET_SHIPMENT_INFO':
            // In production code, we'd query the GraphQL to get the shipment information
            const shipmentInfo = {
                carrier: 'DPD',
                consNo: state.shipmentNumber,
                parcels: ['123', '321', 'FOO']
            }
            
            return {
                ...state,
                shipmentInfo
            }
        case 'SET_VALIDATION_ERROR':
            return {
                ...state,
                validationError: action.payload
            }
        case 'CLEAR_SHIPMENT_INFO':
            return {
                ...state,
                shipmentInfo: undefined
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
    shipmentInfo: undefined,
    validationError: ''
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