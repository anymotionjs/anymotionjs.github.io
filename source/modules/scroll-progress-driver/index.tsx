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
    eachElement(`.${style.scrollChildren}`, (ele, index, list) => {
      const tween = new Tween(ele).to({
        width: '200px',
        height: '200px',
        rotate: '360deg',
        backgroundColor: '#3f5efb'
      })

      const anim = new SPD(`.${style.scrollContainer}`).drive(tween)
      scroll.then(anim)
    })

    scroll
      .drive()
      .axis('vertical')
      .distance(0.05)
      .ease(tweenTimeEasingFunction.value)
      .play()
  })

  return () => (
    <Card title="ScrollProgressDriver">
      <div class={style.scrollContainer}>
        {new Array(100).fill(null).map((_, i) => (
          <div class={style.scrollChildren} key={i}>
            ({i}--------------------------{i})
          </div>
        ))}
      </div>
    </Card>
  )
}
