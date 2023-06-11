import SearchIcon from '@/app/components/SearchIcon';
import FiltersIcon from '@/app/components/FiltersIcon';

const FilterSortBar = () => {
  return (
    <div className='mx-6 mt-12 border-darker-dark'>
      <div className='flex items-center gap-4 border-b border-darker-dark pb-2'>
        <SearchIcon />
        <input
          type='text'
          className='w-full bg-transparent active:border-transparent'
          placeholder='Search Recipes'
        />
        <FiltersIcon />
      </div>
    </div>
  );
};

export default FilterSortBar;
