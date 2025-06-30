'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import React from 'react'

export default function Detail({ id } : { id : string }) {

    const GET_DETAIL_INFO = gql`
        query GetDetailInfo($id: String) {
            detail(id: $id) {
                _id
                name
                city
                imgUrl
                location
                rating
                isFullRefund
                costPrice
                salePrice
                totalPrice
                grade
                keyword
            }
        }
    `

    const { data } = useSuspenseQuery<{ detail: [] }>(
        GET_DETAIL_INFO, 
        { variables  : { id }, 
        errorPolicy : 'all'}
    );


    return (
        <div>Detail</div>
    )
}
