import React, { useContext } from "react"
import { Context } from "../store"

export default function ShipmentSearch() {
    const [state, dispatch] = useContext(Context)

    const handleShipmentNumberChange = (evt) => {
        console.log(evt.target.value)
        dispatch({
            type: 'SET_SHIPMENT_NUMBER',
            payload: evt.target.value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
 
        // TODO: the shipment info from the gateway

        dispatch({
            type: 'GET_SHIPMENT_INFO',
        })
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

    console.log(`Shipment: ${state.shipmentNumber}\nParcel: ${state.parcelNumber}`)

    if(!state.shipmentInfo) {
        return (
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
                <input type="submit" value="Search" />
            </form>    
        )
    } else if (state.parcelNumber === '') {
        return (
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
        )
    } else {
        return (
            <>
                <h1>Parcel: {state.parcelNumber}</h1>
                <input type="submit" value="Back" onClick={clearSelectedParcel}/>
            </>
        )
    }
}