var module = angular.module('App');

module.factory('BaseObject', () => {

  class BaseObject {
    constructor(data = {}) {
      for (property in data) {
        this[property] = data[property];
      }
    }

    /*
    Switch to high-memory mode

    Usually means it's being rendered on screen and should get extra details and keep them updated
    */
    open() {}

    /*
    Switch to low-memory mode

    Unsubscribe unnecessary overhead
    */
    close() {}

    // Convenience wrapper
    save() {
      if (this.id) {
        return this.update();
      } else {
        return this.create();
      }
    }

    create() {}

    edit() {}

    delete() {}

    /*
    Make a copy of object for use in forms

    When you edit a record in a form, you want the original to be preserved while the user makes changes
    This allows you to edit a record exactly as if you were creating one without having to worry about
    rolling back changes to the object.
    */
    clone() {
      var constructor = Object.getPrototypeOf(this).constructor;
      // TODO: add support for queries by passing parent(?)
      return new constructor(this);
    }

    /*
    Cleans up listeners (should run when discarding object)
    */
    destroy() {
      while (listener = this.listeners.pop()) {
        listener();
      }
    }
  }

  return BaseObject;
});
