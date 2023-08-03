import React from 'react'

export default class NotFound extends React.Component {

    public render() {
        return (
            <div>
                <h2>Page not found</h2>
                <p className="mt-4">The requested url could not be found.</p>
            </div>       
        )
    }
}