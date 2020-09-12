import React, { useContext } from "react"
import { Context } from "../store"
import { Redirect, useParams } from "react-router"

export default function ShipmentDetail() {
    const [state, dispatch] = useContext(Context)

    const {id} = useParams()

    dispatch({
        type: 'SET_SHIPMENT_NUMBER',
        payload: id
    })

    // TODO Get the shipment data from GraphQL
    dispatch({
        type: 'SET_SHIPMENT_INFO',
        payload: {
            carrier: 'DPD',
            parcels: [
                "123", "456"
            ]
        }
    })

    return (
        <Redirect to="/" />
    )
}