const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </>
  );
};

export default ErrorFallBack;
