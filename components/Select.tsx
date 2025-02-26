interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  selected: string;
  options: Option[];
}

export default function Select({
  name,
  selected,
  options,
}: CustomSelectProps) {
  return (
    <div className="relative w-full  max-w-sm">
      <select
        name={name}
        className="block w-full appearance-none rounded-lg border border-gray-200 px-4 py-2 text-base hover:border-gray-500"
        value={selected}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:border-gray-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
