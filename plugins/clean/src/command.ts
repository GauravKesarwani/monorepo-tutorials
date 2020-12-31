import { Command } from '@monorepo-tutorials/plugin';

const command: Command = {
  name: 'clean',
  description: 'Remove dependencies and build files',
  options: [
    {
      name: 'exclude-modules',
      description: "Don't delete the node_modules",
      type: Boolean
    },
    {
      name: 'exclude-dist',
      description: "Don't delete the built dist directories",
      type: Boolean
    }
  ]
}

export default command;