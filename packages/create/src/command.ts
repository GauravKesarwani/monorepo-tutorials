import { app, Command } from 'command-line-application';

const echo: Command = {
  name: 'echo',
  description: 'Print a string to the terminal',
  examples: ['echo foo', 'echo "Intense message"'],
  require: ['value'],
  options: [
    {
      name: 'value',
      type: String,
      defaultOption: true,
      description: 'The value to print'
    }
  ]
};

const args = app(echo);

// $ echo foo
console.log('arguments -', args);
// output: { value: "foo" }