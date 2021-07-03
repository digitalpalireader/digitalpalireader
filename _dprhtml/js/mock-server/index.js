import { setupServer } from 'msw/node'

import handlers from './handlers.js'

export default setupServer(...handlers)
