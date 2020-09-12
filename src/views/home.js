import React, { useContext } from "react"
import { Context } from "../store"

export default function Home() {
    const [state, dispatch] = useContext(Context)

    const handleShipmentNumberChange = (evt) => {
        dispatch({
            type: 'SET_SHIPMENT_NUMBER',
            payload: evt.target.value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
 
        if(state.shipmentNumber === '') {
            dispatch({
                type: 'SET_VALIDATION_ERROR',
                payload: "Please enter a shipment number"
            })
        } else {
            dispatch({
                type: 'SET_VALIDATION_ERROR',
                payload: ''
            })
            // TODO: the shipment info from the gateway

            dispatch({
                type: 'GET_SHIPMENT_INFO',
            })
        }
    }

    const selectParcel = (evt) => {
        dispatch({
            type: 'SET_PARCEL_NUMBER',
            payload: evt.target.getAttribute("data-index")
        })
    }

    const clearSelectedParcel = () => {
        dispatch({
            type: 'SET_PARCEL_NUMBER',
            payload: ''
        })
    }

    const clearResults = (evt) => {
        dispatch({
            type: 'CLEAR_SHIPMENT_INFO'
        })
    }

    return (
        <>
        <small>Put header here!</small>
        {!state.shipmentInfo &&
            <form onSubmit={handleSubmit}>
                <h1>Parcel Details</h1>
    
                <label>
                    Got a tracking number?
                    <input 
                        type="text" 
                        placeholder="Enter it here"
                        onChange={handleShipmentNumberChange}
                        value={state.shipmentNumber}
                    />
                </label>
                {state.validationError !== '' &&
                    <div>{state.validationError}</div>
                }
                <input type="submit" value="Search" />
            </form>    
        }
        {(state.shipmentInfo) && (state.parcelNumber === '') &&
            <>
                <h1>Shipment: {state.shipmentNumber}</h1>
                {!state.shipmentInfo.parcels.length &&
                    <h2>No parcels in this shipment</h2>
                }
                {state.shipmentInfo.parcels.length === 1 &&
                    <>
                    <h2>Parcel</h2>
                    <p>{state.shipmentInfo.parcels[0]}</p>
                    </>
                }
                {state.shipmentInfo.parcels.length > 1 &&
                    <>
                        <h2>Parcels</h2>
                        <ul>
                        { 
                            state.shipmentInfo.parcels.map(p => {
                                return(
                                    <li key={p} data-index={p} onClick={selectParcel}>{p}</li>
                                )
                            })
                        }
                        </ul>
                    </>
                }
                <input type="submit" value="Back" onClick={clearResults}/>
            </>
        }
        {(state.shipmentInfo) && (state.parcelNumber !== '') &&
            <>
                <h1>Parcel: {state.parcelNumber}</h1>
                <input type="submit" value="Back" onClick={clearSelectedParcel}/>
            </>
        }
         <small>Put footer here!</small>
       </>
    )
}