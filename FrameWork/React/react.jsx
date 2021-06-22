import React, { useState, useEffect } from 'react'

const react = () => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    return (
        <div>
            <p>you clicked {count} Times</p>

            <button onClick={() => setCount(count + 1)}>
                +
            </button>
        </div>
    )
}

export default react
