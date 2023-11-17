import { ReactElement, ButtonHTMLAttributes, ElementType } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  type: 'button' | 'submit';
  icon?: ElementType;
}

function Button({ name, type = 'button', icon: Icon}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={`mt-1 h-12 bg-black rounded-lg w-full text-white font-medium text-lg hover:bg-black/90 duration-300 flex items-center justify-center`}
    >
      <div className='flex items-center'>
        {Icon && <Icon />}
        <span className='w-2'></span>
        {name}
      </div>
    </button>
  );
}

export default Button;