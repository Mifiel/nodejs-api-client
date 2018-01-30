interface CallbackArgs {
  error?: string,
  response?: {
    statusCode: number,
    statusMessage: string
  },
  body?: string | object
}

let callbackResponseArgs: CallbackArgs = {}
const defaultCallbackResponseArgs: CallbackArgs = {
  error: null,
  response: {
    statusCode: 200,
    statusMessage: ''
  },
  body: null
}

const request = (options) => {
  options.callback(
    callbackResponseArgs.error,
    callbackResponseArgs.response,
    callbackResponseArgs.body
  )
}

request.__setCbkResponse = (cbkArgs) => {
  callbackResponseArgs = Object.assign({}, defaultCallbackResponseArgs, cbkArgs)
}

request.__clearCbkRespnse = () => {
  callbackResponseArgs = {}
}

module.exports = request
