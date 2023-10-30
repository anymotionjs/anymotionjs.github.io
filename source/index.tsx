import { createApp, onMounted, createRef } from 'airx'

import { use, Tween, TimeProgressDriver, easingFunction } from '@anymotion/core'
import htmlDriver from '@anymotion/html-driver'

import { Action, Card } from './common/card'

use(htmlDriver)

function App() {
  const time = new TimeProgressDriver()
  let tweenTimeEasingFunction = createRef(easingFunction.linear)

  onMounted(() => {
    time.drive(new Tween('#test-element').to({
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
    }))
      .duration(1000)
      .repeat(Infinity)
      .direction('alternate')
      .ease(tweenTimeEasingFunction.value)
  })

  const actions: Action[] = [
    {
      text: 'paly',
      onClick: () => time.play()
    }, {
      text: 'pause',
      onClick: () => time?.pause()
    }
  ]

  return () => (
    <Card title="TEST">
      <Card title="HTML" actions={actions}>
        <div id="test-element">
          Motion
        </div>
      </Card>
    </Card>
  )
}

const root = document.getElementById('app')
if (root !== null) createApp(<App />).mount(root)
