import React from 'react'
import Header from './Header'
import { checkUser } from '@/lib/checkUser';

const MainHeader = async () => {
    const user = await checkUser();
    return (

        <Header />

    )
}

export default MainHeader