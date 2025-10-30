import { Spin } from 'antd'
import React from 'react'

export default function Loader({ height = '100%' }) {
    return (
        <div style={{ height }} className={`w-full flex items-center justify-center`}>
            <Spin size='large'/>
        </div>
    )
}
