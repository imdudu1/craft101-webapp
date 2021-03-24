import React, {useCallback, useState} from "react";

type OnChangeHandlerFunc = React.ChangeEvent<HTMLInputElement>

const useInputs = <T>(initialForm: T): [T, (e: OnChangeHandlerFunc) => void, () => void] => {
  const [form, setForm] = useState<T>(initialForm)
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setForm(form => ({...form, [name]: value}))
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset];
}

export default useInputs;
