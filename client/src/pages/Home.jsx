import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from "@/components/ui/label"
import React from 'react'

const Home = () => {
    return (
        <div>
            <Navbar />
            Home
            <Button variant="link">Button</Button>
          
            <h1 className='text-2xl text-purple-400'>hello</h1>
            
        </div>
    )
}

export default Home