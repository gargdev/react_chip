import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, useMemo } from 'react';
import './ChipInput.css';

interface ChipInputProps {}

const ChipInput: React.FC<ChipInputProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if chips is an array before using useMemo
  const memoizedItems = useMemo(
    () => (Array.isArray(chips) ? ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson', 'Nick Giannopoulos', 'Yuvraj Singh', 'Anoop Kumar Pandey'] : []),
    [chips]
  );

  // Check if chips and memoizedItems are arrays before using useEffect
  useEffect(() => {
    if (!Array.isArray(chips) || !Array.isArray(memoizedItems)) {
      console.error('Chips or memoizedItems is not an array.');
      return;
    }

    setFilteredItems(
      memoizedItems.filter(
        (item) => !chips.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chips, memoizedItems]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item: string) => {
    setChips((prevChips) => {
      if (!Array.isArray(prevChips)) {
        console.error('Chips is not an array.');
        return prevChips;
      }

      return [...prevChips, item];
    });

    setInputValue('');
    inputRef.current?.focus();
  };

  const handleChipRemove = (removedChip: string) => {
    setChips((prevChips) => {
      if (!Array.isArray(prevChips)) {
        console.error('Chips is not an array.');
        return prevChips;
      }

      return prevChips.filter((chip) => chip !== removedChip);
    });
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '') {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip);
      }
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(true);
  };

  return (
    <div className="chip-input-container">
      <div className="heading">Pick Users</div>
      <div className="chips-container">
        {Array.isArray(chips) &&
          chips.map((chip) => (
            <div key={chip} className="chip" onClick={() => handleChipRemove(chip)}>
              {chip} <span className="chip-remove">X</span>
            </div>
          ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Add new user..."
        ref={inputRef}
        className="input-field"
      />
      {isInputFocused && (
        <ul className="suggestions-list">
          {Array.isArray(filteredItems) &&
            filteredItems.map((item) => (
              <li key={item} onClick={() => handleItemClick(item)} className="suggestion-item">
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
