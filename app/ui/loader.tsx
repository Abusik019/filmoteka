import { Spin } from 'antd'
import React from 'react'

export default function Loader() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Spin size='large'/>
        </div>
    )
}
