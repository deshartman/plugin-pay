import React from 'react';
import { VERSION, Tab } from '@twilio/flex-ui';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PayComponent from './components/PayComponent.js';

import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'PayPlugin';

export default class PayPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    flex.TaskCanvasTabs.Content.add(
      <Tab icon={<CreditCardIcon />} iconActive={<CreditCardIcon />} key="pay-tab">
        <PayComponent key="pay-component" />
      </Tab>

    );

    this.registerReducers(manager);

    // const options = { sortOrder: -1 };
    // flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="PayPlugin-component" />, options);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
