import { ScaleLoader } from 'react-spinners'

export const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <ScaleLoader
      color='#6b8e23'
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);