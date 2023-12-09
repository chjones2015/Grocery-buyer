const CustomInput = ({ type, id, label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className={`border border-gray-300 bg-transparent rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-success focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
