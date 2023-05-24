const FilterSortBar = () => {
  return (
    <div className='border-y border-darker-dark'>
      <ul className='flex flex-col justify-center gap-20 py-6 text-2xl sm:flex-row'>
        <li>Meal</li>
        <li>Category</li>
        <li>Sort</li>
      </ul>
    </div>
  );
};

export default FilterSortBar;
