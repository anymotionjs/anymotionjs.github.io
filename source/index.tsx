import { createApp, onMounted, createRef } from 'airx'
import htmlDriver from '@anymotion/html-driver'
import anymotion, { Direction, Time } from '@anymotion/core'

import { Action, Card } from './common/card'

anymotion.use(htmlDriver)

function App() {
  let tweenTime: Time | null = null
  let tweenTimeDirectionIndex = 1
  let tweenTimeEasingFunctionIndex = 1
  let tweenTimeDirection = createRef<Direction>('normal')
  let tweenTimeEasingFunction = createRef(Time.EasingFunction.linear)

  onMounted(() => {
    tweenTime = anymotion
      .to('#test-element', {
        scale: 1,
        width: '200px',
        height: '200px',
        // rotate: '1.57rad',
        top: '200px',
        left: '80px',
        bottom: '30px',
        right: '40%',
        translate: '200px 50% 50rem',
        backgroundColor: '#3f5efb'
      })
      .time
      .duration(1000)
      .repeat(Infinity)
      .direction(tweenTimeDirection.value)
      .easingFunction(tweenTimeEasingFunction.value)
  })

  const nextDirection = () => {
    const keys: Direction[] = [
      'normal',
      'reverse',
      'alternate'
    ]

    tweenTimeDirectionIndex %= keys.length
    tweenTimeDirection.value = keys[tweenTimeDirectionIndex]
    tweenTime?.direction(tweenTimeDirection.value)
    tweenTimeDirectionIndex += 1
  }

  const nextEasingFunction = () => {
    const keys = Object.keys(Time.EasingFunction).sort()

    tweenTimeEasingFunctionIndex %= keys.length
    const key = keys[tweenTimeEasingFunctionIndex]
    tweenTimeEasingFunction = (Time.EasingFunction as any)[key]
    tweenTime?.easingFunction(tweenTimeEasingFunction.value)
    tweenTimeEasingFunctionIndex += 1
    if (key === 'bezier') nextEasingFunction()
  }

  const actions: Action[] = [
    {
      text: 'paly',
      onClick: () => tweenTime?.paly()
    }, {
      text: 'pause',
      onClick: () => tweenTime?.pause()
    }, {
      text: 'next direction',
      onClick: () => nextDirection()
    }, {
      text: 'next easing function',
      onClick: () => nextEasingFunction()
    }
  ]

  return () => (
    <Card title="TEST">
      <Card
        title="HTML"
        actions={actions}
        states={[tweenTimeDirection.value, tweenTimeEasingFunction.value.name]}
      >
        <div id="test-element">
          Motion
        </div>
      </Card>
    </Card>

  )
}

const root = document.getElementById('app')
if (root !== null) createApp(<App />).mount(root)
