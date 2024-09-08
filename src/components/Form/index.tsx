import Button from "components/Button";
import Input from "components/Input";
import {
  Children,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface FormContextType {
  validationState: Record<string, boolean>;
  handleValidationState: (
    updatedValidationState: Record<string, boolean>,
  ) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form 컨텍스트를 호출할 수 없는 범위입니다.");
  }

  return context;
}

export default function Form(
  props: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>,
) {
  const { children, ...args } = props;
  const childrenElements = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children],
  );

  const [validationState, setValidationState] = useState<
    Record<string, boolean>
  >(() => {
    const inputElements = childrenElements.filter(
      (child) => child.type === Input,
    );

    const initialValidationState: Record<string, boolean> = {};

    inputElements.forEach((element) => {
      const { name } = element.props;
      if (name) initialValidationState[name] = false;
    });

    return initialValidationState;
  });

  const handleValidationState = (
    updatedValidationState: Record<string, boolean>,
  ) => {
    setValidationState((prev) => ({
      ...prev,
      ...updatedValidationState,
    }));
  };

  const isFormValid = useMemo(
    () => Object.values(validationState).every((isValid) => isValid),
    [validationState],
  );

  const updatedChildren = childrenElements.map((child) => {
    if (
      (child.type === Button || child.type === "button") &&
      child.props.type === "submit"
    ) {
      return cloneElement(child, { disabled: !isFormValid });
    }
    return child;
  });

  const contextValue = useMemo(
    () => ({ validationState, handleValidationState }),
    [validationState],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form {...args}>{updatedChildren}</form>
    </FormContext.Provider>
  );
}
