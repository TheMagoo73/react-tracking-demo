import React, { useContext } from "react"
import { Context } from "../store"
import { Redirect, useParams } from "react-router"

export default function ShipmentDetail() {
    const [state, dispatch] = useContext(Context)

    const {id, parcelId} = useParams()

    dispatch({
        type: 'SET_PARCEL_NUMBER',
        payload: parcelId
    })

    dispatch({
        type: 'SET_SHIPMENT_NUMBER',
        payload: id
    })

    // TODO Get the shipment data from GraphQL
    dispatch({
        type: 'GET_SHIPMENT_INFO',
    })

    return (
        <Redirect to="/" />
    )
}