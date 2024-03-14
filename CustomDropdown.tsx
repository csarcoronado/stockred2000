import CustomButton from "../componentesjesus/boton";

interface DropdownOption {
  label: string
  onClick: () => void;
}

const CustomDropdown = ({title, options}: {title:string, options?: DropdownOption[] }) => {



  const handleOptionClick = (onClick: () => void) => {
    onClick();
  };
  return (
    <div className="dropdown">
   {title}
   <CustomButton
     buttonType="button"
     id="dropdownMenuButton1"
     database="dropdown"
     customClass="btn text-white dropdown-toggle"
   />
<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
{options?.map((option, index) => (
          <li key={index}>
            <a className="dropdown-item" onClick={() => handleOptionClick(option.onClick)}>
              {option.label}
            </a>
          </li>
        ))}
</ul> 
</div>
  )
}

export default CustomDropdown