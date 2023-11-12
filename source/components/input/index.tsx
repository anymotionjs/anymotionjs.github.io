import { Ref } from 'airx'

interface Props {
  model: Ref<string>
}

export function Input(props: Props) {
  const handleChange = (event: Event) => {
    if (event.target && 'value' in event.target) {
      props.model.value = event.target.value as string
    }
  }

  return () => (<input type='text' value={props.model.value} onInput={handleChange}></input>)
}
