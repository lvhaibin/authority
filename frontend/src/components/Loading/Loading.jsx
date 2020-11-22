import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
`;

export default function Loading() {
    return (
        <LoadingWrapper>
            <Spin />
        </LoadingWrapper>
    )
}
