import { onMounted, createRef } from 'airx'

import htmlDriver from '@anymotion/html-driver'
import { use, Tween, ScrollProgressDriver as SPD, easingFunction } from '@anymotion/core'
import { eachElement } from '../../utils/element'
import { Card } from '../../components/card'

import style from './style.module.css'

use(htmlDriver)

export function ScrollProgressDriver() {
  const scroll = new SPD(`.${style.scrollContainer}`)
  let tweenTimeEasingFunction = createRef(easingFunction.linear)

  onMounted(() => {
    scroll
      .distance(1)
      .axis('vertical')
      .ease(tweenTimeEasingFunction.value)
      .drive(new Tween(`.${style.scrollChildren}`)
        .addKeyFrame(0.1, {
          scale: 1,
        })
        .addKeyFrame(0.5, {
          scale: 0.5,
        })
        .addKeyFrame(0.9, {
          scale: 0.1,
        })
        .to({
          scale: 1,
        })
      )
      .play()
  })

  return () => (
    <Card title="ScrollProgressDriver">
      <div class={style.scrollContainer}>
        {new Array(10).fill(null).map((_, i) => (
          <div class={style.scrollChildren} key={i}>
            ({i}--------------------------{i})
          </div>
        ))}
      </div>
    </Card>
  )
}
