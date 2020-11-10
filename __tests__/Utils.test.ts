import { utils } from '../src/utils'
const settings = {
  labels: {
    test: {
      name: 'test',
      color: 'CFD3D7',
      description: 'This issue / pull request has been abandon'
    }
  },
  issue: {
    bug: {
      requires: 1,
      conditions: [
        {
          type: 'titleMatches',
          pattern: '/^bug(\\(.*\\))?:/i'
        },
        {
          type: 'descriptionMatches',
          pattern: '/(created|new|opened|made)( an| a)? bug/i'
        }
      ]
    }
  },
  pr: {
    bug: {
      requires: 1,
      conditions: [
        {
          type: 'titleMatches',
          pattern: '/^bug(\\(.*\\))?:/i'
        },
        {
          type: 'descriptionMatches',
          pattern: '/(created|new|opened|made)( an| a)? bug/i'
        }
      ]
    }
  }
}
test('test colour format', async () => {
  await expect(utils.formatColor(settings.labels.test.color)).toBe('CFD3D7')
})
test('test colour format', async () => {
  await expect(utils.formatColor(`#${settings.labels.test.color}`)).toBe(
    'CFD3D7'
  )
})
// test('Run entire script', async () => {
//   await expect(utils.formatColor(`#${settings.labels.test.color}`)).toBe(
//     'CFD3D7'
//   )
// })
