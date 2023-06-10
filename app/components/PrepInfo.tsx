import PlusMinus from './PlusMinus';

type PrepInfoProps = {
  cookTime: number | undefined;
  prepTime: number | undefined;
};

export default function PrepInfo({ cookTime, prepTime }: PrepInfoProps) {
  return (
    <div className='border- flex grow justify-between rounded-t-3xl border-t border-gray-400 px-6 py-4 text-center text-lg font-semibold'>
      <div className='w-full'>
        <p>Servings</p>
        <PlusMinus />
      </div>
      <div className='w-full'>
        <p>Cook</p>
        <p className='text-base font-semibold text-lighter-dark'>
          {cookTime || 'N/A'}
        </p>
      </div>
      <div className='w-full'>
        <p>Preparation</p>
        <p className='text-base font-semibold text-lighter-dark'>
          {prepTime || 'N/A'}
        </p>
      </div>
    </div>
  );
}
