const ResponsiveSearchBar = () => {
  return (
    <label
      className="mx-auto relative bg-white w-full max-w-2xl flex flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-1 shadow-2xl focus-within:border-gray-300"
      htmlFor="search-bar"
    >
      <input
        id="search-bar"
        placeholder="Enter your task"
        className="px-2 py-1 w-full rounded-md flex-1 outline-none bg-amber-50"
      />
      <button className="w-auto px-4 py-2 bg-black border-black text-amber-50 fill-amber-50 active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
        <div className="relative flex items-center justify-center">
          {/* Spinner SVG hidden by default */}
          <svg
            className="opacity-0 animate-spin w-4 h-4 absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
            Add Task
          </span>
        </div>
      </button>
    </label>
  );
};

export default ResponsiveSearchBar;