import React from 'react';

type ErrorFallbackProps = {
  error: any,
  resetErrorBoundary: any
}

function ErrorFallback(props: ErrorFallbackProps) {
  const {error, resetErrorBoundary} = props
  return (
    <div role="alert" style={{ zIndex: 100000 }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}


export default ErrorFallback;