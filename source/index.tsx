import { createApp } from 'airx'


import { Card } from './components/card'
import { ScrollProgressDriver } from './modules/scroll-progress-driver'
import { HtmlDriver, HtmlDriverWithKeyFrame } from './modules/html-driver'

function App() {


  return () => (
    <Card title="TEST">
      <HtmlDriver />
      <HtmlDriverWithKeyFrame />
      <ScrollProgressDriver />
    </Card>
  )
}

const root = document.getElementById('app')
if (root !== null) createApp(<App />).mount(root)
