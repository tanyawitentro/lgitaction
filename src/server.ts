import app from './app'
import { PORT, SERVIVE_NAME, SERVIVE_VERSION } from './config/config'
import { logg } from './utils/commonlog'

let server = app.listen(PORT, () => {
    logg.info("Server is running...")
    logg.info(`${SERVIVE_NAME} ${SERVIVE_VERSION} Listening on port ${PORT}`)
    console.log('test')
})

export default server