# Components
Components should only do  things
* Render some piece of the game state either through props or the global store
* Call functions in ```rules.ts``` based on handled events
  * Essentially forwarding an event to ```rules.ts``` with information idetifying the component

Components should not
* Modify game state directly
* Do any real logic
