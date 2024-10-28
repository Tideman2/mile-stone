// Input Component
export default function Input({ onChangeAction, disabled, placeholder, ...props }) {
    let disablesState = "bg-gray-200 m-3 p-3 md:h-10 h-7 text-center w-fit border border-gray-300 rounded-md p-2 mb-4 cursor-not-allowed text-base"; // Styles for disabled state
    let notDisabled = "bg-white m-3 p-3 md:h-10 h-7 text-center w-fit border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base";

    return (
        <input 
            onChange={(event) => onChangeAction(event)} 
            disabled={disabled} 
            placeholder={placeholder}
            {...props} 
            className={disabled ? disablesState : notDisabled} 
        />
    );
}
