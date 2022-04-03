import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ThreeDots height="60" width="60" color="#0ea5e9" ariaLabel="loading" />
      {message}
    </div>
  )
}

export default Loader;