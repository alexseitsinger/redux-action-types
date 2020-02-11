import React, { ReactElement } from "react"
import { Provider } from "react-redux"
import { mount, ReactWrapper } from "enzyme"
import { createStore, Store } from "redux"

const SectionOnePage = (): ReactElement => <div>Section One</div>

interface SetupReturnType {
  wrapper: ReactWrapper;
  store: Store;
}

export default (): SetupReturnType => {
  const store = createStore(rootReducer, preloadedState, enhancers)
  const wrapper = mount(
    <Provider store={store}>
      <SectionOnePage />
    </Provider>
  )

  return { wrapper, store }
}
