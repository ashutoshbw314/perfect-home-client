import React, {useState, forwardRef, useImperativeHandle} from 'react';

const AsyncButton = forwardRef(({children, disabled, className, classNameOnActive, classNameOnDisabled, ...otherProps}, ref) => {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const disable = () => {
    setIsDisabled(true);
  }

  const activate = () => {
    setIsDisabled(false);
  }

  useImperativeHandle(ref, () => ({
    activate,
    disable,
  }))

  return (
    <button className={`${className} ${isDisabled ? classNameOnDisabled : classNameOnActive}`} disabled={isDisabled} {...otherProps}>{children}</button>
  )
});

export default AsyncButton;
