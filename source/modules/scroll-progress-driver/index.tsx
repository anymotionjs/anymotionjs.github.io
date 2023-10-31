import { onMounted, createRef } from 'airx'

import htmlDriver from '@anymotion/html-driver'
import { use, Tween, ScrollProgressDriver as SPD, easingFunction } from '@anymotion/core'
import { Card } from '../../common/card'

import style from './style.module.css'

use(htmlDriver)

export function ScrollProgressDriver() {
  const scroll = new SPD(style.scrollContainer)
  let tweenTimeEasingFunction = createRef(easingFunction.linear)

  onMounted(() => {
    scroll
      .axis('vertical')
      .ease(tweenTimeEasingFunction.value)
      .drive(new Tween(style.scrollContainer).to({
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
      .play()
  })

  return () => (
    <Card title="ScrollProgressDriver">
      <div class={style.scrollContainer}>
        {new Array(100).fill(null).map((_, i) => (
          <div key={i}>{i}</div>
        ))}
      </div>
    </Card>
  )
}
