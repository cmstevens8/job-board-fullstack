import React from "react";

function FormInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 w-full"
      />
    </div>
  );
}

export default FormInput;
