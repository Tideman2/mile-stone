import React, { Component } from 'react';
//gh

class ErrorBoundary extends Component {
   constructor(props)  {
     super(props)
     this.state = {hasError: false}
   }

   static getDerivedStateFromError(error) {
    return {hasError: true}
   }

   render() {
    if(this.state.hasError) {
        return this.fallBack? this.fallBack:<div className='bg-red-900 w-fit font-mono text-white font-bold'>
            <p className='m-3'>An Error Occured</p>
        </div> 
    }

    return this.props.children;
   }
}

export default ErrorBoundary