import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export default function Input({
  name,
  placeholder,
  isSecret = false,
  value,
}: {
  name: string;
  placeholder: string;
  value: string;
  isSecret: boolean;
}) {
  const inputVal = useSignal(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputType = isSecret && !isFocused ? "password" : "text";

  return (
    <div className="mt-3">
      <div className="relative w-full max-w-sm">
        <input
          type={inputType}
          name={name}
          value={inputVal}
          className="w-full rounded-lg border px-4 py-2 pr-10 shadow outline-none hover:border-gray-500"
          placeholder={placeholder}
          onChange={(e) => inputVal.value = e.currentTarget.value}
          onFocus={isSecret ? handleFocus : undefined}
          onBlur={isSecret ? handleBlur : undefined}
        />
        <button
          type="button"
          onClick={() => inputVal.value = ""}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7785 3.22908C12.7083 3.15877 12.625 3.10298 12.5332 3.06492C12.4415 3.02686 12.3431 3.00726 12.2438 3.00726C12.1444 3.00726 12.0461 3.02686 11.9543 3.06492C11.8626 3.10298 11.7792 3.15877 11.709 3.22908L8 6.93053L4.29097 3.2215C4.22075 3.15127 4.13738 3.09557 4.04563 3.05756C3.95388 3.01956 3.85554 3 3.75623 3C3.65692 3 3.55859 3.01956 3.46683 3.05756C3.37508 3.09557 3.29172 3.15127 3.2215 3.2215C3.15127 3.29172 3.09557 3.37508 3.05756 3.46683C3.01956 3.55859 3 3.65692 3 3.75623C3 3.85554 3.01956 3.95388 3.05756 4.04563C3.09557 4.13738 3.15127 4.22075 3.2215 4.29097L6.93053 8L3.2215 11.709C3.15127 11.7793 3.09557 11.8626 3.05756 11.9544C3.01956 12.0461 3 12.1445 3 12.2438C3 12.3431 3.01956 12.4414 3.05756 12.5332C3.09557 12.6249 3.15127 12.7083 3.2215 12.7785C3.29172 12.8487 3.37508 12.9044 3.46683 12.9424C3.55859 12.9804 3.65692 13 3.75623 13C3.85554 13 3.95388 12.9804 4.04563 12.9424C4.13738 12.9044 4.22075 12.8487 4.29097 12.7785L8 9.06947L11.709 12.7785C11.7793 12.8487 11.8626 12.9044 11.9544 12.9424C12.0461 12.9804 12.1445 13 12.2438 13C12.3431 13 12.4414 12.9804 12.5332 12.9424C12.6249 12.9044 12.7083 12.8487 12.7785 12.7785C12.8487 12.7083 12.9044 12.6249 12.9424 12.5332C12.9804 12.4414 13 12.3431 13 12.2438C13 12.1445 12.9804 12.0461 12.9424 11.9544C12.9044 11.8626 12.8487 11.7793 12.7785 11.709L9.06947 8L12.7785 4.29097C13.0667 4.00274 13.0667 3.51731 12.7785 3.22908V3.22908Z"
              fill="currentColor"
            >
            </path>
          </svg>
        </button>
      </div>
    </div>
  );
}
