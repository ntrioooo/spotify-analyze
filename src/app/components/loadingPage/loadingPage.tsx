import Image from 'next/image';
import peaceImage from '../../public/images/memoji/peace-bg.png';

const LoadingPage = () => {
  return (
    <div className="justify-center flex">
      <div className="bg-gray-300 rounded-full">
        <Image src={peaceImage} alt="Peace Memoji" width={200} height={200} />
        <div className="bg-black rounded-xl inline-block px-4 py-1">
          <h1 className="text-3xl font-bold text-white">ntriodev.</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
