const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          htmlFor="maleCheckbox"
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'male' ? 'selected' : ''
          }`}
        >
          <span className="label-text text-white">Male</span>
          <input
            id="maleCheckbox"
            type="checkbox"
            className="checkbox border border-gray-700"
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor="femaleCheckbox"
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'female' ? 'selected' : ''
          }`}
        >
          <span className="label-text text-white">Female</span>
          <input
            id="femaleCheckbox"
            type="checkbox"
            className="checkbox border border-gray-700"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
