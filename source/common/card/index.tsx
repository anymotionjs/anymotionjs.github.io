import { AirxChildren, createRef, onMounted } from 'airx'
import style from './style.module.css'

export interface Action {
  text: string
  onClick: () => void
}

interface CardProps {
  title: string
  actions?: Action[]
  children?: AirxChildren
  states?: (string | undefined | null)[]
}

export function Card(props: CardProps) {
  return () => {
    const actions = () => {
      if (props.actions == null) return
      if (props.actions.length === 0) return

      return (
        <div class={style.actions}>
          {props.actions.map(action => (
            <button class={style.action} onClick={action.onClick}>
              {action.text}
            </button>
          ))}
        </div>
      )
    }

    return (
      <div class={style.card}>
        <div class={style.head}>
          <span class={style.title}>
            {props.title}
          </span>
          <div class={style.states}>
            {props.states?.filter(Boolean).map(state => (
              <span class={style.state}>
                {state}
              </span>
            ))}
            <Fps></Fps>
          </div>
        </div>
        <div class={style.content}>
          {props.children}
        </div>
        {actions()}
      </div>
    )
  }
}

function Fps(_props: {}) {
  let ticks = 0
  let lastDate = Date.now()
  const fpsRef = createRef(0)
  let requestAnimationFrameId: number | null = null

  function rafLoop() {
    ticks += 1
    if (ticks >= 30) {
      const now = Date.now()
      const diff = now - lastDate
      fpsRef.value = Math.round(1000 / (diff / ticks))
      lastDate = now
      ticks = 0
    }
    requestAnimationFrameId = requestAnimationFrame(rafLoop)
  }

  onMounted(() => {
    rafLoop()
    return () => {
      if (requestAnimationFrameId != null) {
        cancelAnimationFrame(requestAnimationFrameId)
      }
    }
  })

  return () => <span>FPS：{fpsRef.value}</span>
}
