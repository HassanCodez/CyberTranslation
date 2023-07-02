import Ai from '@/components/Ai';
import OpenTranslator from '@/components/OpenTranslator';
export default function Home() {
  
  return (
    <>
      <div className="my-5 gap-5 flex flex-col text-white">
        <h1 className="text-3xl text-center">CyberX Translation</h1>
        <p className="text-desc text-center">Translation became easy!</p>
      </div>
      <OpenTranslator/>
      <Ai/>
    </>
  );
}
