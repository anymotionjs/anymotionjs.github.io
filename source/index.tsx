import { createApp } from 'airx'


import { Card } from './common/card'
import { HtmlDriver } from './modules/html-driver'
import { ScrollProgressDriver } from './modules/scroll-progress-driver'

function App() {


  return () => (
    <Card title="TEST">
      <HtmlDriver />
      <ScrollProgressDriver />
    </Card>
  )
}

const root = document.getElementById('app')
if (root !== null) createApp(<App />).mount(root)
