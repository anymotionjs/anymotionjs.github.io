import { onMounted, createRef } from 'airx'

import htmlDriver from '@anymotion/html-driver'
import { use, Tween, TimeProgressDriver as TPD, easingFunction } from '@anymotion/core'
import { Action, Card } from '../../common/card'

use(htmlDriver)

export function HtmlDriver() {
  const time = new TPD()
  let tweenTimeEasingFunction = createRef(easingFunction.linear)

  onMounted(() => {
    console.log(time.drive({ progress: () => console.log(time['_time'], time['_round']) }))
    time
      .duration(1000)
      .repeat(Infinity)
      .direction('normal')
      .ease(tweenTimeEasingFunction.value)
      .drive(new Tween('#test-element').to({
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
    <Card title="HtmlDriver" actions={actions}>
      <div id="test-element">
        Motion
      </div>
    </Card>
  )
}
