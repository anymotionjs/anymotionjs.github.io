import { onMounted, createRef, watch } from 'airx'

import htmlDriver from '@anymotion/html-driver'
import { use, Tween, TimeProgressDriver as TPD, easingFunction } from '@anymotion/core'
import { Action, Card } from '../../components/card'
import { Input } from '../../components/input'

use(htmlDriver)

type a = TweenProperties

export function HtmlDriver() {
  const time = new TPD()
  const tween = new Tween('#test-element')
  const processInputRef = createRef<string>('0')
  let tweenTimeEasingFunction = createRef(easingFunction.linear)

  onMounted(() => {
    watch(processInputRef, () => {
      tween.progress(parseFloat(processInputRef.value))
    })

    time
      .duration(1000)
      .direction('reverse')
      .ease(tweenTimeEasingFunction.value)
      .drive(tween.to({
        scale: 1,
        width: '200px',
        height: '200px',
        // rotate: '1.57rad',
        top: '200px',
        left: '80px',
        bottom: '30px',
        right: '40%',
        translate: '200px 50% 50rem',
        backgroundColor: '#3f5efb',
      }))
  })

  const actions: Action[] = [
    {
      text: 'paly',
      onClick: () => time.play()
    }, {
      text: 'pause',
      onClick: () => time?.pause()
    },
  ]

  return () => (
    <Card title="HtmlDriver" actions={actions} states={[<Input model={processInputRef} />]}>
      <div id="test-element">
        Motion
      </div>
    </Card>
  )
}

export function HtmlDriverWithKeyFrame() {
  const time = new TPD()
  const elementUUID = `ID${Math.random().toString(16).slice(2)}`
  let tweenTimeEasingFunction = createRef(easingFunction.easeOutCubic)

  onMounted(() => {
    time
      .duration(1000)
      .repeat(Infinity)
      .direction('alternate')
      .ease(tweenTimeEasingFunction.value)
      .drive(
        new Tween(`#${elementUUID}`)
          .addKeyFrame([0, 1], {
            translate: '0px 0px 0px',
          })
          .addKeyFrame(0.25, {
            translate: '200px 0px 0px',
          })
          .addKeyFrame(0.5, {
            translate: '200px 200px 0px',
          })
          .addKeyFrame(0.75, {
            translate: '0px 200px 0px',
          })
      )
  })

  const actions: Action[] = [
    {
      text: 'paly',
      onClick: () => time.play()
    }, {
      text: 'pause',
      onClick: () => time.pause()
    }
  ]

  return () => (
    <Card title="HtmlDriverWithKeyFrame" actions={actions}>
      <div id={elementUUID}>
        Motion
      </div>
    </Card>
  )
}
