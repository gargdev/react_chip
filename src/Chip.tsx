import React from 'react';

interface ChipProps {
  label: string;
  onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => {
  return (
    <div className="">
      <span className="">{label}</span>
      <button onClick={onRemove} className="f">
        X
      </button>
    </div>
  );
};

export default Chip;
